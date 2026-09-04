import { authors, siteConfig, absoluteUrl } from "@/lib/site";
import type { Article } from "@/lib/types";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    areaServed: "AU",
    logo: absoluteUrl("/icon"),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/search")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleJsonLd(article: Article) {
  const author = authors[article.author];
  const url = absoluteUrl(`/${article.slug}/`);

  const base = {
    "@context": "https://schema.org",
    "@type": article.type === "review" ? "Review" : "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    mainEntityOfPage: url,
    url,
    inLanguage: siteConfig.language,
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon"),
      },
    },
    image: absoluteUrl(`/${article.slug}/opengraph-image`),
  };

  if (article.type === "review" && article.score !== undefined) {
    return {
      ...base,
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

export function breadcrumbJsonLd(
  crumbs: { name: string; href: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href),
    })),
  };
}
