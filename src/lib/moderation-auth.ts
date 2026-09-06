import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";

export const MODERATION_COOKIE = "gp_moderation";

function secret() {
  return process.env.MODERATION_SECRET?.trim() ?? "";
}

export function moderationConfigured() {
  return secret().length >= 8;
}

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

export function secretsMatch(candidate: string | null | undefined) {
  const expected = secret();
  if (!expected || !candidate) return false;
  const left = digest(candidate);
  const right = digest(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function readModerationSecret(request?: Request) {
  const headerStore = request ? request.headers : await headers();
  const fromHeader =
    headerStore.get("x-moderation-secret") ??
    headerStore.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (fromHeader) return fromHeader;

  if (request) {
    const url = new URL(request.url);
    const fromQuery = url.searchParams.get("secret");
    if (fromQuery) return fromQuery;
  }

  const jar = await cookies();
  return jar.get(MODERATION_COOKIE)?.value;
}

export async function isModerationAuthorized(request?: Request) {
  if (!moderationConfigured()) return false;
  return secretsMatch(await readModerationSecret(request));
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
