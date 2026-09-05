import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { authors, siteConfig } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "About GamePlayer",
  description:
    "GamePlayer is an independent Australian games desk — reviews out of 10, news, previews, and opinion.",
  path: "/about/",
});

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
          StarCraft 2, and{" "}
          <Link href="/games/hollow-knight-silksong/">Silksong</Link>,{" "}
          <Link href="/games/ghost-of-yotei/">Ghost of Yotei</Link>, and{" "}
          <Link href="/games/pokemon-legends-za/">Pokémon Legends Z-A</Link>. We cover
          modern living-room games — Ghost of Yotei, Pokémon Legends Z-A,
          Metroid Prime 4: Beyond, Elden Ring, Baldur&apos;s Gate 3, Mario Kart
          World, Expedition 33, Death Stranding 2 — plus first-class
          PlayStation, Xbox, and Nintendo Switch filters alongside PC, Mobile,
          and Classic.
        </p>
        <p>
          Reviews are original GamePlayer copy, scored out of 10, with Review
          and FAQ JSON-LD. When we mention another outlet&apos;s verdict we
          credit the named reviewer and link the original. We do not rewrite
          other sites&apos; reviews. RSS lives at{" "}
          <Link href="/feed.xml">/feed.xml</Link>.
        </p>
        <p>
          Editors can use the{" "}
          <Link href="/tools/serp">SerpAPI research tool</Link> for SERP
          snapshots and People Also Ask helpers. That route is documented as
          staff-only and should be gated before a production launch.
        </p>
        <h2>Trademarks and artwork</h2>
        <p>
          GamePlayer does not own the games, characters, promotional stills,
          hardware names, or trademarks that appear in our coverage. Those
          belong to the developers, publishers, and platform makers named on
          each image and on the{" "}
          <Link href="/credits/">media credits</Link> page. Steam store headers
          are used for editorial review and news context. Where no official
          still exists, we run an original abstract editorial card and still
          credit the title&apos;s rights holder.
        </p>
      </div>
      <h2 className="mt-10 font-heading text-2xl font-bold">Masthead</h2>
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
