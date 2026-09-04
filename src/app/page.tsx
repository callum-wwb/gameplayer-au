import Link from "next/link";
import { ArticleCard } from "@/components/article/article-card";
import { FeaturedStack } from "@/components/home/featured-stack";
import { HomeSidebar } from "@/components/home/sidebar";
import { HeroSlider } from "@/components/home/hero-slider";
import { Badge } from "@/components/ui/badge";
import {
  getAllArticles,
  getFeaturedArticles,
  getRecentArticles,
  getRecentReviews,
} from "@/lib/content";
import { gameHubs } from "@/lib/games";
import { platformNav, primaryNav, siteConfig } from "@/lib/site";

export default function HomePage() {
  const featured = getFeaturedArticles(5);
  const hero = featured.slice(0, 4);
  const stack = featured.slice(1, 4);
  const latest = getAllArticles()
    .filter((article) => !hero.some((item) => item.slug === article.slug))
    .slice(0, 9);
  const recent = getRecentArticles(6);
  const reviews = getRecentReviews(6);
  const archive = getAllArticles()
    .filter((article) => new Date(article.publishedAt).getFullYear() <= 2021)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="mb-3 text-sm text-muted-foreground">
        Independent Australian coverage · {siteConfig.tagline}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {primaryNav.map((item) => (
          <Link key={item.href} href={item.href}>
            <Badge variant="secondary">{item.label}</Badge>
          </Link>
        ))}
        <span className="mx-1 hidden h-5 w-px bg-border sm:inline-block" />
        {platformNav.map((item) => (
          <Link key={item.href} href={item.href}>
            <Badge variant="outline">{item.label}</Badge>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(16rem,1fr)]">
        <HeroSlider articles={hero} />
        <FeaturedStack articles={stack} />
      </div>

      <section className="mt-8 flex flex-wrap items-center gap-2">
        <span className="font-heading text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          Game hubs
        </span>
        {gameHubs.map((game) => (
          <Link key={game.slug} href={`/games/${game.slug}/`}>
            <Badge variant="outline" className="px-3 py-1 text-sm">
              {game.shortTitle}
            </Badge>
          </Link>
        ))}
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <section>
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-heading text-2xl font-bold">Latest stories</h2>
              <p className="text-sm text-muted-foreground">
                Reviews, news, previews, opinion, and video from the desk.
              </p>
            </div>
            <Link href="/news" className="text-sm text-primary hover:underline">
              Browse news
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          {archive.length > 0 ? (
            <div className="mt-12">
              <h2 className="font-heading text-2xl font-bold">From the archive</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Classic GamePlayer slugs and listicles, rewritten for the new site.
              </p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {archive.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          ) : null}
        </section>
        <HomeSidebar recent={recent} reviews={reviews} />
      </div>
    </div>
  );
}
