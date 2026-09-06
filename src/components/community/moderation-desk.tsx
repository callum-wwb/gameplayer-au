"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type StaffSubmission = {
  id: string;
  type: "comment" | "tip";
  status: "pending" | "approved" | "rejected";
  articleSlug: string | null;
  authorName: string;
  authorEmail: string | null;
  title: string | null;
  body: string;
  readerScore: number | null;
  createdAt: string;
};

type StatusFilter = "pending" | "approved" | "rejected" | "all";

export function ModerationDesk() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [items, setItems] = useState<StaffSubmission[]>([]);
  const [filter, setFilter] = useState<StatusFilter>("pending");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load(nextFilter: StatusFilter, headerSecret?: string) {
    const response = await fetch(`/api/staff/moderation?status=${nextFilter}`, {
      headers: headerSecret ? { "x-moderation-secret": headerSecret } : undefined,
    });
    const data = (await response.json()) as {
      message?: string;
      items?: StaffSubmission[];
    };
    if (!response.ok) {
      throw new Error(data.message ?? "Unauthorized");
    }
    setItems(data.items ?? []);
  }

  async function unlock(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/staff/moderation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unlock: true, secret }),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setError(data.message ?? "That secret is not accepted.");
        return;
      }
      await load(filter, secret);
      setUnlocked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not unlock the queue.");
    } finally {
      setBusy(false);
    }
  }

  async function changeFilter(next: StatusFilter) {
    setFilter(next);
    setBusy(true);
    try {
      await load(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load the queue.");
    } finally {
      setBusy(false);
    }
  }

  async function moderate(id: string, action: "approve" | "reject") {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/staff/moderation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setError(data.message ?? "Could not update that item.");
        return;
      }
      await load(filter);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update that item.");
    } finally {
      setBusy(false);
    }
  }

  if (!unlocked) {
    return (
      <form onSubmit={unlock} className="mx-auto max-w-sm space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="moderation-secret">Moderation secret</Label>
          <Input
            id="moderation-secret"
            type="password"
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" disabled={busy}>
          Open the queue
        </Button>
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(["pending", "approved", "rejected", "all"] as const).map((value) => (
          <Button
            key={value}
            type="button"
            size="sm"
            variant={filter === value ? "default" : "outline"}
            onClick={() => void changeFilter(value)}
            disabled={busy}
          >
            {value}
          </Button>
        ))}
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing in this tray.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-border/70 bg-card/40 p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{item.type}</Badge>
                <Badge variant="outline">{item.status}</Badge>
                {item.readerScore != null ? (
                  <span className="text-xs text-primary">Score {item.readerScore}/10</span>
                ) : null}
                {item.articleSlug ? (
                  <span className="font-mono text-xs text-muted-foreground">
                    /{item.articleSlug}/
                  </span>
                ) : null}
              </div>
              <p className="mt-3 font-heading text-base font-semibold">
                {item.title ?? "Letter"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {item.authorName}
                {item.authorEmail ? ` · ${item.authorEmail}` : ""} ·{" "}
                {new Date(item.createdAt).toLocaleString("en-AU")}
              </p>
              <p className="mt-3 text-sm leading-relaxed">{item.body}</p>
              {item.status === "pending" ? (
                <div className="mt-4 flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    disabled={busy}
                    onClick={() => void moderate(item.id, "approve")}
                  >
                    Approve
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    disabled={busy}
                    onClick={() => void moderate(item.id, "reject")}
                  >
                    Reject
                  </Button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
