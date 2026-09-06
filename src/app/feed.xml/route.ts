import { getFeedArticles } from "@/lib/content";
import { buildRssXml, rssResponse } from "@/lib/feed";
import { siteConfig } from "@/lib/site";

export function GET() {
  const xml = buildRssXml({
    title: siteConfig.title,
    description: siteConfig.description,
    selfPath: "/feed.xml",
    articles: getFeedArticles(),
  });
  return rssResponse(xml);
}
