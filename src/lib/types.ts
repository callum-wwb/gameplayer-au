import type { ArticleType, AuthorSlug, PlatformSlug } from "@/lib/site";

export type ArticleFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  type: ArticleType;
  platforms: PlatformSlug[];
  games: string[];
  publishedAt: string;
  updatedAt?: string;
  author: AuthorSlug;
  hue: number;
  featured?: boolean;
  score?: number;
  verdict?: string;
  gameTitle?: string;
  videoUrl?: string;
};

export type Article = ArticleFrontmatter & {
  body: string;
  readingMinutes: number;
};
