import type { Metadata } from "next";
import { publisherLogoJsonLd } from "@/lib/brand";
import type { CoverMedia } from "@/lib/media";
import {
  articleTypes,
  authors,
  siteConfig,
  absoluteUrl,
  canonicalUrl,
  organizationId,
  websiteId,
  withTrailingSlash,
} from "@/lib/site";
import type { Article } from "@/lib/types";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    alternateName: siteConfig.title,
    url: canonicalUrl("/"),
    description: siteConfig.description,
    email: siteConfig.email,
    areaServed: "AU",
    inLanguage: siteConfig.language,
    logo: publisherLogoJsonLd(),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: canonicalUrl("/"),
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: {
      "@id": organizationId,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleJsonLd(article: Article, media?: CoverMedia) {
  const author = authors[article.author];
  const url = canonicalUrl(`/${article.slug}`);
  const authorUrl = canonicalUrl(`/authors/${author.slug}`);

  const schemaType =
    article.type === "review"
      ? "Review"
      : article.type === "news"
        ? "NewsArticle"
        : "Article";

  const base = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": url,
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    inLanguage: siteConfig.language,
    articleSection: articleTypes[article.type].label,
    isPartOf: { "@id": websiteId },
    author: {
      "@type": "Person",
      "@id": `${authorUrl}#person`,
      name: author.name,
      jobTitle: author.role,
      url: authorUrl,
    },
    publisher: {
      "@id": organizationId,
      "@type": "Organization",
      name: siteConfig.name,
      logo: publisherLogoJsonLd(),
    },
    image: media
      ? {
          "@type": "ImageObject",
          url: absoluteUrl(media.src || `/${article.slug}/opengraph-image`),
          caption: media.alt,
          creditText: media.creditLine,
          copyrightNotice: media.creditLine,
          copyrightHolder: {
            "@type": "Organization",
            name: media.copyrightOwner,
          },
        }
      : absoluteUrl(`/${article.slug}/opengraph-image`),
  };

  if (article.type === "review" && article.score !== undefined) {
    return {
      ...base,
      "@type": "Review",
      itemReviewed: {
        "@type": "VideoGame",
        name: article.gameTitle ?? article.title,
        gamePlatform: article.platforms.map((platform) =>
          platform === "nintendo" ? "Nintendo Switch" : platform,
        ),
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: article.score,
        bestRating: 10,
        worstRating: 0,
      },
      reviewBody: article.excerpt,
    };
  }

  return base;
}

export function faqPageJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: siteConfig.language,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
        inLanguage: siteConfig.language,
      },
    })),
  };
}

export function personJsonLd(authorSlug: keyof typeof authors) {
  const author = authors[authorSlug];
  const url = canonicalUrl(`/authors/${author.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#person`,
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url,
    inLanguage: siteConfig.language,
    worksFor: {
      "@id": organizationId,
    },
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: siteConfig.language,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: canonicalUrl(crumb.href),
    })),
  };
}

export function collectionPageJsonLd(input: {
  name: string;
  description: string;
  path: string;
  articles: { slug: string; title: string }[];
}) {
  const url = canonicalUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: input.name,
    description: input.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: input.articles.length,
      itemListElement: input.articles.slice(0, 30).map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: canonicalUrl(`/${article.slug}`),
        name: article.title,
      })),
    },
  };
}

export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  robots?: Metadata["robots"];
}): Metadata {
  const path = withTrailingSlash(input.path);
  const image = input.image ?? "/opengraph-image";
  const imageAlt = input.imageAlt ?? input.title;

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: path },
    openGraph: {
      type: input.type ?? "website",
      title: input.title,
      description: input.description,
      url: path,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
    robots: input.robots,
  };
}

export function articleCommentsJsonLd(input: {
  articleUrl: string;
  comments: { authorName: string; body: string; createdAt: string }[];
}) {
  const visible = input.comments.filter((comment) => comment.body.trim());
  if (visible.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Reader letters",
    inLanguage: siteConfig.language,
    numberOfItems: visible.length,
    itemListElement: visible.map((comment, index) => ({
      "@type": "Comment",
      position: index + 1,
      text: comment.body,
      dateCreated: comment.createdAt,
      author: {
        "@type": "Person",
        name: comment.authorName,
      },
      about: {
        "@id": input.articleUrl,
      },
    })),
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/CommentAction",
      userInteractionCount: visible.length,
    },
  };
}
