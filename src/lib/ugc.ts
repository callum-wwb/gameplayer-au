import "server-only";
import { createHash } from "node:crypto";
import { COMMUNITY_UNAVAILABLE, getSql, hasDatabase } from "@/lib/db";
import { commentableTypes } from "@/lib/site";

export const COMMENTABLE_TYPES = commentableTypes;

export type SubmissionType = "comment" | "tip";
export type SubmissionStatus = "pending" | "approved" | "rejected";

export type PublicComment = {
  id: string;
  authorName: string;
  body: string;
  readerScore: number | null;
  createdAt: string;
};

export type PublicTip = {
  id: string;
  title: string;
  body: string;
  authorName: string;
  createdAt: string;
};

export type StaffSubmission = {
  id: string;
  type: SubmissionType;
  status: SubmissionStatus;
  articleSlug: string | null;
  authorName: string;
  authorEmail: string | null;
  title: string | null;
  body: string;
  readerScore: number | null;
  createdAt: string;
  moderatedAt: string | null;
};

type SubmissionRow = {
  id: string;
  type: SubmissionType;
  status: SubmissionStatus;
  article_slug: string | null;
  author_name: string;
  author_email: string | null;
  title: string | null;
  body: string;
  reader_score: number | null;
  created_at: string;
  moderated_at: string | null;
};

const buckets = new Map<string, number[]>();

export function hashIp(ip: string) {
  const salt = process.env.MODERATION_SECRET?.trim() || "gameplayer-ugc";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export function allowRateLimit(key: string, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  if (hits.length >= limit) {
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);
  return true;
}

export function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/\s+/g, " ").trim();
}

function countLinks(value: string) {
  const matches = value.match(/\bhttps?:\/\/|\bwww\./gi);
  return matches?.length ?? 0;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export type ParsedSubmission =
  | { ok: true; honeypot: boolean; values: ValidatedSubmission }
  | { ok: false; error: string };

export type ValidatedSubmission = {
  type: SubmissionType;
  articleSlug?: string;
  authorName: string;
  authorEmail?: string;
  title?: string;
  body: string;
  readerScore?: number;
};

export function parseSubmissionInput(
  raw: Record<string, unknown>,
  kind: SubmissionType,
): ParsedSubmission {
  const honeypot = stripHtml(String(raw.website ?? raw.company ?? "")).length > 0;
  const startedAt = Number(raw.startedAt ?? raw.started_at ?? 0);
  const now = Date.now();

  if (!honeypot) {
    if (!Number.isFinite(startedAt) || startedAt <= 0) {
      return { ok: false, error: "Please wait a moment and try again." };
    }
    const elapsed = now - startedAt;
    if (elapsed < 3000) {
      return { ok: false, error: "That was too fast — add a sentence, then send." };
    }
    if (elapsed > 24 * 60 * 60 * 1000) {
      return { ok: false, error: "This form expired. Refresh the page and try again." };
    }
  }

  const authorName = stripHtml(String(raw.name ?? raw.authorName ?? ""));
  const authorEmail = stripHtml(String(raw.email ?? raw.authorEmail ?? ""));
  const title = stripHtml(String(raw.title ?? ""));
  const body = stripHtml(String(raw.body ?? raw.comment ?? ""));
  const articleSlug = stripHtml(String(raw.articleSlug ?? raw.slug ?? ""));
  const scoreRaw = raw.readerScore ?? raw.score;

  if (authorName.length < 2 || authorName.length > 80) {
    return { ok: false, error: "Name needs to be between 2 and 80 characters." };
  }
  if (authorEmail && !isEmail(authorEmail)) {
    return { ok: false, error: "That email does not look usable." };
  }
  if (body.length < 20 || body.length > 2000) {
    return { ok: false, error: "Write between 20 and 2,000 characters." };
  }
  if (countLinks(body) > 2 || countLinks(title) > 1) {
    return { ok: false, error: "Too many links — the desk reads letters, not link dumps." };
  }

  if (kind === "comment") {
    if (!articleSlug || articleSlug.length > 160) {
      return { ok: false, error: "Missing article." };
    }
    let readerScore: number | undefined;
    if (scoreRaw !== undefined && scoreRaw !== null && scoreRaw !== "") {
      const score = Number(scoreRaw);
      if (!Number.isInteger(score) || score < 1 || score > 10) {
        return { ok: false, error: "Reader score must be a whole number from 1 to 10." };
      }
      readerScore = score;
    }
    return {
      ok: true,
      honeypot,
      values: {
        type: "comment",
        articleSlug,
        authorName,
        authorEmail: authorEmail || undefined,
        body,
        readerScore,
      },
    };
  }

  if (title.length < 8 || title.length > 140) {
    return { ok: false, error: "Tip title needs to be between 8 and 140 characters." };
  }

  return {
    ok: true,
    honeypot,
    values: {
      type: "tip",
      authorName,
      authorEmail: authorEmail || undefined,
      title,
      body,
    },
  };
}

function mapStaff(row: SubmissionRow): StaffSubmission {
  return {
    id: row.id,
    type: row.type,
    status: row.status,
    articleSlug: row.article_slug,
    authorName: row.author_name,
    authorEmail: row.author_email,
    title: row.title,
    body: row.body,
    readerScore: row.reader_score,
    createdAt: row.created_at,
    moderatedAt: row.moderated_at,
  };
}

export async function insertSubmission(
  values: ValidatedSubmission,
  ipHash: string,
) {
  const sql = getSql();
  if (!sql) {
    return COMMUNITY_UNAVAILABLE;
  }

  await sql`
    INSERT INTO submissions (
      type, status, article_slug, author_name, author_email, title, body, reader_score, ip_hash
    ) VALUES (
      ${values.type},
      'pending',
      ${values.articleSlug ?? null},
      ${values.authorName},
      ${values.authorEmail ?? null},
      ${values.title ?? null},
      ${values.body},
      ${values.readerScore ?? null},
      ${ipHash}
    )
  `;

  return { ok: true as const };
}

export async function listApprovedComments(articleSlug: string): Promise<PublicComment[]> {
  const sql = getSql();
  if (!sql) return [];

  const rows = await sql`
    SELECT id, author_name, body, reader_score, created_at
    FROM submissions
    WHERE type = 'comment'
      AND status = 'approved'
      AND article_slug = ${articleSlug}
    ORDER BY created_at ASC
  `;

  return (rows as Array<Pick<SubmissionRow, "id" | "author_name" | "body" | "reader_score" | "created_at">>).map(
    (row) => ({
      id: row.id,
      authorName: row.author_name,
      body: row.body,
      readerScore: row.reader_score,
      createdAt: row.created_at,
    }),
  );
}

export async function countApprovedComments(articleSlug: string) {
  const sql = getSql();
  if (!sql) return 0;
  const rows = await sql`
    SELECT COUNT(*)::int AS count
    FROM submissions
    WHERE type = 'comment'
      AND status = 'approved'
      AND article_slug = ${articleSlug}
  `;
  return Number((rows[0] as { count: number } | undefined)?.count ?? 0);
}

export async function listApprovedTips(limit = 20): Promise<PublicTip[]> {
  const sql = getSql();
  if (!sql) return [];

  const rows = await sql`
    SELECT id, title, body, author_name, created_at
    FROM submissions
    WHERE type = 'tip' AND status = 'approved'
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;

  return (rows as Array<Pick<SubmissionRow, "id" | "title" | "body" | "author_name" | "created_at">>).map(
    (row) => ({
      id: row.id,
      title: row.title ?? "Tip",
      body: row.body,
      authorName: row.author_name,
      createdAt: row.created_at,
    }),
  );
}

export async function listStaffSubmissions(status: SubmissionStatus | "all" = "pending") {
  const sql = getSql();
  if (!sql) return [];

  const rows =
    status === "all"
      ? await sql`
          SELECT id, type, status, article_slug, author_name, author_email, title, body, reader_score, created_at, moderated_at
          FROM submissions
          ORDER BY created_at DESC
          LIMIT 100
        `
      : await sql`
          SELECT id, type, status, article_slug, author_name, author_email, title, body, reader_score, created_at, moderated_at
          FROM submissions
          WHERE status = ${status}
          ORDER BY created_at DESC
          LIMIT 100
        `;

  return (rows as SubmissionRow[]).map(mapStaff);
}

export async function moderateSubmission(id: string, status: Exclude<SubmissionStatus, "pending">) {
  const sql = getSql();
  if (!sql) return COMMUNITY_UNAVAILABLE;

  await sql`
    UPDATE submissions
    SET status = ${status}, moderated_at = now()
    WHERE id = ${id}
  `;
  return { ok: true as const };
}

export function communityUnavailableResponse() {
  return COMMUNITY_UNAVAILABLE;
}

export function databaseReady() {
  return hasDatabase();
}
