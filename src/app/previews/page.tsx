import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByType } from "@/lib/content";
import { articleTypes } from "@/lib/site";

export const metadata = {
  title: "Previews",
  description: articleTypes.preview.description,
};

export default function PreviewsPage() {
  return (
    <ArchivePage
      title="Previews"
      description={articleTypes.preview.description}
      path="/previews"
      articles={getArticlesByType("preview")}
    />
  );
}
