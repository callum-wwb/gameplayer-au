import { ScoreBadge } from "@/components/article/score-badge";
import type { Article } from "@/lib/types";

export function ReviewPanel({ article }: { article: Article }) {
  if (article.type !== "review" || article.score === undefined) {
    return null;
  }

  const hasBreakdown =
    (article.pros && article.pros.length > 0) ||
    (article.cons && article.cons.length > 0);

  return (
    <aside className="space-y-4 rounded-2xl border border-primary/30 bg-card/80 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
          {article.playtime ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Playtime: {article.playtime}
            </p>
          ) : null}
          <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">
            Scored out of 10 · GamePlayer only
          </p>
        </div>
      </div>
      {hasBreakdown ? (
        <div className="grid gap-4 border-t border-border/60 pt-4 sm:grid-cols-2">
          {article.pros?.length ? (
            <div>
              <p className="font-heading text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                What works
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                {article.pros.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {article.cons?.length ? (
            <div>
              <p className="font-heading text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                What creaks
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                {article.cons.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </aside>
  );
}
