import { Play } from "lucide-react";
import { CoverArt } from "@/components/article/cover-art";
import type { Article } from "@/lib/types";

export function VideoStage({ article }: { article: Article }) {
  if (article.videoUrl) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border/70">
        <iframe
          src={article.videoUrl}
          title={article.title}
          className="aspect-video w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70">
      <CoverArt
        title={article.title}
        hue={article.hue}
        kicker="Video feature"
        className="aspect-video"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex size-16 items-center justify-center rounded-full border border-primary/50 bg-black/50 text-primary shadow-[0_0_30px_-8px_var(--neon)]">
          <Play className="size-7 fill-current" />
        </div>
      </div>
    </div>
  );
}
