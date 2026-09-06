import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Contact GamePlayer",
  description:
    "Editorial contact for GamePlayer — news desk, tips mailbox, and what to expect when you write in.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        Contact
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">
        Write the desk
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        GamePlayer is a small Australian masthead. Email is the front door.
        We do not run a switchboard and we do not take review assignments from
        a cold pitch overnight.
      </p>
      <div className="prose-gp mt-8">
        <h2>Editorial</h2>
        <p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <br />
          Corrections, right-of-reply, embargo notes, and questions about a
          published story. Name the URL.
        </p>
        <h2>Tips mailbox</h2>
        <p>
          <a href={`mailto:${siteConfig.tipsEmail}`}>{siteConfig.tipsEmail}</a>
          <br />
          Storefront oddities, Australian retail notes, LAN dates, and the
          patch that actually changed a weeknight. Public form:{" "}
          <Link href="/submit-tip/">/submit-tip</Link>.
        </p>
        <h2>What to expect</h2>
        <ul>
          <li>We aim to read editorial mail within five weekdays.</li>
          <li>Tips that become stories get a reply. Most will not.</li>
          <li>
            We do not sell sponsored reviews or accept score requests. See the{" "}
            <Link href="/editorial-policy/">editorial policy</Link>.
          </li>
          <li>
            Reader letters on stories are moderated before they appear. Email
            addresses are never published.
          </li>
        </ul>
        <p>
          Publication name: <strong>{siteConfig.name}</strong>. Locale:{" "}
          {siteConfig.language}. About / masthead: <Link href="/about/">/about</Link>.
        </p>
      </div>
    </div>
  );
}
