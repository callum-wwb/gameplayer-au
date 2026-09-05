import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByType } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { articleTypes } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Gaming videos Australia",
  description: articleTypes.video.description,
  path: "/videos/",
});

export default function VideosPage() {
  return (
    <ArchivePage
      title="Videos"
      description={articleTypes.video.description}
      path="/videos/"
      articles={getArticlesByType("video")}
    />
  );
}
