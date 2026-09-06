import { NextResponse } from "next/server";
import { getArticle } from "@/lib/content";
import { COMMUNITY_UNAVAILABLE, hasDatabase } from "@/lib/db";
import { clientIp } from "@/lib/moderation-auth";
import {
  COMMENTABLE_TYPES,
  allowRateLimit,
  hashIp,
  insertSubmission,
  listApprovedComments,
  parseSubmissionInput,
} from "@/lib/ugc";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug")?.trim() ?? "";
  if (!slug) {
    return NextResponse.json({ ok: false, message: "Missing slug." }, { status: 400 });
  }
  if (!hasDatabase()) {
    return NextResponse.json(COMMUNITY_UNAVAILABLE, { status: 503 });
  }
  try {
    const comments = await listApprovedComments(slug);
    return NextResponse.json({ ok: true, comments });
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

  const parsed = parseSubmissionInput(body, "comment");
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, message: parsed.error }, { status: 400 });
  }

  if (parsed.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const article = getArticle(parsed.values.articleSlug ?? "");
  if (!article || !COMMENTABLE_TYPES.includes(article.type)) {
    return NextResponse.json(
      { ok: false, message: "Comments are not open on that page." },
      { status: 400 },
    );
  }

  if (parsed.values.readerScore && article.type !== "review") {
    return NextResponse.json(
      { ok: false, message: "Reader scores are only for reviews." },
      { status: 400 },
    );
  }

  const ip = hashIp(clientIp(request));
  if (!allowRateLimit(`comment:${ip}`)) {
    return NextResponse.json(
      { ok: false, message: "Slow down — the desk already has your last letter." },
      { status: 429 },
    );
  }

  try {
    const result = await insertSubmission(
      article.type === "review"
        ? parsed.values
        : { ...parsed.values, readerScore: undefined },
      ip,
    );
    if (!result.ok) {
      return NextResponse.json(result, { status: 503 });
    }
    return NextResponse.json({
      ok: true,
      message: "Filed with the desk. It will appear if an editor approves it.",
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
