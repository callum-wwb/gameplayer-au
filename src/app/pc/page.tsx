import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByPlatform } from "@/lib/content";
import { platforms } from "@/lib/site";

export const metadata = {
  title: "PC game reviews Australia",
  description:
    "Silksong, Expedition 33, Monster Hunter Wilds, Elden Ring, and the rest of GamePlayer's PC coverage from Australia.",
};

export default function PcPage() {
  return (
    <ArchivePage
      title={platforms.pc.label}
      description={platforms.pc.description}
      path={platforms.pc.href}
      articles={getArticlesByPlatform("pc")}
    />
  );
}
