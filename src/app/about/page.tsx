import Link from "next/link";
import { SiteLogo } from "@/components/brand/site-logo";
import { buildPageMetadata } from "@/lib/seo";
import { authors, siteConfig } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "About GamePlayer",
  description:
    "GamePlayer masthead — independent Australian games desk, editors, news feeds, and how to reach the publication.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        Masthead
      </p>
      <div className="mt-3 flex items-center gap-3">
        <SiteLogo />
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          {siteConfig.name}
        </h1>
      </div>
      <p className="mt-2 font-heading text-lg text-primary">{siteConfig.tagline}</p>
      <p className="mt-4 text-lg text-muted-foreground">{siteConfig.description}</p>
      <div className="prose-gp mt-8">
        <p>
          GamePlayer is an independent Australian games publication. The legal
          and byline name is <strong>GamePlayer</strong> — not a network imprint
          and not a rewrite desk. We publish original reviews scored out of 10,
          news dated in Australian time, previews, opinion, and editor-led
          video. The living site keeps the 2020 section map — News, Reviews,
          Previews, Opinion, Videos — plus evergreen hubs for Dota 2, Skyrim,
          StarCraft 2,{" "}
          <Link href="/games/hollow-knight-silksong/">Silksong</Link>,{" "}
          <Link href="/games/ghost-of-yotei/">Ghost of Yotei</Link>, and{" "}
          <Link href="/games/pokemon-legends-za/">Pokémon Legends Z-A</Link>.
        </p>
        <p>
          Reviews are original GamePlayer copy. When we mention another
          outlet&apos;s verdict we credit the named reviewer and link the
          original. We do not copy-spin third-party articles. Image rights stay
          with the developers and publishers named on every cover — see{" "}
          <Link href="/credits/">media credits</Link> and the{" "}
          <Link href="/editorial-policy/">editorial policy</Link>.
        </p>
        <h2>Read us, contact us</h2>
        <ul>
          <li>
            Editorial desk:{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> — also on{" "}
            <Link href="/contact/">/contact</Link>
          </li>
          <li>
            News tips:{" "}
            <a href={`mailto:${siteConfig.tipsEmail}`}>{siteConfig.tipsEmail}</a>{" "}
            or the public form at <Link href="/community/">/community</Link>
          </li>
          <li>
            Corrections log: <Link href="/corrections/">/corrections</Link>
          </li>
          <li>
            Full RSS: <Link href="/feed.xml">/feed.xml</Link>
          </li>
          <li>
            News-only RSS: <Link href="/news/feed.xml">/news/feed.xml</Link>
          </li>
        </ul>
        <p>
          Editors can use the{" "}
          <Link href="/tools/serp">SerpAPI research tool</Link> for SERP
          snapshots. That route is staff-only and is disallowed in robots.txt.
        </p>
        <h2>Trademarks and artwork</h2>
        <p>
          GamePlayer does not own the games, characters, promotional stills,
          hardware names, or trademarks that appear in our coverage. Those
          belong to the developers, publishers, and platform makers named on
          each image and on the <Link href="/credits/">media credits</Link>{" "}
          page. Steam store headers are used for editorial review and news
          context. Where no official still exists, we run an original abstract
          editorial card and still credit the title&apos;s rights holder.
        </p>
      </div>
      <h2 className="mt-10 font-heading text-2xl font-bold">The desk</h2>
      <ul className="mt-4 space-y-4">
        {Object.values(authors).map((author) => (
          <li key={author.slug} className="rounded-xl border border-border/70 p-4">
            <p className="font-heading font-semibold">
              <Link href={`/authors/${author.slug}/`} className="hover:text-primary">
                {author.name}
              </Link>
            </p>
            <p className="text-sm text-primary">{author.role}</p>
            <p className="mt-1 text-sm text-muted-foreground">{author.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
