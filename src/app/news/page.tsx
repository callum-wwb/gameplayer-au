import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByType } from "@/lib/content";
import { articleTypes } from "@/lib/site";

export const metadata = {
  title: "News",
  description: articleTypes.news.description,
};

export default function NewsPage() {
  return (
    <ArchivePage
      title="News"
      description={articleTypes.news.description}
      path="/news"
      articles={getArticlesByType("news")}
    />
  );
}
