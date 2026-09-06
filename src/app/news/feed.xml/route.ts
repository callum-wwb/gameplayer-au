import { getArticlesByType } from "@/lib/content";
import { buildRssXml, rssResponse } from "@/lib/feed";
import { siteConfig } from "@/lib/site";

export function GET() {
  const xml = buildRssXml({
    title: `${siteConfig.name} News`,
    description:
      "Australian-time gaming news from the GamePlayer desk — storefronts, patches, and the calendar that actually matters here.",
    selfPath: "/news/feed.xml",
    articles: getArticlesByType("news"),
  });
  return rssResponse(xml);
}
