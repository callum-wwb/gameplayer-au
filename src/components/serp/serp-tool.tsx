"use client";

import { useState } from "react";
import { AlertTriangle, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { SerpSnapshot } from "@/lib/serp";

async function requestSnapshot(
  endpoint: "/api/serp/search" | "/api/serp/related",
  query: string,
) {
  const response = await fetch(
    `${endpoint}?q=${encodeURIComponent(query)}`,
    { method: "GET" },
  );
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return (await response.json()) as SerpSnapshot;
}

export function SerpTool() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [snapshot, setSnapshot] = useState<SerpSnapshot | null>(null);

  async function run(kind: "search" | "related") {
    const value = query.trim();
    if (!value) {
      return;
    }
    setLoading(true);
    try {
      const data = await requestSnapshot(
        kind === "search" ? "/api/serp/search" : "/api/serp/related",
        value,
      );
      setSnapshot(data);
    } catch (error) {
      setSnapshot({
        configured: false,
        query: value,
        engine: "google",
        organic: [],
        relatedSearches: [],
        relatedQuestions: [],
        error: error instanceof Error ? error.message : "Request failed.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Alert>
        <AlertTriangle />
        <AlertTitle>Editor research tool — gate before production</AlertTitle>
        <AlertDescription>
          This page calls server-only SerpAPI routes and should sit behind auth
          or be disabled on the public site. The API key never ships to the
          browser.
        </AlertDescription>
      </Alert>

      <form
        className="space-y-3 rounded-xl border border-border/70 bg-card/50 p-4"
        onSubmit={(event) => {
          event.preventDefault();
          void run("search");
        }}
      >
        <Label htmlFor="serp-query">Google query</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="serp-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Elden Ring DLC review AU"
          />
          <Button type="submit" disabled={loading}>
            <Search className="size-4" />
            SERP snapshot
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => void run("related")}
          >
            Related / PAA
          </Button>
        </div>
      </form>

      {!snapshot ? (
        <p className="text-sm text-muted-foreground">
          Run a query to pull title, link, snippet, and position — plus related
          searches and People Also Ask questions when Google returns them.
        </p>
      ) : null}

      {snapshot?.error ? (
        <Alert variant="destructive">
          <AlertTitle>
            {snapshot.configured ? "SerpAPI error" : "SerpAPI is not configured"}
          </AlertTitle>
          <AlertDescription>{snapshot.error}</AlertDescription>
        </Alert>
      ) : null}

      {snapshot && !snapshot.error && snapshot.organic.length === 0 && snapshot.relatedSearches.length === 0 && snapshot.relatedQuestions.length === 0 ? (
        <Alert>
          <AlertTitle>Empty snapshot</AlertTitle>
          <AlertDescription>
            SerpAPI returned no organic results or related helpers for “
            {snapshot.query}”.
          </AlertDescription>
        </Alert>
      ) : null}

      {snapshot && snapshot.organic.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-semibold">
            Organic snapshot
          </h2>
          <ol className="space-y-3">
            {snapshot.organic.map((item) => (
              <li
                key={`${item.position}-${item.link}`}
                className="rounded-xl border border-border/70 bg-card/40 p-4"
              >
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant="secondary">#{item.position}</Badge>
                  <a
                    href={item.link}
                    className="font-medium text-primary hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.title}
                  </a>
                </div>
                <p className="text-xs break-all text-muted-foreground">
                  {item.link}
                </p>
                <p className="mt-2 text-sm">{item.snippet}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {snapshot && (snapshot.relatedSearches.length > 0 || snapshot.relatedQuestions.length > 0) ? (
        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-xl font-semibold">
              Related searches
            </h2>
            <Separator className="my-3" />
            <ul className="flex flex-wrap gap-2">
              {snapshot.relatedSearches.map((item) => (
                <li key={item.query}>
                  <Badge variant="outline">{item.query}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold">
              People Also Ask
            </h2>
            <Separator className="my-3" />
            <ul className="space-y-3">
              {snapshot.relatedQuestions.map((item) => (
                <li key={item.question} className="text-sm">
                  <p className="font-medium">{item.question}</p>
                  {item.snippet ? (
                    <p className="mt-1 text-muted-foreground">{item.snippet}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </div>
  );
}
