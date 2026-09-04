import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";
import { getListedHubs } from "@/lib/games";
import { absoluteUrl, articleTypes, authors, platforms } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/credits",
    "/games",
    "/search",
    ...Object.values(authors).map((author) => `/authors/${author.slug}`),
    ...Object.values(articleTypes).map((item) => item.href),
    ...Object.values(platforms).map((item) => item.href),
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path || "/"),
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...getListedHubs().map((game) => ({
      url: absoluteUrl(`/games/${game.slug}/`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...getAllArticles().map((article) => ({
      url: absoluteUrl(`/${article.slug}/`),
      lastModified: new Date(article.updatedAt ?? article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: article.type === "review" ? 0.8 : 0.6,
    })),
  ];
}
