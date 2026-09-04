"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CoverArt } from "@/components/article/cover-art";
import { ScoreBadge } from "@/components/article/score-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { articleTypes } from "@/lib/site";
import type { Article } from "@/lib/types";

export function HeroSlider({ articles }: { articles: Article[] }) {
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

  const go = (direction: -1 | 1) => {
    setIndex((value) => (value + direction + articles.length) % articles.length);
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/70">
      <CoverArt
        title=""
        hue={current.hue}
        className="aspect-16/9 min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/15" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge>{articleTypes[current.type].label}</Badge>
          {current.featured ? <Badge variant="outline">Featured</Badge> : null}
        </div>
        <div className="flex items-end gap-4">
          <div className="min-w-0">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
              <Link href={`/${current.slug}/`} className="hover:text-primary">
                {current.title}
              </Link>
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
              {current.excerpt}
            </p>
          </div>
          {current.score !== undefined ? (
            <ScoreBadge
              score={current.score}
              size="lg"
              className="hidden sm:flex"
            />
          ) : null}
        </div>
        <div className="mt-5 flex items-center gap-2">
          <Button asChild>
            <Link href={`/${current.slug}/`}>Read story</Link>
          </Button>
          <Button variant="outline" size="icon" onClick={() => go(-1)}>
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous featured story</span>
          </Button>
          <Button variant="outline" size="icon" onClick={() => go(1)}>
            <ChevronRight className="size-4" />
            <span className="sr-only">Next featured story</span>
          </Button>
        </div>
        <div className="mt-4 flex gap-1.5">
          {articles.map((article, articleIndex) => (
            <button
              key={article.slug}
              type="button"
              onClick={() => setIndex(articleIndex)}
              className={`h-1.5 rounded-full transition-all ${
                articleIndex === index ? "w-8 bg-primary" : "w-3 bg-white/40"
              }`}
              aria-label={`Show ${article.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
