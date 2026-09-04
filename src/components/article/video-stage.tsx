import { Play } from "lucide-react";
import { GameCover } from "@/components/media/game-cover";
import { resolveArticleCover } from "@/lib/article-covers";
import type { Article } from "@/lib/types";

export function VideoStage({ article }: { article: Article }) {
  if (article.videoUrl) {
    const media = resolveArticleCover(article);
    return (
      <div className="overflow-hidden rounded-2xl border border-border/70">
        <iframe
          src={article.videoUrl}
          title={article.title}
          className="aspect-video w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="border-t border-border/60 bg-card/60 px-3 py-2">
          <p className="text-[11px] leading-relaxed text-muted-foreground" title={media.creditLine}>
            {media.creditLine}
          </p>
        </div>
      </div>
    );
  }

  const media = resolveArticleCover(article);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70">
      <GameCover
        media={media}
        hue={article.hue}
        kicker="Video feature"
        credit="overlay"
        className="aspect-video"
        sizes="(max-width: 1024px) 100vw, 1152px"
        showTitle
        title={article.title}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="flex size-16 items-center justify-center rounded-full border border-primary/50 bg-black/50 text-primary shadow-[0_0_30px_-8px_var(--neon)]">
          <Play className="size-7 fill-current" />
        </div>
      </div>
    </div>
  );
}
