import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByPlatform } from "@/lib/content";
import { platforms } from "@/lib/site";

export const metadata = {
  title: platforms.xbox.label,
  description: platforms.xbox.description,
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
