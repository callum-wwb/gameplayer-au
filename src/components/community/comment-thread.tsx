"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { articleCommentsJsonLd } from "@/lib/seo";
import { canonicalUrl } from "@/lib/site";

type PublicComment = {
  id: string;
  authorName: string;
  body: string;
  readerScore: number | null;
  createdAt: string;
};

export function CommentThread({
  slug,
  title,
  allowScore,
}: {
  slug: string;
  title: string;
  allowScore: boolean;
}) {
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [ready, setReady] = useState(true);
  const [unavailable, setUnavailable] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);
  const startedAt = useMemo(() => Date.now(), []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`);
        const data = (await response.json()) as {
          ok?: boolean;
          code?: string;
          message?: string;
          comments?: PublicComment[];
        };
        if (cancelled) return;
        if (response.status === 503 || data.code === "community_unavailable") {
          setReady(false);
          setUnavailable(data.message ?? "Community is almost ready.");
          return;
        }
        setComments(data.comments ?? []);
      } catch {
        if (!cancelled) {
          setReady(false);
          setUnavailable("Community is almost ready.");
        }
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const commentSchema = articleCommentsJsonLd({
    articleUrl: canonicalUrl(`/${slug}/`),
    comments: comments.map((comment) => ({
      authorName: comment.authorName,
      body: comment.body,
      createdAt: comment.createdAt,
    })),
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setPending(true);
    const form = event.currentTarget;
    const payload = {
      articleSlug: slug,
      name: String(new FormData(form).get("name") ?? ""),
      email: String(new FormData(form).get("email") ?? ""),
      body: String(new FormData(form).get("body") ?? ""),
      readerScore: allowScore ? String(new FormData(form).get("readerScore") ?? "") : "",
      website: String(new FormData(form).get("website") ?? ""),
      startedAt,
    };

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { message?: string; code?: string };
      if (response.status === 503 || data.code === "community_unavailable") {
        setReady(false);
        setUnavailable(data.message ?? "Community is almost ready.");
        return;
      }
      if (!response.ok) {
        setError(data.message ?? "The desk could not file that letter.");
        return;
      }
      form.reset();
      setNotice("Filed with the desk. Letters appear after an editor approves them.");
    } catch {
      setError("The desk could not file that letter.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="border-t border-border/70 pt-10">
      {commentSchema ? <JsonLd data={commentSchema} /> : null}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Letters
          </p>
          <h2 className="mt-1 font-heading text-2xl font-bold">The desk is listening</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Reader notes on <span className="text-foreground">{title}</span>. Email stays
            off the page.{" "}
            <Link href="/editorial-policy/" className="text-primary hover:underline">
              House rules
            </Link>
            .
          </p>
        </div>
        {comments.length > 0 ? (
          <p className="font-heading text-sm text-muted-foreground">
            {comments.length} approved {comments.length === 1 ? "letter" : "letters"}
          </p>
        ) : null}
      </div>

      {!ready ? (
        <Alert className="mt-6">
          <AlertTitle>Community is almost ready</AlertTitle>
          <AlertDescription>
            {unavailable} You can still write the desk at the{" "}
            <Link href="/contact/">contact page</Link>.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {comments.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              No approved letters on this piece yet. Be the first that is worth keeping.
            </p>
          ) : (
            <ol className="mt-6 space-y-4">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="rounded-xl border border-border/70 bg-card/40 px-4 py-3"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="font-heading text-sm font-semibold">{comment.authorName}</p>
                    <time
                      className="text-xs text-muted-foreground"
                      dateTime={comment.createdAt}
                    >
                      {new Intl.DateTimeFormat("en-AU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        timeZone: "Australia/Sydney",
                      }).format(new Date(comment.createdAt))}
                    </time>
                    {comment.readerScore != null ? (
                      <span className="font-heading text-xs font-semibold text-primary">
                        Reader {comment.readerScore}/10
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">{comment.body}</p>
                </li>
              ))}
            </ol>
          )}

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <p className="font-heading text-sm font-semibold tracking-wide uppercase">
              File a letter
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor={`name-${slug}`}>Name</Label>
                <Input id={`name-${slug}`} name="name" required maxLength={80} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`email-${slug}`}>Email (not published)</Label>
                <Input id={`email-${slug}`} name="email" type="email" maxLength={120} />
              </div>
            </div>
            {allowScore ? (
              <div className="max-w-40 space-y-1.5">
                <Label htmlFor={`score-${slug}`}>Your score /10</Label>
                <Input
                  id={`score-${slug}`}
                  name="readerScore"
                  type="number"
                  min={1}
                  max={10}
                  step={1}
                />
              </div>
            ) : null}
            <div className="space-y-1.5">
              <Label htmlFor={`body-${slug}`}>Letter</Label>
              <Textarea
                id={`body-${slug}`}
                name="body"
                required
                minLength={20}
                maxLength={2000}
                className="min-h-32"
              />
            </div>
            <div className="hidden" aria-hidden="true">
              <Label htmlFor={`website-${slug}`}>Website</Label>
              <Input id={`website-${slug}`} name="website" tabIndex={-1} autoComplete="off" />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            {notice ? <p className="text-sm text-primary">{notice}</p> : null}
            <Button type="submit" disabled={pending}>
              {pending ? "Filing…" : "Send to the desk"}
            </Button>
          </form>
        </>
      )}
    </section>
  );
}
