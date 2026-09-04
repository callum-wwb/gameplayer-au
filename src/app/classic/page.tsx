import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByPlatform } from "@/lib/content";
import { platforms } from "@/lib/site";

export const metadata = {
  title: platforms.classic.label,
  description: platforms.classic.description,
};

export default function ClassicPage() {
  return (
    <ArchivePage
      title={platforms.classic.label}
      description={platforms.classic.description}
      path={platforms.classic.href}
      articles={getArticlesByPlatform("classic")}
    />
  );
}
