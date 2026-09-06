-- GamePlayer UGC: comments and reader tips.
-- Run this once against the Neon database after creating it
-- (Vercel Storage → Neon, then `DATABASE_URL` on the gameplayer-au project).

CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('comment', 'tip')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  article_slug text,
  author_name text NOT NULL,
  author_email text,
  title text,
  body text NOT NULL,
  reader_score smallint,
  ip_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),
  moderated_at timestamptz,
  CONSTRAINT comments_need_slug CHECK (type <> 'comment' OR article_slug IS NOT NULL),
  CONSTRAINT tips_need_title CHECK (type <> 'tip' OR title IS NOT NULL),
  CONSTRAINT score_range CHECK (
    reader_score IS NULL OR (reader_score BETWEEN 1 AND 10)
  )
);

CREATE INDEX IF NOT EXISTS submissions_status_created_idx
  ON submissions (status, created_at DESC);

CREATE INDEX IF NOT EXISTS submissions_article_approved_idx
  ON submissions (article_slug, created_at DESC)
  WHERE type = 'comment' AND status = 'approved';

CREATE INDEX IF NOT EXISTS submissions_tips_approved_idx
  ON submissions (created_at DESC)
  WHERE type = 'tip' AND status = 'approved';
