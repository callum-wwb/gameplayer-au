import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByType } from "@/lib/content";
import { articleTypes } from "@/lib/site";

export const metadata = {
  title: "Videos",
  description: articleTypes.video.description,
};

export default function VideosPage() {
  return (
    <ArchivePage
      title="Videos"
      description={articleTypes.video.description}
      path="/videos"
      articles={getArticlesByType("video")}
    />
  );
}
