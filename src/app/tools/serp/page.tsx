import type { Metadata } from "next";
import { SerpTool } from "@/components/serp/serp-tool";

export const metadata: Metadata = {
  title: "SERP research",
  description:
    "Staff research tool for Google SERP snapshots via SerpAPI. Gate this route before production.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SerpToolPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        Editor tools
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">
        SERP snapshot
      </h1>
      <p className="mt-3 text-muted-foreground">
        Server-only Google Search via SerpAPI. Use it to check titles, links,
        snippets, ranking position, related searches, and People Also Ask
        questions while planning coverage. Requires{" "}
        <code className="font-mono text-sm">SERPAPI_API_KEY</code> on the
        server.
      </p>
      <div className="mt-8">
        <SerpTool />
      </div>
    </div>
  );
}
