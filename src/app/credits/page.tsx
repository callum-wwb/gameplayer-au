import type { Metadata } from "next";
import Link from "next/link";
import { GameCover } from "@/components/media/game-cover";
import { allCreditRows } from "@/lib/article-covers";
import { STEAM_APP_IDS } from "@/lib/games";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Media credits",
  description:
    "Copyright and trademark credits for game artwork used on GamePlayer. GamePlayer does not own third-party game art.",
};

export default function CreditsPage() {
  const rows = allCreditRows();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        Rights holders
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">
        Media credits
      </h1>
      <div className="prose-gp mt-6">
        <p>
          {siteConfig.name} is an independent Australian editorial desk. We do
          not own the games, characters, box art, hardware names, or trademarks
          discussed on this site. Those belong to the developers, publishers,
          and platform makers named below.
        </p>
        <p>
          Where an official Steam store header or capsule exists, we use that
          promotional artwork for review and news context and keep a visible
          credit on every image. Where no official still was available — notably{" "}
          <em>StarCraft II</em> (Battle.net, not Steam) and unreleased{" "}
          <em>Grand Theft Auto VI</em> — we commissioned an original abstract
          editorial illustration. Those cards use mood and palette only: no
          character likenesses and no copied box art. The title credit still
          belongs to the rights holder.
        </p>
        <p>
          Steam App IDs used for store art:{" "}
          {Object.entries(STEAM_APP_IDS)
            .map(([slug, id]) => `${slug} (${id})`)
            .join(", ")}
          .
        </p>
      </div>

      <ul className="mt-10 space-y-8">
        {rows.map((row) => (
          <li
            key={row.key}
            className="grid gap-4 border-b border-border/60 pb-8 sm:grid-cols-[12rem_minmax(0,1fr)]"
          >
            <GameCover
              media={row.media}
              credit="compact"
              className="aspect-16/10 rounded-xl"
              sizes="192px"
            />
            <div>
              <p className="font-heading text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
                {row.kind}
              </p>
              <h2 className="mt-1 font-heading text-xl font-semibold">
                {row.href ? (
                  <Link href={row.href} className="hover:text-primary">
                    {row.title}
                  </Link>
                ) : (
                  row.title
                )}
              </h2>
              <dl className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <div>
                  <dt className="font-medium text-foreground">Copyright owner</dt>
                  <dd>{row.media.copyrightOwner}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Developer</dt>
                  <dd>{row.media.developer}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Publisher</dt>
                  <dd>{row.media.publisher}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Credit line</dt>
                  <dd>{row.media.creditLine}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Image source</dt>
                  <dd className="break-all">{row.media.imageSource}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Licence note</dt>
                  <dd>{row.media.licenseNote}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
