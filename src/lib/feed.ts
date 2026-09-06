import { parseArticleDate } from "@/lib/content";
import { absoluteUrl, authors, siteConfig } from "@/lib/site";
import type { Article } from "@/lib/types";

export function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function stripMarkdown(body: string) {
  return body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function contentEncoded(article: Article) {
  const plain = stripMarkdown(article.body);
  const excerpt = article.excerpt.trim();
  const combined = plain.startsWith(excerpt) ? plain : `${excerpt}\n\n${plain}`;
  const clipped = combined.slice(0, 4000);
  const paragraphs = clipped
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => `<p>${escapeXml(part)}</p>`)
    .join("");
  return paragraphs || `<p>${escapeXml(excerpt)}</p>`;
}

export function buildRssXml(input: {
  title: string;
  description: string;
  selfPath: string;
  articles: Article[];
}) {
  const selfUrl = absoluteUrl(input.selfPath);
  const items = input.articles
    .map((article) => {
      const url = absoluteUrl(`/${article.slug}/`);
      const author = authors[article.author];
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${parseArticleDate(article.publishedAt).toUTCString()}</pubDate>
      <author>${escapeXml(siteConfig.email)} (${escapeXml(author.name)})</author>
      <dc:creator>${escapeXml(author.name)}</dc:creator>
      <category>${escapeXml(article.type)}</category>
      <description>${escapeXml(article.excerpt)}</description>
      <content:encoded><![CDATA[${contentEncoded(article)}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(input.title)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(input.description)}</description>
    <language>en-au</language>
    <copyright>${escapeXml(`${siteConfig.name}. ${siteConfig.slogan}.`)}</copyright>
    <managingEditor>${escapeXml(siteConfig.email)} (${escapeXml(siteConfig.name)})</managingEditor>
    <webMaster>${escapeXml(siteConfig.email)} (${escapeXml(siteConfig.name)})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    <atom:link href="${selfUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

export function rssResponse(xml: string) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
