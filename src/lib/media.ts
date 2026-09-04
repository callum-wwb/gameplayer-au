export const LICENSE_STEAM =
  "Official Steam store promotional artwork used for editorial review and news coverage. GamePlayer does not own this artwork and does not claim the associated trademarks.";

export const LICENSE_EDITORIAL =
  "Original abstract editorial illustration created for GamePlayer. No character likenesses and no official box art were copied. The title and trademarks remain with the rights holders named in the credit line.";

export const LICENSE_PLATFORM =
  "Original abstract editorial illustration created for GamePlayer. No official hardware photography and no platform logos were copied. Console, service, and hardware trademarks belong to their respective owners.";

export function buildCreditLine(copyrightOwner: string, title: string): string {
  const owner = copyrightOwner.replace(/\.$/, "");
  return `© ${owner}. ${title} and related trademarks belong to their respective owners. Used for editorial coverage on GamePlayer.`;
}

export function steamAssetUrl(
  appId: number,
  file: "capsule_616x353.jpg" | "header.jpg" = "capsule_616x353.jpg",
): string {
  return `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/${file}`;
}

export type ImageCreditMeta = {
  copyrightOwner: string;
  publisher: string;
  developer: string;
  creditLine: string;
  imageSource: string;
  licenseNote: string;
};

export type CoverMedia = ImageCreditMeta & {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function steamCover(input: {
  slug: string;
  title: string;
  copyrightOwner: string;
  publisher: string;
  developer: string;
  steamAppId: number;
  steamFile?: "capsule_616x353.jpg" | "header.jpg";
  width?: number;
  height?: number;
}): CoverMedia {
  const file = input.steamFile ?? "capsule_616x353.jpg";
  return {
    src: `/games/${input.slug}.jpg`,
    alt: `Official promotional artwork for ${input.title}`,
    width: input.width ?? (file === "header.jpg" ? 460 : 616),
    height: input.height ?? (file === "header.jpg" ? 215 : 353),
    copyrightOwner: input.copyrightOwner,
    publisher: input.publisher,
    developer: input.developer,
    creditLine: buildCreditLine(input.copyrightOwner, input.title),
    imageSource: steamAssetUrl(input.steamAppId, file),
    licenseNote: LICENSE_STEAM,
  };
}

export function editorialCover(input: {
  src: string;
  title: string;
  copyrightOwner: string;
  publisher: string;
  developer: string;
  alt?: string;
  width?: number;
  height?: number;
  licenseNote?: string;
  creditLine?: string;
}): CoverMedia {
  return {
    src: input.src,
    alt: input.alt ?? `Original editorial artwork for ${input.title}`,
    width: input.width ?? 1536,
    height: input.height ?? 1024,
    copyrightOwner: input.copyrightOwner,
    publisher: input.publisher,
    developer: input.developer,
    creditLine: input.creditLine ?? buildCreditLine(input.copyrightOwner, input.title),
    imageSource: "editorial-generated",
    licenseNote: input.licenseNote ?? LICENSE_EDITORIAL,
  };
}

export function imageObjectJsonLd(media: CoverMedia, pageUrl?: string) {
  return {
    "@type": "ImageObject" as const,
    contentUrl: media.src.startsWith("http") ? media.src : undefined,
    url: pageUrl,
    caption: media.alt,
    creditText: media.creditLine,
    copyrightNotice: media.creditLine,
    copyrightHolder: {
      "@type": "Organization" as const,
      name: media.copyrightOwner,
    },
    creator: {
      "@type": "Organization" as const,
      name: media.developer,
    },
    acquireLicensePage: "/credits/",
    license: media.licenseNote,
  };
}
