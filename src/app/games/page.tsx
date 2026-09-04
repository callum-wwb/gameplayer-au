import type { Metadata } from "next";
import Link from "next/link";
import { GameCover } from "@/components/media/game-cover";
import { getListedHubs } from "@/lib/games";

export const metadata: Metadata = {
  title: "Game hubs",
  description:
    "Evergreen and archive hubs for the games GamePlayer covers — each with credited promotional or editorial art.",
};

export default function GamesIndexPage() {
  const hubs = getListedHubs();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        Coverage
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">
        Game hubs
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Every hub image is either official Steam promotional art or an original
        GamePlayer editorial card. Credits sit on the image and belong to the
        rights holder, not to us.{" "}
        <Link href="/credits/" className="text-primary hover:underline">
          Full media credits
        </Link>
        .
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {hubs.map((game) => (
          <Link
            key={game.slug}
            href={`/games/${game.slug}/`}
            className="group overflow-hidden rounded-2xl border border-border/70 bg-card/50 transition-colors hover:border-primary/40"
          >
            <GameCover
              media={game.image}
              hue={game.hue}
              credit="overlay"
              className="aspect-16/10"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="p-4">
              <p className="font-heading text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
                {game.kind === "hardware" ? "Hardware" : "Game"}
              </p>
              <h2 className="mt-1 font-heading text-xl font-semibold group-hover:text-primary">
                {game.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{game.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
