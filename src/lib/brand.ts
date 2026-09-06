import { absoluteUrl, siteConfig } from "@/lib/site";

/** Stable publication logo for Organization / NewsArticle JSON-LD and Publisher Center. */
export const publicationLogo = {
  path: siteConfig.logoPath,
  svgPath: siteConfig.logoSvgPath,
  url: absoluteUrl(siteConfig.logoPath),
  width: 512,
  height: 512,
} as const;

export function publisherLogoJsonLd() {
  return {
    "@type": "ImageObject" as const,
    url: publicationLogo.url,
    width: publicationLogo.width,
    height: publicationLogo.height,
    caption: `${siteConfig.name} publication logo`,
  };
}
