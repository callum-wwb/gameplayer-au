import Link from "next/link";
import { CoverArt } from "@/components/article/cover-art";
import { ScoreBadge } from "@/components/article/score-badge";
import { articleTypes } from "@/lib/site";
import type { Article } from "@/lib/types";

export function FeaturedStack({ articles }: { articles: Article[] }) {
  return (
    <div className="flex h-full flex-col gap-3">
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/${article.slug}/`}
          className="group relative min-h-[8.5rem] flex-1 overflow-hidden rounded-2xl border border-border/70"
        >
          <CoverArt
            title=""
            hue={article.hue}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
          <div className="relative flex h-full items-end justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="font-heading text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
                {articleTypes[article.type].label}
              </p>
              <h2 className="mt-1 line-clamp-3 font-heading text-base font-semibold text-white group-hover:text-primary">
                {article.title}
              </h2>
            </div>
            {article.score !== undefined ? (
              <ScoreBadge score={article.score} size="sm" />
            ) : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
