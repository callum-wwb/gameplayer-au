import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByPlatform } from "@/lib/content";
import { platforms } from "@/lib/site";

export const metadata = {
  title: platforms.mobile.label,
  description: platforms.mobile.description,
};

export default function MobilePage() {
  return (
    <ArchivePage
      title={platforms.mobile.label}
      description={platforms.mobile.description}
      path={platforms.mobile.href}
      articles={getArticlesByPlatform("mobile")}
    />
  );
}
