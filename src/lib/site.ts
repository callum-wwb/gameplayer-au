export const DEFAULT_SITE_URL = "https://www.gameplayer.com.au";

export function resolveSiteUrl(
  raw: string | undefined = process.env.NEXT_PUBLIC_SITE_URL,
): string {
  const candidate = raw?.trim();
  if (!candidate) {
    return DEFAULT_SITE_URL;
  }

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return DEFAULT_SITE_URL;
    }
    return parsed.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function siteUrlObject(raw?: string): URL {
  const value = resolveSiteUrl(raw);
  try {
    return new URL(value);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

export const siteConfig = {
  name: "GamePlayer",
  tagline: "News and Gaming Reviews",
  slogan: "Don't hate the Game, hate the Player",
  title: "GamePlayer | News and Gaming Reviews",
  description:
    "GamePlayer brings a fresh perspective on the world of video gaming. From Xbox to Playstation, PC to Mac, Nintendo to Atari, all the latest reviews, opinions and news can be found on GamePlayer",
  url: resolveSiteUrl(),
  locale: "en_AU",
  language: "en-AU",
  country: "Australia",
  email: "editors@gameplayer.com.au",
  tipsEmail: "tips@gameplayer.com.au",
  logoPath: "/logo.png",
  logoSvgPath: "/logo.svg",
  newsLanguage: "en",
} as const;

export type ArticleType = "news" | "review" | "preview" | "opinion" | "video";

export type PlatformSlug =
  | "pc"
  | "mobile"
  | "classic"
  | "playstation"
  | "xbox"
  | "nintendo";

export const articleTypes: Record<
  ArticleType,
  { label: string; href: string; description: string }
> = {
  news: {
    label: "News",
    href: "/news/",
    description:
      "Australian-time headlines from every platform — patches, launches, release dates, and industry moves.",
  },
  review: {
    label: "Reviews",
    href: "/reviews/",
    description:
      "Scored GamePlayer verdicts out of 10, written in Australia. We play the game, then we tell you if it is worth your weekend.",
  },
  preview: {
    label: "Previews",
    href: "/previews/",
    description:
      "Hands-on first hours, showcase impressions, and what to watch before launch day.",
  },
  opinion: {
    label: "Opinion",
    href: "/opinion/",
    description:
      "Listicles, buying arguments, and the takes you will argue about in the group chat.",
  },
  video: {
    label: "Videos",
    href: "/videos/",
    description:
      "Show reports, features, and editor-led video from the Australian scene.",
  },
};

export const platforms: Record<
  PlatformSlug,
  { label: string; href: string; short: string; description: string }
> = {
  pc: {
    label: "PC",
    href: "/pc/",
    short: "PC",
    description:
      "Steam, Battle.net, and the evergreen PC library — from Dota 2 to the latest RPG.",
  },
  mobile: {
    label: "Mobile",
    href: "/mobile/",
    short: "Mobile",
    description:
      "iOS and Android games that actually respect your time — and a few that steal it.",
  },
  classic: {
    label: "Classic",
    href: "/classic/",
    short: "Classic",
    description:
      "Atari to Dreamcast, cabinets to cartridges. The machines that built the hobby.",
  },
  playstation: {
    label: "PlayStation",
    href: "/playstation/",
    short: "PS",
    description:
      "Best PS5 games in 2026, Ghost of Yotei, PlayStation Plus Extra and Premium, and first-party showcases with Australian pricing.",
  },
  xbox: {
    label: "Xbox",
    href: "/xbox/",
    short: "Xbox",
    description:
      "Xbox Game Pass Ultimate Australia pricing, Series hardware, and the multiplatform releases that matter here.",
  },
  nintendo: {
    label: "Nintendo Switch",
    href: "/nintendo/",
    short: "Switch",
    description:
      "Switch 2, Pokémon Legends Z-A, Metroid Prime 4: Beyond, Mario Kart World, and Silksong — handheld first, always.",
  },
};

export const primaryNav = [
  articleTypes.news,
  articleTypes.review,
  articleTypes.preview,
  articleTypes.opinion,
  articleTypes.video,
] as const;

export const platformNav = [
  platforms.pc,
  platforms.mobile,
  platforms.classic,
  platforms.playstation,
  platforms.xbox,
  platforms.nintendo,
] as const;

export const classicPlatforms = [
  platforms.pc,
  platforms.mobile,
  platforms.classic,
] as const;

export const extraPlatforms = [
  platforms.playstation,
  platforms.xbox,
  platforms.nintendo,
] as const;

export const originalHubs = [
  { label: "Dota 2", href: "/games/dota-2/" },
  { label: "Skyrim", href: "/games/skyrim/" },
  { label: "Starcraft 2", href: "/games/starcraft-2/" },
] as const;

export const commentableTypes: ArticleType[] = [
  "news",
  "review",
  "preview",
  "opinion",
];

export const authors = {
  "jess-nguyen": {
    slug: "jess-nguyen",
    name: "Jess Nguyen",
    role: "Reviews editor",
    bio: "Melbourne-based critic covering RPGs, roguelikes, and anything with a decent character creator.",
  },
  "callum-wright": {
    slug: "callum-wright",
    name: "Callum Wright",
    role: "News editor",
    bio: "Brisbane news desk. Tracks patches, storefronts, and the Australian release calendar.",
  },
  "priya-sharma": {
    slug: "priya-sharma",
    name: "Priya Sharma",
    role: "Features",
    bio: "Sydney features writer. Listicles, history pieces, and the arguments nobody asked for.",
  },
  "tom-brennan": {
    slug: "tom-brennan",
    name: "Tom Brennan",
    role: "Video & esports",
    bio: "Covers Dota, StarCraft, and the LAN scene from Perth to the east-coast majors.",
  },
  "amelia-crowe": {
    slug: "amelia-crowe",
    name: "Amelia Crowe",
    role: "Preview lead",
    bio: "Hands-on previews and first-hour reports. Will travel for a good vertical slice.",
  },
} as const;

export type AuthorSlug = keyof typeof authors;

export function withTrailingSlash(path: string) {
  if (!path || path === "/") return "/";
  const hashIndex = path.indexOf("#");
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const [pathname, query] = withoutHash.split("?");
  const slashed = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return `${slashed}${query ? `?${query}` : ""}${hash}`;
}

export function absoluteUrl(path = "/") {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  try {
    return new URL(normalised, siteUrlObject()).toString();
  } catch {
    return new URL(normalised, DEFAULT_SITE_URL).toString();
  }
}

export function canonicalUrl(path = "/") {
  return absoluteUrl(withTrailingSlash(path));
}

export const organizationId = `${siteConfig.url}/#organization`;
export const websiteId = `${siteConfig.url}/#website`;
