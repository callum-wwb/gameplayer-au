import Link from "next/link";
import { ArticleCard } from "@/components/article/article-card";
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
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const featured = getFeaturedArticles(4);
  const latest = getAllArticles().slice(0, 9);
  const recent = getRecentArticles(5);
  const reviews = getRecentReviews(5);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="mb-4 text-sm text-muted-foreground">
        Independent Australian coverage · {siteConfig.tagline}
      </p>
      <HeroSlider articles={featured} />

      <section className="mt-8 flex flex-wrap gap-2">
        {gameHubs.map((game) => (
          <Link key={game.slug} href={`/games/${game.slug}/`}>
            <Badge variant="outline" className="px-3 py-1 text-sm">
              {game.shortTitle}
            </Badge>
          </Link>
        ))}
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
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
        </section>
        <HomeSidebar recent={recent} reviews={reviews} />
      </div>
    </div>
  );
}
