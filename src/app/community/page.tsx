import Link from "next/link";
import { TipForm } from "@/components/community/tip-form";
import { formatDate } from "@/lib/content";
import { hasDatabase } from "@/lib/db";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { listApprovedTips } from "@/lib/ugc";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
  title: "Community",
  description:
    "GamePlayer community — approved reader tips, house rules, and how to send news to the Australian desk.",
  path: "/community/",
});

export default async function CommunityPage() {
  const available = hasDatabase();
  let tips: Awaited<ReturnType<typeof listApprovedTips>> = [];
  if (available) {
    try {
      tips = await listApprovedTips();
    } catch {
      tips = [];
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        Readers
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">
        Community
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        A magazine letters page, not a comment farm. Tips are moderated. Abuse
        is not a genre.
      </p>
      <div className="prose-gp mt-8">
        <h2>House rules</h2>
        <ul>
          <li>Use a name you will stand behind. Email is never published.</li>
          <li>No pile-ons, no harassment, no leaking someone else&apos;s private life.</li>
          <li>Two links is plenty. This is not a SEO drop box.</li>
          <li>
            Everything starts pending. Approved items show; rejected items do
            not. Full policy:{" "}
            <Link href="/editorial-policy/">editorial policy</Link>.
          </li>
        </ul>
        <p>
          Prefer mail? {siteConfig.tipsEmail} is on{" "}
          <Link href="/contact/">/contact</Link>. Same queue.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="font-heading text-2xl font-bold">Approved tips</h2>
        {tips.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            {available
              ? "Nothing approved yet. Send a tip that would help another Australian player."
              : "The public tray is waiting on a database. The form below will say when writes are offline."}
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {tips.map((tip) => (
              <li key={tip.id} className="rounded-xl border border-border/70 bg-card/40 p-4">
                <p className="font-heading text-lg font-semibold">{tip.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {tip.authorName} · {formatDate(tip.createdAt)}
                </p>
                <p className="mt-3 text-sm leading-relaxed">{tip.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12" id="tip">
        <h2 className="font-heading text-2xl font-bold">Send a tip</h2>
        <p className="mt-2 mb-6 text-sm text-muted-foreground">
          Short news the desk might have missed — retail, patches, local events.
          A longer form also lives at <Link href="/submit-tip/">/submit-tip</Link>.
        </p>
        <TipForm available={available} />
      </section>
    </div>
  );
}
