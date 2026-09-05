import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByType } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { articleTypes } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Gaming opinion Australia",
  description:
    "Best PS5 games 2026, buying guides, and GamePlayer takes written in Australia — not recycled listicles.",
  path: "/opinion/",
});

export default function OpinionPage() {
  return (
    <ArchivePage
      title="Opinion"
      description={articleTypes.opinion.description}
      path="/opinion/"
      articles={getArticlesByType("opinion")}
    />
  );
}
