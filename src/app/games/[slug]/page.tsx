import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchivePage } from "@/components/archive/archive-page";
import { JsonLd } from "@/components/json-ld";
import { GameCover } from "@/components/media/game-cover";
import { getArticlesByGame } from "@/lib/content";
import { getGameHub, getListedHubs } from "@/lib/games";
import { imageObjectJsonLd } from "@/lib/media";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return getListedHubs().map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameHub(slug);
  if (!game) {
    return { title: "Game hub" };
  }
  return {
    title: game.title,
    description: game.description,
    other: {
      "copyright-owner": game.copyrightOwner,
      "image-credit": game.image.creditLine,
    },
  };
}

export default async function GameHubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameHub(slug);
  if (!game || !game.listedHub) {
    notFound();
  }

  const articles = getArticlesByGame(game.slug);

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": game.kind === "hardware" ? "Product" : "VideoGame",
          name: game.title,
          description: game.description,
          author: { "@type": "Organization", name: game.developer },
          publisher: { "@type": "Organization", name: game.publisher },
          copyrightHolder: {
            "@type": "Organization",
            name: game.copyrightOwner,
          },
          image: imageObjectJsonLd(
            game.image,
            absoluteUrl(`/games/${game.slug}/`),
          ),
        }}
      />
      <div className="border-b border-border/70 bg-card/30">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-[16rem_minmax(0,1fr)] md:items-start">
          <GameCover
            media={game.image}
            hue={game.hue}
            title={game.shortTitle}
            kicker={game.kind === "hardware" ? "Hardware hub" : "Game hub"}
            showTitle
            credit="both"
            className="aspect-4/3 rounded-2xl"
            sizes="320px"
            priority
          />
          <div>
            <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              {game.evergreen ? "Evergreen hub" : "Coverage hub"}
            </p>
            <h1 className="mt-2 font-heading text-4xl font-bold">{game.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{game.tagline}</p>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              {game.description}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {game.developer} · published by {game.publisher} · {game.released}{" "}
              · {game.platforms.join(" · ")}
            </p>
            {game.steamAppId ? (
              <p className="mt-2 text-xs text-muted-foreground">
                Steam App ID {game.steamAppId}. Promotional art sourced from the
                official Steam store listing.
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">
                No official store header was available. The image is an original
                GamePlayer editorial illustration; the title and trademarks stay
                with {game.copyrightOwner}.
              </p>
            )}
          </div>
        </div>
      </div>
      <ArchivePage
        title={`${game.shortTitle} coverage`}
        description={`Reviews, news, previews, and features tagged to ${game.title}.`}
        path={`/games/${game.slug}/`}
        articles={articles}
      />
    </div>
  );
}
