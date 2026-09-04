import type { Metadata } from "next";
import Link from "next/link";
import { authors, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "GamePlayer is an independent Australian games desk — reviews out of 10, news, previews, and opinion.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        About the desk
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">
        {siteConfig.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        {siteConfig.description}
      </p>
      <div className="prose-gp mt-8">
        <p>
          This rebuild keeps the 2020 GamePlayer sections — News, Reviews,
          Previews, Opinion, Videos — and the evergreen hubs for Dota 2, Skyrim,
          and StarCraft 2. We added Elden Ring and Baldur&apos;s Gate 3 because
          those are the modern games readers still live in, plus first-class
          PlayStation, Xbox, and Nintendo Switch filters alongside PC, Mobile,
          and Classic.
        </p>
        <p>
          Reviews are scored out of 10 and publish Review JSON-LD for search.
          The archive is a native Next.js site, not WordPress. RSS lives at{" "}
          <Link href="/feed.xml">/feed.xml</Link>.
        </p>
        <p>
          Editors can use the{" "}
          <Link href="/tools/serp">SerpAPI research tool</Link> for SERP
          snapshots and People Also Ask helpers. That route is documented as
          staff-only and should be gated before a production launch.
        </p>
      </div>
      <h2 className="mt-10 font-heading text-2xl font-bold">Masthead</h2>
      <ul className="mt-4 space-y-4">
        {Object.values(authors).map((author) => (
          <li key={author.slug} className="rounded-xl border border-border/70 p-4">
            <p className="font-heading font-semibold">{author.name}</p>
            <p className="text-sm text-primary">{author.role}</p>
            <p className="mt-1 text-sm text-muted-foreground">{author.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
