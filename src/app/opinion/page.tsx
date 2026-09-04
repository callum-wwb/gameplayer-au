import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByType } from "@/lib/content";
import { articleTypes } from "@/lib/site";

export const metadata = {
  title: "Opinion",
  description: articleTypes.opinion.description,
};

export default function OpinionPage() {
  return (
    <ArchivePage
      title="Opinion"
      description={articleTypes.opinion.description}
      path="/opinion"
      articles={getArticlesByType("opinion")}
    />
  );
}
