import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByPlatform } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { platforms } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Classic games and hardware Australia",
  description: platforms.classic.description,
  path: "/classic/",
});

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
