import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByType } from "@/lib/content";
import { articleTypes } from "@/lib/site";

export const metadata = {
  title: "Gaming opinion Australia",
  description:
    "Best PS5 games 2026, buying guides, and GamePlayer takes written in Australia — not recycled listicles.",
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
