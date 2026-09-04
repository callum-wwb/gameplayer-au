import { getAllArticles } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = getAllArticles()
    .map((article) => {
      const url = absoluteUrl(`/${article.slug}/`);
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(article.excerpt)}</description>
      <category>${article.type}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-au</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
