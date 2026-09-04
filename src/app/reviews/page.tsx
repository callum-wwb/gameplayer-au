import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByType } from "@/lib/content";
import { articleTypes } from "@/lib/site";

export const metadata = {
  title: "Reviews",
  description: articleTypes.review.description,
};

export default function ReviewsPage() {
  return (
    <ArchivePage
      title="Reviews"
      description={articleTypes.review.description}
      path="/reviews"
      articles={getArticlesByType("review")}
    />
  );
}
