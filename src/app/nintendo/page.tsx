import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByPlatform } from "@/lib/content";
import { platforms } from "@/lib/site";

export const metadata = {
  title: "Nintendo Switch 2 games Australia",
  description:
    "Mario Kart World, Donkey Kong Bananza, Silksong, and Switch 2 coverage from GamePlayer in Australia.",
};

export default function NintendoPage() {
  return (
    <ArchivePage
      title={platforms.nintendo.label}
      description={platforms.nintendo.description}
      path={platforms.nintendo.href}
      articles={getArticlesByPlatform("nintendo")}
    />
  );
}
