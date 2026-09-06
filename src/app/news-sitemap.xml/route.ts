import { getNewsSitemapArticles, parseArticleDate } from "@/lib/content";
import { escapeXml } from "@/lib/feed";
import { canonicalUrl, siteConfig } from "@/lib/site";

export const revalidate = 900;

export function GET() {
  const articles = getNewsSitemapArticles();
  const urls = articles
    .map((article) => {
      const published = parseArticleDate(article.publishedAt).toISOString();
      return `  <url>
    <loc>${canonicalUrl(`/${article.slug}/`)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(siteConfig.name)}</news:name>
        <news:language>${siteConfig.newsLanguage}</news:language>
      </news:publication>
      <news:publication_date>${published}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=900, stale-while-revalidate",
    },
  });
}
