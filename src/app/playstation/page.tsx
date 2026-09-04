import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByPlatform } from "@/lib/content";
import { platforms } from "@/lib/site";

export const metadata = {
  title: "PS5 games Australia",
  description:
    "Best PS5 games 2026, PlayStation Plus Extra and Premium, and scored GamePlayer reviews with Australian pricing.",
};

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
