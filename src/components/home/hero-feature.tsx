"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CoverArt } from "@/components/article/cover-art";
import { ScoreBadge } from "@/components/article/score-badge";
import { Badge } from "@/components/ui/badge";
import { articleTypes } from "@/lib/site";
import type { Article } from "@/lib/types";
import { cn } from "@/lib/utils";

export function HeroFeature({ articles }: { articles: Article[] }) {
  const [index, setIndex] = useState(0);
  const current = articles[index];

  useEffect(() => {
    if (articles.length < 2) {
      return;
    }
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % articles.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [articles.length]);

  if (!current) {
    return null;
  }

  return (
    <section
      className="grid overflow-hidden rounded-2xl border border-border/70 lg:grid-cols-[minmax(0,1.7fr)_minmax(18rem,1fr)]"
      aria-label="Featured stories"
    >
      <Link href={`/${current.slug}/`} className="relative block min-h-[280px]">
        <CoverArt
          title=""
          hue={current.hue}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
          <Badge>{articleTypes[current.type].label}</Badge>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
            {current.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">
            {current.excerpt}
          </p>
          {current.score !== undefined ? (
            <ScoreBadge
              score={current.score}
              className="absolute top-5 right-5 hidden sm:flex"
            />
          ) : null}
        </div>
      </Link>

      <div className="flex flex-col border-t border-border/70 bg-card/40 lg:border-t-0 lg:border-l">
        {articles.map((article, articleIndex) => {
          const active = articleIndex === index;
          return (
            <button
              key={article.slug}
              type="button"
              onClick={() => setIndex(articleIndex)}
              className={cn(
                "flex flex-1 items-center gap-3 border-b border-border/60 px-3 py-3 text-left last:border-b-0 transition-colors",
                active
                  ? "bg-primary/15 ring-1 ring-inset ring-primary/40"
                  : "hover:bg-muted/60",
              )}
              aria-current={active ? "true" : undefined}
            >
              <CoverArt
                title=""
                hue={article.hue}
                className="h-16 w-[4.5rem] shrink-0 rounded-md"
              />
              <span className="min-w-0">
                <span className="block font-heading text-[10px] font-semibold tracking-[0.16em] text-primary uppercase">
                  {articleTypes[article.type].label}
                </span>
                <span
                  className={cn(
                    "mt-1 block line-clamp-2 font-heading text-sm font-semibold leading-snug",
                    active ? "text-primary" : "text-foreground",
                  )}
                >
                  {article.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
