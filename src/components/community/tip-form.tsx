"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TipForm({
  available = true,
  unavailableMessage,
}: {
  available?: boolean;
  unavailableMessage?: string;
}) {
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);
  const [ready, setReady] = useState(available);
  const [unavailable, setUnavailable] = useState(unavailableMessage ?? "");
  const startedAt = useMemo(() => Date.now(), []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setPending(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      title: String(data.get("title") ?? ""),
      body: String(data.get("body") ?? ""),
      website: String(data.get("website") ?? ""),
      startedAt,
    };

    try {
      const response = await fetch("/api/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await response.json()) as { message?: string; code?: string };
      if (response.status === 503 || json.code === "community_unavailable") {
        setReady(false);
        setUnavailable(json.message ?? "Community is almost ready.");
        return;
      }
      if (!response.ok) {
        setError(json.message ?? "The desk could not file that tip.");
        return;
      }
      form.reset();
      setNotice("Tip filed. An editor will read it before anything is published.");
    } catch {
      setError("The desk could not file that tip.");
    } finally {
      setPending(false);
    }
  }

  if (!ready) {
    return (
      <Alert>
        <AlertTitle>Community is almost ready</AlertTitle>
        <AlertDescription>
          {unavailable || "The tip mailbox is not connected yet."} Use{" "}
          <Link href="/contact/">contact</Link> in the meantime.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="tip-name">Name</Label>
          <Input id="tip-name" name="name" required maxLength={80} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tip-email">Contact email</Label>
          <Input id="tip-email" name="email" type="email" required maxLength={120} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="tip-title">Tip title</Label>
        <Input id="tip-title" name="title" required minLength={8} maxLength={140} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="tip-body">What should the desk know?</Label>
        <Textarea
          id="tip-body"
          name="body"
          required
          minLength={20}
          maxLength={2000}
          className="min-h-36"
        />
      </div>
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="tip-website">Website</Label>
        <Input id="tip-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {notice ? <p className="text-sm text-primary">{notice}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Filing…" : "Send a tip"}
      </Button>
    </form>
  );
}
