import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByPlatform } from "@/lib/content";
import { platforms } from "@/lib/site";

export const metadata = {
  title: platforms.pc.label,
  description: platforms.pc.description,
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
