import { ScoreBadge } from "@/components/article/score-badge";
import type { Article } from "@/lib/types";

export function ReviewPanel({ article }: { article: Article }) {
  if (article.type !== "review" || article.score === undefined) {
    return null;
  }

  return (
    <aside className="flex flex-col gap-4 rounded-2xl border border-primary/30 bg-card/80 p-5 sm:flex-row sm:items-center">
      <ScoreBadge score={article.score} size="lg" />
      <div>
        <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          GamePlayer verdict
        </p>
        <h2 className="mt-1 font-heading text-xl font-semibold">
          {article.gameTitle ?? article.title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {article.verdict}
        </p>
        <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">
          Scored out of 10
        </p>
      </div>
    </aside>
  );
}
