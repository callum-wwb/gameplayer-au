import { resolveArticleCover } from "@/lib/article-covers";
import type { CoverMedia } from "@/lib/media";
import type { ArticleType, PlatformSlug } from "@/lib/site";
import type { Article } from "@/lib/types";

/** Cover fields a card or hero actually renders — not the full credit ledger. */
export type CardCover = Pick<
  CoverMedia,
  "src" | "alt" | "width" | "height" | "copyrightOwner" | "creditLine" | "licenseNote"
>;

/**
 * Minimal article shape for grids, rows, and the homepage hero.
 * Omits MDX body and unused frontmatter so client `__next_f` stays small.
 */
export type ArticleCardModel = {
  slug: string;
  title: string;
  excerpt: string;
  type: ArticleType;
  publishedAt: string;
  hue: number;
  score?: number;
  platforms: PlatformSlug[];
  readingMinutes: number;
  media: CardCover;
};

export function toCardCover(media: CoverMedia): CardCover {
  return {
    src: media.src,
    alt: media.alt,
    width: media.width,
    height: media.height,
    copyrightOwner: media.copyrightOwner,
    creditLine: media.creditLine,
    licenseNote: media.licenseNote,
  };
}

export function toArticleCard(article: Article): ArticleCardModel {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    type: article.type,
    publishedAt: article.publishedAt,
    hue: article.hue,
    score: article.score,
    platforms: article.platforms,
    readingMinutes: article.readingMinutes,
    media: toCardCover(resolveArticleCover(article)),
  };
}
