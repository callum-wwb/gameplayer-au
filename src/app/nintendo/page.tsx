import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByPlatform } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { platforms } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Nintendo Switch 2 games Australia",
  description:
    "Pokémon Legends Z-A, Metroid Prime 4: Beyond, Mario Kart World, Silksong, and Switch 2 coverage from GamePlayer in Australia.",
  path: "/nintendo/",
});

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
