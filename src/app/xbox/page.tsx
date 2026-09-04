import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByPlatform } from "@/lib/content";
import { platforms } from "@/lib/site";

export const metadata = {
  title: "Xbox and Game Pass games Australia",
  description:
    "Game Pass, Series hardware, and multiplatform reviews — Expedition 33, Wilds, Elden Ring — from GamePlayer AU.",
};

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
