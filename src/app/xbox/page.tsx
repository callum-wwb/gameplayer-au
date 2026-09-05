import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByPlatform } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { platforms } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Xbox and Game Pass games Australia",
  description:
    "Xbox Game Pass Ultimate Australia, Series hardware, and multiplatform reviews from GamePlayer AU.",
  path: "/xbox/",
});

export default function XboxPage() {
  return (
    <ArchivePage
      title={platforms.xbox.label}
      description={platforms.xbox.description}
      path={platforms.xbox.href}
      articles={getArticlesByPlatform("xbox")}
    />
  );
}
