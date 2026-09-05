import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article/article-card";
import { MdxBody } from "@/components/article/mdx-body";
import { ReviewFaq } from "@/components/article/review-faq";
import { ReviewPanel } from "@/components/article/review-panel";
import { VideoStage } from "@/components/article/video-stage";
import { JsonLd } from "@/components/json-ld";
import { GameCover } from "@/components/media/game-cover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { resolveArticleCover, resolveArticleGames } from "@/lib/article-covers";
import {
  formatDate,
  getAllArticles,
  getArticle,
  getRelatedArticles,
} from "@/lib/content";
import { imageObjectJsonLd } from "@/lib/media";
import { articleJsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { absoluteUrl, articleTypes, authors, platforms, withTrailingSlash } from "@/lib/site";

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

  const media = resolveArticleCover(article);

  const title = article.seoTitle ?? article.title;
  const description = article.seoDescription ?? article.excerpt;
  const path = withTrailingSlash(`/${article.slug}`);
  const ogImage = `/${article.slug}/opengraph-image`;

  return {
    title,
    description,
    authors: [
      {
        name: authors[article.author].name,
        url: `/authors/${article.author}/`,
      },
    ],
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      url: path,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: path,
    },
    other: {
      "copyright-owner": media.copyrightOwner,
      "image-credit": media.creditLine,
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
  const media = resolveArticleCover(article);
  const taggedGames = resolveArticleGames(article);

  return (
    <article className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={articleJsonLd(article, media)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...imageObjectJsonLd(media, absoluteUrl(`/${article.slug}/`)),
        }}
      />
      {article.faq?.length ? <JsonLd data={faqPageJsonLd(article.faq)} /> : null}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: typeMeta.label, href: withTrailingSlash(typeMeta.href) },
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
        <Link href={`/authors/${author.slug}/`} className="hover:text-primary">
          {author.name}
        </Link>
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
        {taggedGames.map((game) => (
          <Link key={game.slug} href={`/games/${game.slug}/`}>
            <Badge variant="outline">{game.shortTitle}</Badge>
          </Link>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border/70">
        {article.type === "video" ? (
          <VideoStage article={article} />
        ) : (
          <GameCover
            media={media}
            hue={article.hue}
            title={article.gameTitle ?? article.title}
            kicker={typeMeta.label}
            showTitle
            credit="both"
            className="aspect-16/8 min-h-[240px]"
            sizes="(max-width: 1024px) 100vw, 1152px"
            priority
          />
        )}
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-8">
        <ReviewPanel article={article} />
        <MdxBody source={article.body} />
        <ReviewFaq article={article} />
        <p className="text-sm text-muted-foreground">
          Written by{" "}
          <Link href={`/authors/${author.slug}/`} className="text-primary hover:underline">
            {author.name}
          </Link>
          , {author.role}. {author.bio}
        </p>
      </div>

      {taggedGames.length > 0 ? (
        <section className="mx-auto mt-10 max-w-3xl">
          <h2 className="font-heading text-xl font-semibold">Related reading</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {taggedGames.map((game) => (
              <li key={game.slug}>
                <Link href={`/games/${game.slug}/`} className="text-primary hover:underline">
                  {game.title} hub
                </Link>
                <span className="text-muted-foreground"> — reviews, guides, and FAQ.</span>
              </li>
            ))}
            {article.platforms.includes("playstation") ? (
              <li>
                <Link href="/best-ps5-games-2026/" className="text-primary hover:underline">
                  Best PS5 games 2026
                </Link>
                <span className="text-muted-foreground"> — Australian living-room list.</span>
              </li>
            ) : null}
            {article.platforms.includes("xbox") &&
            article.slug !== "xbox-game-pass-ultimate-australia" ? (
              <li>
                <Link href="/xbox-game-pass-ultimate-australia/" className="text-primary hover:underline">
                  Xbox Game Pass Ultimate Australia
                </Link>
                <span className="text-muted-foreground"> — tiers, AUD pricing, when to subscribe.</span>
              </li>
            ) : null}
          </ul>
        </section>
      ) : null}

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
