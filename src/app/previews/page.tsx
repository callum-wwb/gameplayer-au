import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByType } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { articleTypes } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Game previews Australia",
  description: articleTypes.preview.description,
  path: "/previews/",
});

export default function PreviewsPage() {
  return (
    <ArchivePage
      title="Previews"
      description={articleTypes.preview.description}
      path="/previews/"
      articles={getArticlesByType("preview")}
    />
  );
}
