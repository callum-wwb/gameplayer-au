import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByType } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { articleTypes } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Game reviews Australia",
  description:
    "Scored GamePlayer reviews out of 10 — Ghost of Yotei, Pokémon Legends Z-A, Metroid Prime 4, Switch 2, PS5, Xbox, and PC, written in Australia.",
  path: "/reviews/",
});

export default function ReviewsPage() {
  return (
    <ArchivePage
      title="Game reviews"
      description={articleTypes.review.description}
      path="/reviews/"
      articles={getArticlesByType("review")}
    />
  );
}
