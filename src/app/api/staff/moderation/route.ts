import { NextResponse } from "next/server";
import { COMMUNITY_UNAVAILABLE, hasDatabase } from "@/lib/db";
import {
  MODERATION_COOKIE,
  isModerationAuthorized,
  secretsMatch,
} from "@/lib/moderation-auth";
import { listStaffSubmissions, moderateSubmission } from "@/lib/ugc";

function unauthorized() {
  return NextResponse.json(
    { ok: false, message: "Staff only. Send the moderation secret." },
    { status: 401 },
  );
}

export async function GET(request: Request) {
  if (!(await isModerationAuthorized(request))) {
    return unauthorized();
  }
  if (!hasDatabase()) {
    return NextResponse.json(COMMUNITY_UNAVAILABLE, { status: 503 });
  }

  const status = new URL(request.url).searchParams.get("status") ?? "pending";
  const allowed = ["pending", "approved", "rejected", "all"] as const;
  const filter = allowed.includes(status as (typeof allowed)[number])
    ? (status as (typeof allowed)[number])
    : "pending";

  try {
    const items = await listStaffSubmissions(filter);
    return NextResponse.json({ ok: true, items });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "community_unavailable",
        message: "Community tables are not ready. Run db/schema.sql on Neon.",
      },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON." }, { status: 400 });
  }

  if (body.unlock === true) {
    const candidate = String(body.secret ?? "");
    if (!secretsMatch(candidate)) {
      return unauthorized();
    }
    const response = NextResponse.json({ ok: true });
    response.cookies.set(MODERATION_COOKIE, candidate, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return response;
  }

  if (!(await isModerationAuthorized(request))) {
    return unauthorized();
  }

  if (!hasDatabase()) {
    return NextResponse.json(COMMUNITY_UNAVAILABLE, { status: 503 });
  }

  const id = String(body.id ?? "");
  const action = String(body.action ?? "");
  if (!id || (action !== "approve" && action !== "reject")) {
    return NextResponse.json({ ok: false, message: "Need an id and approve/reject." }, { status: 400 });
  }

  try {
    const result = await moderateSubmission(id, action === "approve" ? "approved" : "rejected");
    if (!result.ok) {
      return NextResponse.json(result, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "community_unavailable",
        message: "Community tables are not ready. Run db/schema.sql on Neon.",
      },
      { status: 503 },
    );
  }
}
