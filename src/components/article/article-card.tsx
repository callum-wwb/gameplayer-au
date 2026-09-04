import Link from "next/link";
import { CoverArt } from "@/components/article/cover-art";
import { ScoreBadge } from "@/components/article/score-badge";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/content";
import { articleTypes, platforms } from "@/lib/site";
import type { Article } from "@/lib/types";

export function ArticleCard({
  article,
  variant = "grid",
}: {
  article: Article;
  variant?: "grid" | "row" | "teaser";
}) {
  if (variant === "row") {
    return (
      <Link
        href={`/${article.slug}/`}
        className="group flex gap-3 rounded-xl border border-border/70 bg-card/40 p-2 transition-colors hover:border-primary/40 hover:bg-card"
      >
        <CoverArt
          title={article.gameTitle ?? article.title}
          hue={article.hue}
          className="h-20 w-28 shrink-0 rounded-lg"
        />
        <div className="min-w-0 py-0.5">
          <p className="text-[11px] font-semibold tracking-wider text-primary uppercase">
            {articleTypes[article.type].label}
          </p>
          <h3 className="line-clamp-2 font-heading text-sm leading-snug font-semibold group-hover:text-primary">
            {article.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatDate(article.publishedAt)}
          </p>
        </div>
        {article.score !== undefined ? (
          <ScoreBadge score={article.score} size="sm" className="self-center" />
        ) : null}
      </Link>
    );
  }

  if (variant === "teaser") {
    return (
      <article className="group flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card/50">
        <Link href={`/${article.slug}/`} className="relative block">
          <CoverArt
            title={article.gameTitle ?? article.title}
            hue={article.hue}
            kicker={articleTypes[article.type].label}
            className="aspect-16/10"
          />
          {article.score !== undefined ? (
            <ScoreBadge
              score={article.score}
              size="sm"
              className="absolute top-2 right-2"
            />
          ) : null}
        </Link>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <h3 className="font-heading text-base leading-snug font-semibold text-balance">
            <Link href={`/${article.slug}/`} className="hover:text-primary">
              {article.title}
            </Link>
          </h3>
          <p className="text-xs text-muted-foreground">
            {formatDate(article.publishedAt)}
          </p>
          <Link
            href={`/${article.slug}/`}
            className="mt-auto pt-1 text-sm font-medium text-primary hover:underline"
          >
            Read more »
          </Link>
        </div>
      </article>
    );
  }

  return (
    <Link
      href={`/${article.slug}/`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card/50 transition-colors hover:border-primary/40"
    >
      <div className="relative">
        <CoverArt
          title={article.gameTitle ?? article.title}
          hue={article.hue}
          kicker={articleTypes[article.type].label}
          className="aspect-16/10"
        />
        {article.score !== undefined ? (
          <ScoreBadge
            score={article.score}
            className="absolute top-3 right-3"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {article.platforms.slice(0, 3).map((platform) => (
            <Badge key={platform} variant="secondary" className="font-normal">
              {platforms[platform].short}
            </Badge>
          ))}
        </div>
        <h3 className="font-heading text-lg leading-snug font-semibold text-balance group-hover:text-primary">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {article.excerpt}
        </p>
        <p className="mt-auto pt-2 text-xs text-muted-foreground">
          {formatDate(article.publishedAt)} · {article.readingMinutes} min read
        </p>
      </div>
    </Link>
  );
}
