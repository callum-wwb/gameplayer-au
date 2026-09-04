import { notFound } from "next/navigation";
import { ArchivePage } from "@/components/archive/archive-page";
import { CoverArt } from "@/components/article/cover-art";
import { getArticlesByGame } from "@/lib/content";
import { gameHubs, getGameHub } from "@/lib/games";

export function generateStaticParams() {
  return gameHubs.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameHub(slug);
  if (!game) {
    return { title: "Game hub" };
  }
  return {
    title: game.title,
    description: game.description,
  };
}

export default async function GameHubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameHub(slug);
  if (!game) {
    notFound();
  }

  const articles = getArticlesByGame(game.slug);

  return (
    <div>
      <div className="border-b border-border/70 bg-card/30">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-[16rem_minmax(0,1fr)] md:items-center">
          <CoverArt
            title={game.shortTitle}
            hue={game.hue}
            kicker="Game hub"
            className="aspect-4/3 rounded-2xl"
          />
          <div>
            <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              Evergreen hub
            </p>
            <h1 className="mt-2 font-heading text-4xl font-bold">{game.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{game.tagline}</p>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              {game.description}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {game.developer} · {game.released} · {game.platforms.join(" · ")}
            </p>
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
