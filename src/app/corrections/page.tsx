import Link from "next/link";
import { corrections } from "@/lib/corrections";
import { formatDate } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Corrections",
  description:
    "GamePlayer corrections log — how we amend published stories, and the recent list.",
  path: "/corrections/",
});

export default function CorrectionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        Accountability
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">
        Corrections
      </h1>
      <div className="prose-gp mt-6">
        <p>
          If GamePlayer got a date, price, platform, or credit wrong, we want
          the URL and the sentence. Write{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. The
          standards sit in the{" "}
          <Link href="/editorial-policy/">editorial policy</Link>.
        </p>
        <p>
          Typos can be fixed quietly. A change that would have altered a
          reader&apos;s decision — the wrong unlock day, a phantom PC SKU, a
          mis-attributed score — is logged here.
        </p>
      </div>
      <h2 className="mt-10 font-heading text-2xl font-bold">Recent corrections</h2>
      {corrections.length === 0 ? (
        <p className="mt-4 rounded-xl border border-border/70 bg-card/40 px-4 py-5 text-sm text-muted-foreground">
          No corrections logged yet. This list will grow in public when the
          desk owes readers a fix.
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {corrections.map((entry) => (
            <li
              key={`${entry.date}-${entry.articleSlug}`}
              className="rounded-xl border border-border/70 p-4"
            >
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                {formatDate(entry.date)}
              </p>
              <p className="mt-1 font-heading font-semibold">
                <Link href={`/${entry.articleSlug}/`} className="hover:text-primary">
                  {entry.articleTitle}
                </Link>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{entry.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
