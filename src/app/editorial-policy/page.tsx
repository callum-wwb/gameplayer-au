import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Editorial policy",
  description:
    "GamePlayer editorial standards — corrections, conflicts, review scoring, UGC moderation, and image credits.",
  path: "/editorial-policy/",
});

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        Standards
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">
        Editorial policy
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        How {siteConfig.name} reports, scores, credits images, and moderates
        reader mail. If a story falls short of this page, write{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
      <div className="prose-gp mt-8">
        <h2>Original work</h2>
        <p>
          Reviews, news, previews, and opinion are written by the named
          GamePlayer author. We do not copy-spin other outlets. When we cite
          another publication we name the reviewer or reporter and link the
          original.
        </p>
        <h2>Review scoring</h2>
        <p>
          Scores are out of 10 and belong to GamePlayer. We play the shipped
          game before a number goes on the page. Previews and calendar news do
          not carry scores. A buying guide is not a review. Reader scores on
          review pages are optional, 1–10, and only appear after moderation.
        </p>
        <h2>Corrections</h2>
        <p>
          Factual errors get a correction, not a silent rewrite when the change
          would mislead someone who already read the piece. Material
          corrections are logged on <Link href="/corrections/">/corrections</Link>{" "}
          and noted on the story when the change is more than a typo. Send the
          URL and the sentence that is wrong.
        </p>
        <h2>Conflicts</h2>
        <p>
          Review codes and preview access are tools, not a bargain. We do not
          sell scores, bury a verdict for access, or let a publisher write the
          standfirst. Personal conflicts (a staffer who worked on a game, or
          close family who did) are declared on the story or the author is
          recused.
        </p>
        <h2>UGC moderation</h2>
        <p>
          Comments and community tips start as <strong>pending</strong>. Only{" "}
          <strong>approved</strong> items are public. Rejected items stay
          hidden. We cut abuse, spam, personal data dumps, and link-floods.
          Emails collected on forms are for the desk only. House rules for
          readers also live on <Link href="/community/">/community</Link>.
        </p>
        <h2>Image credits</h2>
        <p>
          GamePlayer does not own third-party game art, characters, or
          trademarks. Official Steam promotional art is used for editorial
          context. Where no official still exists we commission an original
          abstract card — no character likenesses, no copied box art — and
          still name the rights holder. The public ledger is{" "}
          <Link href="/credits/">/credits</Link>.
        </p>
      </div>
    </div>
  );
}
