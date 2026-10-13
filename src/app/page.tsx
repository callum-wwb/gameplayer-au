import Link from "next/link";
import { ArticleCard } from "@/components/article/article-card";
import { HeroFeature } from "@/components/home/hero-feature";
import { Button } from "@/components/ui/button";
import { toArticleCard } from "@/lib/article-card";
import {
  getAllArticles,
  getHeroArticles,
  getRecentArticles,
  getRecentReviews,
} from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "News and Gaming Reviews Australia",
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const hero = getHeroArticles(3).map(toArticleCard);
  const heroSlugs = new Set(hero.map((article) => article.slug));
  const latest = getAllArticles()
    .filter((article) => !heroSlugs.has(article.slug))
    .slice(0, 4)
    .map(toArticleCard);
  const recent = getRecentArticles(3)
    .filter((article) => !heroSlugs.has(article.slug))
    .slice(0, 3)
    .map(toArticleCard);
  const reviews = getRecentReviews(3).map(toArticleCard);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <HeroFeature articles={hero} />

      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between gap-3 border-b border-border/70 pb-3">
          <h2 className="font-heading text-2xl font-bold">
            Latest GamePlayer Articles
          </h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/news/">See all articles »</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="teaser" />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-3">
        <div>
          <h2 className="mb-4 border-b border-border/70 pb-2 font-heading text-sm font-semibold tracking-[0.16em] text-primary uppercase">
            Recent Posts
          </h2>
          <div className="space-y-2">
            {recent.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="row" />
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 border-b border-border/70 pb-2 font-heading text-sm font-semibold tracking-[0.16em] text-primary uppercase">
            Reviews
          </h2>
          <div className="space-y-2">
            {reviews.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="row" />
            ))}
          </div>
          <p className="mt-3">
            <Link href="/reviews/" className="text-sm font-medium text-primary hover:underline">
              All reviews »
            </Link>
          </p>
        </div>
        <div className="rounded-2xl border border-primary/25 bg-card/50 p-5">
          <h2 className="font-heading text-sm font-semibold tracking-[0.16em] text-primary uppercase">
            Follow GamePlayer
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The 2020 site put a Facebook like-box here. We replaced it with the
            thing that still works: the RSS feed, plus a path to the masthead.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Button asChild>
              <Link href="/feed.xml">Subscribe via RSS</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/about/">About the desk</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/classic/">From the archive</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
