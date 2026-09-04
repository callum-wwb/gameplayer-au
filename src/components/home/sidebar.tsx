import Link from "next/link";
import { ArticleCard } from "@/components/article/article-card";
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
    </aside>
  );
}
