import Link from "next/link";
import { TipForm } from "@/components/community/tip-form";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
  title: "Submit a tip",
  description:
    "Send an Australian gaming news tip to the GamePlayer desk. Moderated before anything is published.",
  path: "/submit-tip/",
});

export default function SubmitTipPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        Tips
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">
        Submit a tip
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Storefront oddities, Australian retail notes, LAN dates, the patch that
        actually changed a weeknight. The same form is on{" "}
        <Link href="/community/#tip">/community</Link>. Mail also works:{" "}
        <a href={`mailto:${siteConfig.tipsEmail}`}>{siteConfig.tipsEmail}</a>.
      </p>
      <div className="mt-8">
        <TipForm />
      </div>
    </div>
  );
}
