import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByPlatform } from "@/lib/content";
import { platforms } from "@/lib/site";

export const metadata = {
  title: platforms.playstation.label,
  description: platforms.playstation.description,
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
