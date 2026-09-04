import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article/article-card";
import { CoverArt } from "@/components/article/cover-art";
import { MdxBody } from "@/components/article/mdx-body";
import { ReviewPanel } from "@/components/article/review-panel";
import { VideoStage } from "@/components/article/video-stage";
import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  formatDate,
  getAllArticles,
  getArticle,
  getRelatedArticles,
} from "@/lib/content";
import { getGameHub } from "@/lib/games";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { articleTypes, authors, platforms } from "@/lib/site";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return { title: "Story" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: authors[article.author].name }],
    openGraph: {
      type: article.type === "review" ? "article" : "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      url: `/${article.slug}/`,
    },
    alternates: {
      canonical: `/${article.slug}/`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    notFound();
  }

  const author = authors[article.author];
  const related = getRelatedArticles(article);
  const typeMeta = articleTypes[article.type];

  return (
    <article className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: typeMeta.label, href: typeMeta.href },
          { name: article.title, href: `/${article.slug}/` },
        ])}
      />

      <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        <Link href={typeMeta.href}>{typeMeta.label}</Link>
      </p>
      <h1 className="mt-3 max-w-4xl font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
        {article.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        {article.excerpt}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>{author.name}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
        <span aria-hidden="true">·</span>
        <span>{article.readingMinutes} min read</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {article.platforms.map((platform) => (
          <Link key={platform} href={platforms[platform].href}>
            <Badge variant="secondary">{platforms[platform].label}</Badge>
          </Link>
        ))}
        {article.games.map((gameSlug) => {
          const game = getGameHub(gameSlug);
          if (!game) return null;
          return (
            <Link key={gameSlug} href={`/games/${gameSlug}/`}>
              <Badge variant="outline">{game.shortTitle}</Badge>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border/70">
        {article.type === "video" ? (
          <VideoStage article={article} />
        ) : (
          <CoverArt
            title={article.gameTitle ?? article.title}
            hue={article.hue}
            kicker={typeMeta.label}
            className="aspect-16/8 min-h-[240px]"
          />
        )}
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-8">
        <ReviewPanel article={article} />
        <MdxBody source={article.body} />
        <p className="text-sm text-muted-foreground">
          Written by {author.name}, {author.role}. {author.bio}
        </p>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <Separator className="mb-8" />
          <h2 className="mb-5 font-heading text-2xl font-bold">Related</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
