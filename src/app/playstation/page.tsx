import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByPlatform } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { platforms } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "PS5 games Australia",
  description:
    "Best PS5 games 2026, Ghost of Yotei, PlayStation Plus Extra and Premium, and scored GamePlayer reviews with Australian pricing.",
  path: "/playstation/",
});

export default function PlaystationPage() {
  return (
    <ArchivePage
      title={platforms.playstation.label}
      description={platforms.playstation.description}
      path={platforms.playstation.href}
      articles={getArticlesByPlatform("playstation")}
    />
  );
}
