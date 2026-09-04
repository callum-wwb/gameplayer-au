import { gameHubs, getCoverForGame, getGameByTitle, getGameHub } from "@/lib/games";
import {
  type CoverMedia,
  buildCreditLine,
  editorialCover,
  LICENSE_EDITORIAL,
  LICENSE_PLATFORM,
} from "@/lib/media";
import type { ArticleFrontmatter } from "@/lib/types";

const ARTICLE_CREDIT_TITLES: Record<string, string> = {
  "playstation-plus-extra-april-drop": "PlayStation Plus Extra",
  "xbox-game-pass-adds-indie-wave": "Xbox Game Pass",
  "top-5-gaming-consoles-of-all-time": "Best consoles listicle",
  "top-4-worst-consoles-of-all-time": "Worst consoles listicle",
  "mobile-gaming-is-the-real-mainstream": "Mobile gaming opinion",
  "inside-the-melbourne-fight-night-video": "Melbourne fight night",
};

export const articleCovers: Record<string, CoverMedia> = {
  "playstation-plus-extra-april-drop": editorialCover({
    src: "/articles/playstation-plus-extra-april-drop.jpg",
    title: "PlayStation Plus",
    copyrightOwner: "Sony Interactive Entertainment Inc.",
    publisher: "Sony Interactive Entertainment Inc.",
    developer: "Sony Interactive Entertainment Inc.",
    alt: "Original editorial artwork evoking a digital game library — no PlayStation logos or DualSense copies",
    licenseNote: LICENSE_PLATFORM,
  }),
  "xbox-game-pass-adds-indie-wave": editorialCover({
    src: "/articles/xbox-game-pass-adds-indie-wave.jpg",
    title: "Xbox Game Pass",
    copyrightOwner: "Microsoft Corporation",
    publisher: "Microsoft Corporation",
    developer: "Xbox Game Studios",
    alt: "Original editorial artwork evoking a subscription indie shelf — no Xbox logos or controller copies",
    licenseNote: LICENSE_PLATFORM,
  }),
  "top-5-gaming-consoles-of-all-time": editorialCover({
    src: "/articles/top-5-gaming-consoles-of-all-time.jpg",
    title: "Xbox 360, Super Nintendo, PlayStation 2, Nintendo Switch, and PlayStation",
    copyrightOwner:
      "Nintendo, Sony Interactive Entertainment Inc., and Microsoft Corporation",
    publisher: "Nintendo / Sony Interactive Entertainment / Microsoft",
    developer: "Nintendo / Sony Interactive Entertainment / Microsoft",
    alt: "Original editorial artwork of anonymous living-room hardware silhouettes — no brand logos",
    licenseNote: LICENSE_PLATFORM,
  }),
  "top-4-worst-consoles-of-all-time": editorialCover({
    src: "/articles/top-4-worst-consoles-of-all-time.jpg",
    title: "Philips CD-i, Atari Jaguar, Virtual Boy, and add-on hardware",
    copyrightOwner:
      "Koninklijke Philips N.V., Atari Interactive, Inc., Nintendo, and Sega",
    publisher: "Philips / Atari / Nintendo / Sega",
    developer: "Philips / Atari / Nintendo / Sega",
    alt: "Original editorial artwork of failed-hardware geometry — no identifiable console photography",
    licenseNote: LICENSE_PLATFORM,
  }),
  "mobile-gaming-is-the-real-mainstream": editorialCover({
    src: "/articles/mobile-gaming-is-the-real-mainstream.jpg",
    title: "Mobile gaming",
    copyrightOwner: "GamePlayer",
    publisher: "GamePlayer",
    developer: "GamePlayer",
    alt: "Original editorial artwork of anonymous glowing handheld screens over a city grid",
    creditLine:
      "Original editorial illustration © GamePlayer. No third-party game art depicted. Game trademarks mentioned in the story belong to their respective owners.",
    licenseNote:
      "Original editorial illustration by GamePlayer. No third-party game art is depicted. Game titles mentioned in the article remain trademarks of their respective owners.",
  }),
  "inside-the-melbourne-fight-night-video": editorialCover({
    src: "/articles/inside-the-melbourne-fight-night-video.jpg",
    title: "Melbourne fight night",
    copyrightOwner: "GamePlayer",
    publisher: "GamePlayer",
    developer: "GamePlayer",
    alt: "Original editorial artwork of an anonymous arcade-night crowd — no faces or game characters",
    creditLine:
      "Original editorial illustration © GamePlayer. No fighting-game characters or publisher logos depicted. Event coverage for GamePlayer.",
    licenseNote:
      "Original editorial illustration by GamePlayer. No fighting-game characters, stage art, or publisher logos are depicted.",
  }),
};

function fallbackCover(article: Pick<ArticleFrontmatter, "title" | "hue" | "slug">): CoverMedia {
  return {
    src: "",
    alt: article.title,
    width: 1600,
    height: 900,
    copyrightOwner: "GamePlayer",
    publisher: "GamePlayer",
    developer: "GamePlayer",
    creditLine: buildCreditLine(
      "GamePlayer",
      article.title,
    ).replace(
      "and related trademarks belong to their respective owners.",
      "— original editorial colour field. Third-party trademarks mentioned nearby belong to their owners.",
    ),
    imageSource: "editorial-generated",
    licenseNote: LICENSE_EDITORIAL,
  };
}

function applyFrontmatterOverrides(
  media: CoverMedia,
  article: Pick<
    ArticleFrontmatter,
    | "copyrightOwner"
    | "publisher"
    | "developer"
    | "creditLine"
    | "imageSource"
    | "licenseNote"
    | "coverSrc"
    | "gameTitle"
    | "title"
  >,
): CoverMedia {
  const copyrightOwner = article.copyrightOwner ?? media.copyrightOwner;
  const title = article.gameTitle ?? article.title;
  return {
    ...media,
    src: article.coverSrc ?? media.src,
    copyrightOwner,
    publisher: article.publisher ?? media.publisher,
    developer: article.developer ?? media.developer,
    creditLine:
      article.creditLine ??
      (article.copyrightOwner
        ? buildCreditLine(copyrightOwner, title)
        : media.creditLine),
    imageSource: article.imageSource ?? media.imageSource,
    licenseNote: article.licenseNote ?? media.licenseNote,
  };
}

export function resolveArticleCover(
  article: Pick<
    ArticleFrontmatter,
    | "slug"
    | "title"
    | "games"
    | "gameTitle"
    | "hue"
    | "copyrightOwner"
    | "publisher"
    | "developer"
    | "creditLine"
    | "imageSource"
    | "licenseNote"
    | "coverSrc"
  >,
): CoverMedia {
  let media: CoverMedia | undefined;

  for (const slug of article.games ?? []) {
    media = getCoverForGame(slug);
    if (media) break;
  }

  if (!media && article.gameTitle) {
    media = getGameByTitle(article.gameTitle)?.image;
  }

  if (!media) {
    media = articleCovers[article.slug] ?? fallbackCover(article);
  }

  return applyFrontmatterOverrides(media, article);
}

export function resolveArticleGames(
  article: Pick<ArticleFrontmatter, "games" | "gameTitle">,
) {
  const seen = new Set<string>();
  const games = [];

  for (const slug of article.games ?? []) {
    const game = getGameHub(slug);
    if (game && !seen.has(game.slug)) {
      seen.add(game.slug);
      games.push(game);
    }
  }

  if (article.gameTitle) {
    const game = getGameByTitle(article.gameTitle);
    if (game && !seen.has(game.slug)) {
      seen.add(game.slug);
      games.push(game);
    }
  }

  return games;
}

export function allCreditRows() {
  const rows = [
    ...gameHubs.map((game) => ({
      key: game.slug,
      title: game.title,
      kind: game.kind,
      href: game.listedHub ? `/games/${game.slug}/` : undefined,
      media: game.image,
    })),
    ...Object.entries(articleCovers).map(([slug, media]) => ({
      key: slug,
      title: ARTICLE_CREDIT_TITLES[slug] ?? slug,
      kind: "editorial" as const,
      href: `/${slug}/`,
      media,
    })),
  ];
  return rows;
}
