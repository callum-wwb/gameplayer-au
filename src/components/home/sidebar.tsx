import Link from "next/link";
import { Rss } from "lucide-react";
import { ArticleCard } from "@/components/article/article-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Article } from "@/lib/types";

export function HomeSidebar({
  recent,
  reviews,
}: {
  recent: Article[];
  reviews: Article[];
}) {
  return (
    <aside className="space-y-8">
      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-heading text-sm font-semibold tracking-[0.16em] text-primary uppercase">
            Recent
          </h2>
          <Link href="/news" className="text-xs text-muted-foreground hover:text-primary">
            All news
          </Link>
        </div>
        <div className="space-y-2">
          {recent.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="row" />
          ))}
        </div>
      </section>
      <Separator />
      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-heading text-sm font-semibold tracking-[0.16em] text-primary uppercase">
            Reviews
          </h2>
          <Link
            href="/reviews"
            className="text-xs text-muted-foreground hover:text-primary"
          >
            All scores
          </Link>
        </div>
        <div className="space-y-2">
          {reviews.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="row" />
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-primary/25 bg-card/60 p-4">
        <p className="font-heading text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          Follow the desk
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          RSS first, social second. Subscribe to the feed the old WordPress
          widget used to pretend was a Facebook page.
        </p>
        <Button asChild className="mt-4 w-full">
          <Link href="/feed.xml">
            <Rss className="size-4" />
            Subscribe via RSS
          </Link>
        </Button>
      </section>
    </aside>
  );
}
