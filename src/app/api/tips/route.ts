import { NextResponse } from "next/server";
import { COMMUNITY_UNAVAILABLE, hasDatabase } from "@/lib/db";
import { clientIp } from "@/lib/moderation-auth";
import {
  allowRateLimit,
  hashIp,
  insertSubmission,
  listApprovedTips,
  parseSubmissionInput,
} from "@/lib/ugc";

export async function GET() {
  if (!hasDatabase()) {
    return NextResponse.json(COMMUNITY_UNAVAILABLE, { status: 503 });
  }
  try {
    const tips = await listApprovedTips();
    return NextResponse.json({ ok: true, tips });
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
  if (!hasDatabase()) {
    return NextResponse.json(COMMUNITY_UNAVAILABLE, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON." }, { status: 400 });
  }

  const parsed = parseSubmissionInput(body, "tip");
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, message: parsed.error }, { status: 400 });
  }
  if (parsed.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const ip = hashIp(clientIp(request));
  if (!allowRateLimit(`tip:${ip}`)) {
    return NextResponse.json(
      { ok: false, message: "Slow down — one tip at a time." },
      { status: 429 },
    );
  }

  try {
    const result = await insertSubmission(parsed.values, ip);
    if (!result.ok) {
      return NextResponse.json(result, { status: 503 });
    }
    return NextResponse.json({
      ok: true,
      message: "Tip filed. An editor will read it before anything is published.",
    });
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
