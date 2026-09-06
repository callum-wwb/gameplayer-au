import "server-only";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

type Sql = NeonQueryFunction<false, false>;

let sql: Sql | null | undefined;

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getSql(): Sql | null {
  if (sql !== undefined) {
    return sql;
  }

  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    sql = null;
    return null;
  }

  sql = neon(url);
  return sql;
}

export const COMMUNITY_UNAVAILABLE = {
  ok: false as const,
  code: "community_unavailable",
  message:
    "Community is almost ready. The desk has not connected a database yet.",
};
