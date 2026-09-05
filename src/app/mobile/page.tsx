import { ArchivePage } from "@/components/archive/archive-page";
import { getArticlesByPlatform } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { platforms } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Mobile game reviews Australia",
  description: platforms.mobile.description,
  path: "/mobile/",
});

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
