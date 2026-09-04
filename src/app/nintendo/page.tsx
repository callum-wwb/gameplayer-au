import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByPlatform } from "@/lib/content";
import { platforms } from "@/lib/site";

export const metadata = {
  title: platforms.nintendo.label,
  description: platforms.nintendo.description,
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
