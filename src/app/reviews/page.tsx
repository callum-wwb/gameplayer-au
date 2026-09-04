import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByType } from "@/lib/content";
import { articleTypes } from "@/lib/site";

export const metadata = {
  title: "Game reviews Australia",
  description:
    "Scored GamePlayer reviews out of 10 — Switch 2, PS5, Xbox, and PC, written in Australia.",
};

export default function ReviewsPage() {
  return (
    <ArchivePage
      title="Game reviews"
      description={articleTypes.review.description}
      path="/reviews"
      articles={getArticlesByType("review")}
    />
  );
}
