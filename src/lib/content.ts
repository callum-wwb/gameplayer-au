import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { getGameHub } from "@/lib/games";
import { authors, type ArticleType, type PlatformSlug } from "@/lib/site";
import type { Article, ArticleFrontmatter } from "@/lib/types";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

const ARTICLE_TYPES: ArticleType[] = [
  "news",
  "review",
  "preview",
  "opinion",
  "video",
];

const PLATFORMS: PlatformSlug[] = [
  "pc",
  "mobile",
  "classic",
  "playstation",
  "xbox",
  "nintendo",
];

function estimateReadingMinutes(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function assertFrontmatter(data: Record<string, unknown>, file: string) {
  const required = [
    "title",
    "slug",
    "excerpt",
    "type",
    "platforms",
    "games",
    "publishedAt",
    "author",
    "hue",
  ] as const;

  for (const key of required) {
    if (data[key] === undefined || data[key] === null || data[key] === "") {
      throw new Error(`Missing "${key}" in ${file}`);
    }
  }

  if (!ARTICLE_TYPES.includes(data.type as ArticleType)) {
    throw new Error(`Invalid type "${String(data.type)}" in ${file}`);
  }

  if (!Array.isArray(data.platforms)) {
    throw new Error(`platforms must be an array in ${file}`);
  }

  for (const platform of data.platforms) {
    if (!PLATFORMS.includes(platform as PlatformSlug)) {
      throw new Error(`Unknown platform "${String(platform)}" in ${file}`);
    }
  }

  if (!(data.author as string in authors)) {
    throw new Error(`Unknown author "${String(data.author)}" in ${file}`);
  }

  if (!Array.isArray(data.games)) {
    throw new Error(`games must be an array in ${file}`);
  }

  for (const game of data.games) {
    if (!getGameHub(String(game))) {
      throw new Error(`Unknown game "${String(game)}" in ${file}`);
    }
  }

  return data as ArticleFrontmatter;
}

function parseArticle(file: string): Article {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
  const parsed = matter(raw);
  const frontmatter = assertFrontmatter(parsed.data, file);

  return {
    ...frontmatter,
    games: frontmatter.games ?? [],
    featured: Boolean(frontmatter.featured),
    body: parsed.content.trim(),
    readingMinutes: estimateReadingMinutes(parsed.content),
  };
}

export const getAllArticles = cache((): Article[] => {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parseArticle)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
});

export function getArticle(slug: string) {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getArticlesByType(type: ArticleType) {
  return getAllArticles().filter((article) => article.type === type);
}

export function getArticlesByPlatform(platform: PlatformSlug) {
  return getAllArticles().filter((article) =>
    article.platforms.includes(platform),
  );
}

export function getArticlesByGame(gameSlug: string) {
  return getAllArticles().filter((article) => article.games.includes(gameSlug));
}

export function getArticlesByAuthor(author: string) {
  return getAllArticles().filter((article) => article.author === author);
}

export function getFeaturedArticles(limit = 4) {
  const featured = getAllArticles().filter((article) => article.featured);
  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }
  return getAllArticles().slice(0, limit);
}

const ARCHIVE_HERO_SLUGS = [
  "the-binding-of-isaac-review-explore-the-gruesome-world",
  "heroes-of-loot-review-exciting-dungeon-crawler-for-mobile",
  "top-4-worst-consoles-of-all-time",
  "top-5-gaming-consoles-of-all-time",
];

export function getHeroArticles(limit = 4) {
  const bySlug = new Map(getAllArticles().map((article) => [article.slug, article]));
  const fromArchive = ARCHIVE_HERO_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (article): article is NonNullable<typeof article> => Boolean(article),
  );
  if (fromArchive.length >= limit) {
    return fromArchive.slice(0, limit);
  }
  const extras = getFeaturedArticles(limit + fromArchive.length).filter(
    (article) => !fromArchive.some((item) => item.slug === article.slug),
  );
  return [...fromArchive, ...extras].slice(0, limit);
}

export function getRecentArticles(limit = 6, excludeSlug?: string) {
  return getAllArticles()
    .filter((article) => article.slug !== excludeSlug)
    .slice(0, limit);
}

export function getRecentReviews(limit = 5, excludeSlug?: string) {
  return getAllArticles()
    .filter(
      (article) =>
        article.type === "review" && article.slug !== excludeSlug,
    )
    .slice(0, limit);
}

export function searchArticles(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) {
    return [];
  }

  return getAllArticles().filter((article) => {
    const haystack = [
      article.title,
      article.excerpt,
      article.body,
      article.gameTitle ?? "",
      article.verdict ?? "",
      article.type,
      ...article.platforms,
      ...article.games,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getRelatedArticles(article: Article, limit = 3) {
  return getAllArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.type === article.type) score += 2;
      score += candidate.platforms.filter((p) =>
        article.platforms.includes(p),
      ).length;
      score +=
        candidate.games.filter((game) => article.games.includes(game)).length *
        3;
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Australia/Sydney",
  }).format(new Date(iso));
}
