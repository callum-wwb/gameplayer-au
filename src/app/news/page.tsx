import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByType } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { articleTypes } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Gaming news Australia",
  description:
    "Australian-time gaming news — GTA 6 release date, Ghost of Yotei, Game Pass, and storefront launches from GamePlayer.",
  path: "/news/",
});

export default function NewsPage() {
  return (
    <ArchivePage
      title="News"
      description={articleTypes.news.description}
      path="/news/"
      articles={getArticlesByType("news")}
    />
  );
}
