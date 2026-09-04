export type GameHub = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  developer: string;
  platforms: string[];
  released: string;
  hue: number;
  evergreen: boolean;
};

export const gameHubs: GameHub[] = [
  {
    slug: "dota-2",
    title: "Dota 2",
    shortTitle: "Dota 2",
    tagline: "The infinite war",
    description:
      "Valve’s free-to-play MOBA is still the deepest competitive game on PC. GamePlayer covers patches, the International, and why your support still did not buy a ward.",
    developer: "Valve",
    platforms: ["PC"],
    released: "2013",
    hue: 12,
    evergreen: true,
  },
  {
    slug: "skyrim",
    title: "The Elder Scrolls V: Skyrim",
    shortTitle: "Skyrim",
    tagline: "Another ten years of dragons",
    description:
      "The game that refuses to leave. Reviews, anniversary editions, and the modding culture that keeps Tamriel running on Australian PCs.",
    developer: "Bethesda Game Studios",
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    released: "2011",
    hue: 210,
    evergreen: true,
  },
  {
    slug: "starcraft-2",
    title: "StarCraft II",
    shortTitle: "StarCraft 2",
    tagline: "Still the RTS benchmark",
    description:
      "Wings of Liberty through Legacy of the Void, co-op commanders, and the ladder that taught a generation to click faster.",
    developer: "Blizzard Entertainment",
    platforms: ["PC"],
    released: "2010",
    hue: 38,
    evergreen: true,
  },
  {
    slug: "elden-ring",
    title: "Elden Ring",
    shortTitle: "Elden Ring",
    tagline: "Become Elden Lord",
    description:
      "FromSoftware’s open-world leap. Guides, DLC impressions, and the builds that got us through the Lands Between after midnight.",
    developer: "FromSoftware",
    platforms: ["PC", "PlayStation", "Xbox"],
    released: "2022",
    hue: 48,
    evergreen: true,
  },
  {
    slug: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    shortTitle: "Baldur's Gate 3",
    tagline: "The RPG benchmark",
    description:
      "Larian’s D&D epic reset the conversation about single-player RPGs. Campaign diaries, companion takes, and Honour Mode war stories.",
    developer: "Larian Studios",
    platforms: ["PC", "PlayStation", "Xbox", "Mac"],
    released: "2023",
    hue: 28,
    evergreen: true,
  },
];

export function getGameHub(slug: string) {
  return gameHubs.find((game) => game.slug === slug);
}
