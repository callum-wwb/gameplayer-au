import {
  type CoverMedia,
  editorialCover,
  LICENSE_PLATFORM,
  steamCover,
} from "@/lib/media";

export type GameKind = "game" | "hardware";

export type GameHub = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  developer: string;
  publisher: string;
  copyrightOwner: string;
  platforms: string[];
  released: string;
  hue: number;
  evergreen: boolean;
  listedHub: boolean;
  kind: GameKind;
  steamAppId?: number;
  aliases: string[];
  image: CoverMedia;
  seoTitle?: string;
  seoDescription?: string;
  faq?: { question: string; answer: string }[];
};

export const STEAM_APP_IDS = {
  "dota-2": 570,
  skyrim: 489830,
  "elden-ring": 1245620,
  "baldurs-gate-3": 1086940,
  "binding-of-isaac": 250900,
  "heroes-of-loot": 363330,
  "human-fall-flat": 477160,
  "overcooked-2": 728880,
  "dragon-ball-z-kakarot": 851850,
  balatro: 2379780,
  "hollow-knight": 367520,
  "hollow-knight-silksong": 1030300,
  "sea-of-stars": 1244090,
  "split-fiction": 2001120,
  "clair-obscur-expedition-33": 1903340,
  "monster-hunter-wilds": 2246340,
  "death-stranding-2": 3280350,
  "black-ops-7": 3606480,
  "nba-2k26": 3472040,
  "afl-26": 3468640,
  "battlefield-6": 2807960,
  "ea-sports-fc-26": 3405690,
  "borderlands-4": 1285190,
  "silent-hill-f": 2947440,
} as const;

export const gameHubs: GameHub[] = [
  {
    slug: "dota-2",
    title: "Dota 2",
    shortTitle: "Dota 2",
    tagline: "The infinite war",
    description:
      "Valve’s free-to-play MOBA is still the deepest competitive game on PC. GamePlayer covers patches, the International, and why your support still did not buy a ward.",
    developer: "Valve Corporation",
    publisher: "Valve Corporation",
    copyrightOwner: "Valve Corporation",
    platforms: ["PC"],
    released: "2013",
    hue: 12,
    evergreen: true,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["dota-2"],
    aliases: ["Dota 2", "DOTA 2"],
    image: steamCover({
      slug: "dota-2",
      title: "Dota 2",
      copyrightOwner: "Valve Corporation",
      publisher: "Valve Corporation",
      developer: "Valve Corporation",
      steamAppId: STEAM_APP_IDS["dota-2"],
    }),
  },
  {
    slug: "skyrim",
    title: "The Elder Scrolls V: Skyrim",
    shortTitle: "Skyrim",
    tagline: "Another ten years of dragons",
    description:
      "The game that refuses to leave. Reviews, anniversary editions, and the modding culture that keeps Tamriel running on Australian PCs.",
    developer: "Bethesda Game Studios",
    publisher: "Bethesda Softworks LLC",
    copyrightOwner: "Bethesda Softworks LLC / ZeniMax Media Inc.",
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    released: "2011",
    hue: 210,
    evergreen: true,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS.skyrim,
    aliases: [
      "Skyrim",
      "The Elder Scrolls V: Skyrim",
      "The Elder Scrolls V Skyrim",
    ],
    image: steamCover({
      slug: "skyrim",
      title: "The Elder Scrolls V: Skyrim",
      copyrightOwner: "Bethesda Softworks LLC / ZeniMax Media Inc.",
      publisher: "Bethesda Softworks LLC",
      developer: "Bethesda Game Studios",
      steamAppId: STEAM_APP_IDS.skyrim,
    }),
  },
  {
    slug: "starcraft-2",
    title: "StarCraft II",
    shortTitle: "StarCraft 2",
    tagline: "Still the RTS benchmark",
    description:
      "Wings of Liberty through Legacy of the Void, co-op commanders, and the ladder that taught a generation to click faster.",
    developer: "Blizzard Entertainment, Inc.",
    publisher: "Blizzard Entertainment, Inc.",
    copyrightOwner: "Blizzard Entertainment, Inc.",
    platforms: ["PC"],
    released: "2010",
    hue: 38,
    evergreen: true,
    listedHub: true,
    kind: "game",
    aliases: [
      "StarCraft II",
      "StarCraft 2",
      "StarCraft II: Legacy of the Void",
      "Starcraft 2",
    ],
    image: editorialCover({
      src: "/games/starcraft-2.jpg",
      title: "StarCraft II",
      copyrightOwner: "Blizzard Entertainment, Inc.",
      publisher: "Blizzard Entertainment, Inc.",
      developer: "Blizzard Entertainment, Inc.",
      alt: "Original editorial artwork evoking StarCraft II — abstract amber command grid, no units or logos",
    }),
  },
  {
    slug: "elden-ring",
    title: "Elden Ring",
    shortTitle: "Elden Ring",
    tagline: "Become Elden Lord",
    description:
      "FromSoftware’s open-world leap. Guides, DLC impressions, and the builds that got us through the Lands Between after midnight.",
    developer: "FromSoftware, Inc.",
    publisher: "Bandai Namco Entertainment Inc.",
    copyrightOwner: "FromSoftware, Inc. / Bandai Namco Entertainment Inc.",
    platforms: ["PC", "PlayStation", "Xbox"],
    released: "2022",
    hue: 48,
    evergreen: true,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["elden-ring"],
    aliases: ["Elden Ring", "Elden Ring: Shadow of the Erdtree"],
    seoTitle: "Elden Ring reviews and guides Australia",
    seoDescription:
      "GamePlayer's Elden Ring hub — our 9.6 review, Shadow of the Erdtree notes, and whether the Lands Between is still worth buying in Australia in 2026.",
    faq: [
      {
        question: "What is GamePlayer's Elden Ring review score?",
        answer:
          "9.6 / 10. The open world that respected your intelligence — still the decade's defining adventure.",
      },
      {
        question: "Is Elden Ring worth buying in Australia in 2026?",
        answer:
          "Yes. Base game plus Shadow of the Erdtree still beats most 2026 launches on PS5, Xbox, or PC. Watch Steam AU and PSN AU sales before paying deluxe panic prices.",
      },
      {
        question: "What platforms is Elden Ring on?",
        answer:
          "PC, PlayStation, and Xbox. PlayStation 5 is a great living-room way to play it in Australia; PC is the modding machine.",
      },
    ],
    image: steamCover({
      slug: "elden-ring",
      title: "Elden Ring",
      copyrightOwner: "FromSoftware, Inc. / Bandai Namco Entertainment Inc.",
      publisher: "Bandai Namco Entertainment Inc.",
      developer: "FromSoftware, Inc.",
      steamAppId: STEAM_APP_IDS["elden-ring"],
    }),
  },
  {
    slug: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    shortTitle: "Baldur's Gate 3",
    tagline: "The RPG benchmark",
    description:
      "Larian’s D&D epic reset the conversation about single-player RPGs. Campaign diaries, companion takes, and Honour Mode war stories.",
    developer: "Larian Studios",
    publisher: "Larian Studios",
    copyrightOwner: "Larian Studios and Wizards of the Coast LLC",
    platforms: ["PC", "PlayStation", "Xbox", "Mac"],
    released: "2023",
    hue: 28,
    evergreen: true,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["baldurs-gate-3"],
    aliases: ["Baldur's Gate 3", "Baldurs Gate 3", "BG3"],
    seoTitle: "Baldur's Gate 3 reviews and guides Australia",
    seoDescription:
      "GamePlayer's Baldur's Gate 3 hub — our 9.8 review, Honour Mode notes, PS5 split-screen, and why it is still the RPG benchmark in Australia.",
    faq: [
      {
        question: "What is GamePlayer's Baldur's Gate 3 review score?",
        answer:
          "9.8 / 10. The RPG benchmark until someone spends this much on conversation trees again.",
      },
      {
        question: "Is Baldur's Gate 3 worth buying in 2026?",
        answer:
          "Yes. A new campaign still beats most 2026 launches for density. Sales on Steam AU and PSN AU are frequent enough that you should not pay deluxe panic prices.",
      },
      {
        question: "Does Baldur's Gate 3 have split-screen on PS5?",
        answer:
          "Yes, and it is generous. It also fights the UI when both players open a menu. Same-couch is a feature, not the intended first run.",
      },
    ],
    image: steamCover({
      slug: "baldurs-gate-3",
      title: "Baldur's Gate 3",
      copyrightOwner: "Larian Studios and Wizards of the Coast LLC",
      publisher: "Larian Studios",
      developer: "Larian Studios",
      steamAppId: STEAM_APP_IDS["baldurs-gate-3"],
    }),
  },
  {
    slug: "binding-of-isaac",
    title: "The Binding of Isaac: Rebirth",
    shortTitle: "Binding of Isaac",
    tagline: "Down into the tears again",
    description:
      "Edmund McMillen’s basement roguelike, rebuilt by Nicalis and still one of the meanest replay loops on PC.",
    developer: "Nicalis, Inc.",
    publisher: "Nicalis, Inc.",
    copyrightOwner: "Edmund McMillen and Nicalis, Inc.",
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    released: "2014",
    hue: 18,
    evergreen: false,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["binding-of-isaac"],
    aliases: [
      "The Binding of Isaac",
      "The Binding of Isaac: Rebirth",
      "Binding of Isaac",
    ],
    image: steamCover({
      slug: "binding-of-isaac",
      title: "The Binding of Isaac: Rebirth",
      copyrightOwner: "Edmund McMillen and Nicalis, Inc.",
      publisher: "Nicalis, Inc.",
      developer: "Nicalis, Inc.",
      steamAppId: STEAM_APP_IDS["binding-of-isaac"],
    }),
  },
  {
    slug: "heroes-of-loot",
    title: "Heroes of Loot",
    shortTitle: "Heroes of Loot",
    tagline: "A ten-minute dungeon",
    description:
      "OrangePixel’s bite-sized Gauntlet riff — the kind of mobile crawler that respects a commute.",
    developer: "OrangePixel",
    publisher: "OrangePixel",
    copyrightOwner: "OrangePixel",
    platforms: ["Mobile", "PC"],
    released: "2015",
    hue: 42,
    evergreen: false,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["heroes-of-loot"],
    aliases: ["Heroes of Loot"],
    image: steamCover({
      slug: "heroes-of-loot",
      title: "Heroes of Loot",
      copyrightOwner: "OrangePixel",
      publisher: "OrangePixel",
      developer: "OrangePixel",
      steamAppId: STEAM_APP_IDS["heroes-of-loot"],
    }),
  },
  {
    slug: "human-fall-flat",
    title: "Human: Fall Flat",
    shortTitle: "Human: Fall Flat",
    tagline: "Ragdolls, then friendship tests",
    description:
      "No Brakes Games’ physics sandbox that accidentally became a party platform.",
    developer: "No Brakes Games",
    publisher: "Curve Games",
    copyrightOwner: "No Brakes Games / Curve Games",
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    released: "2016",
    hue: 200,
    evergreen: false,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["human-fall-flat"],
    aliases: ["Human: Fall Flat", "Human Fall Flat"],
    image: steamCover({
      slug: "human-fall-flat",
      title: "Human: Fall Flat",
      copyrightOwner: "No Brakes Games / Curve Games",
      publisher: "Curve Games",
      developer: "No Brakes Games",
      steamAppId: STEAM_APP_IDS["human-fall-flat"],
    }),
  },
  {
    slug: "overcooked-2",
    title: "Overcooked! 2",
    shortTitle: "Overcooked 2",
    tagline: "Friendship, plated under fire",
    description:
      "Ghost Town Games and Team17’s kitchen co-op sequel — louder, faster, still an honesty test.",
    developer: "Ghost Town Games / Team17",
    publisher: "Team17 Digital Ltd.",
    copyrightOwner: "Team17 Digital Ltd. / Ghost Town Games",
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    released: "2018",
    hue: 28,
    evergreen: false,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["overcooked-2"],
    aliases: ["Overcooked! 2", "Overcooked 2", "Overcooked"],
    image: steamCover({
      slug: "overcooked-2",
      title: "Overcooked! 2",
      copyrightOwner: "Team17 Digital Ltd. / Ghost Town Games",
      publisher: "Team17 Digital Ltd.",
      developer: "Ghost Town Games / Team17",
      steamAppId: STEAM_APP_IDS["overcooked-2"],
    }),
  },
  {
    slug: "dragon-ball-z-kakarot",
    title: "Dragon Ball Z: Kakarot",
    shortTitle: "DBZ: Kakarot",
    tagline: "The Saiyan saga, replayed",
    description:
      "CyberConnect2’s interactive recap of the Z arc, published by Bandai Namco — fans first, fishing second.",
    developer: "CyberConnect2 Co., Ltd.",
    publisher: "BANDAI NAMCO Entertainment Inc.",
    copyrightOwner:
      "Bird Studio / Shueisha / Toei Animation and BANDAI NAMCO Entertainment Inc.",
    platforms: ["PC", "PlayStation", "Xbox"],
    released: "2020",
    hue: 52,
    evergreen: false,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["dragon-ball-z-kakarot"],
    aliases: [
      "Dragon Ball Z: Kakarot",
      "Dragon Ball Z Kakarot",
      "DBZ Kakarot",
    ],
    image: steamCover({
      slug: "dragon-ball-z-kakarot",
      title: "Dragon Ball Z: Kakarot",
      copyrightOwner:
        "Bird Studio / Shueisha / Toei Animation and BANDAI NAMCO Entertainment Inc.",
      publisher: "BANDAI NAMCO Entertainment Inc.",
      developer: "CyberConnect2 Co., Ltd.",
      steamAppId: STEAM_APP_IDS["dragon-ball-z-kakarot"],
    }),
  },
  {
    slug: "balatro",
    title: "Balatro",
    shortTitle: "Balatro",
    tagline: "One more ante",
    description:
      "LocalThunk’s poker roguelike, published by Playstack — Texas Hold’em after it discovered jokers.",
    developer: "LocalThunk",
    publisher: "Playstack Ltd.",
    copyrightOwner: "LocalThunk / Playstack Ltd.",
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    released: "2024",
    hue: 145,
    evergreen: false,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS.balatro,
    aliases: ["Balatro"],
    image: steamCover({
      slug: "balatro",
      title: "Balatro",
      copyrightOwner: "LocalThunk / Playstack Ltd.",
      publisher: "Playstack Ltd.",
      developer: "LocalThunk",
      steamAppId: STEAM_APP_IDS.balatro,
    }),
  },
  {
    slug: "hollow-knight",
    title: "Hollow Knight",
    shortTitle: "Hollow Knight",
    tagline: "Hallownest still calls",
    description:
      "Team Cherry’s Adelaide-made Metroidvania — the map that taught a generation to sit with a difficult room.",
    developer: "Team Cherry Pty Ltd",
    publisher: "Team Cherry Pty Ltd",
    copyrightOwner: "Team Cherry Pty Ltd",
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    released: "2017",
    hue: 250,
    evergreen: false,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["hollow-knight"],
    aliases: ["Hollow Knight"],
    image: steamCover({
      slug: "hollow-knight",
      title: "Hollow Knight",
      copyrightOwner: "Team Cherry Pty Ltd",
      publisher: "Team Cherry Pty Ltd",
      developer: "Team Cherry Pty Ltd",
      steamAppId: STEAM_APP_IDS["hollow-knight"],
    }),
  },
  {
    slug: "hollow-knight-silksong",
    title: "Hollow Knight: Silksong",
    shortTitle: "Silksong",
    tagline: "Hornet’s climb",
    description:
      "Team Cherry’s sequel in Pharloom. Faster, meaner, and already rewriting what Hallownest taught us.",
    developer: "Team Cherry Pty Ltd",
    publisher: "Team Cherry Pty Ltd",
    copyrightOwner: "Team Cherry Pty Ltd",
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    released: "2025",
    hue: 320,
    evergreen: true,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["hollow-knight-silksong"],
    aliases: ["Hollow Knight: Silksong", "Silksong"],
    image: steamCover({
      slug: "hollow-knight-silksong",
      title: "Hollow Knight: Silksong",
      copyrightOwner: "Team Cherry Pty Ltd",
      publisher: "Team Cherry Pty Ltd",
      developer: "Team Cherry Pty Ltd",
      steamAppId: STEAM_APP_IDS["hollow-knight-silksong"],
    }),
  },
  {
    slug: "sea-of-stars",
    title: "Sea of Stars",
    shortTitle: "Sea of Stars",
    tagline: "A SNES dream that knows it is one",
    description:
      "Sabotage Studio’s turn-based adventure — gorgeous, musical, and just self-aware enough to avoid pastiche.",
    developer: "Sabotage Studio",
    publisher: "Sabotage Studio",
    copyrightOwner: "Sabotage Studio",
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    released: "2023",
    hue: 255,
    evergreen: false,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["sea-of-stars"],
    aliases: ["Sea of Stars"],
    image: steamCover({
      slug: "sea-of-stars",
      title: "Sea of Stars",
      copyrightOwner: "Sabotage Studio",
      publisher: "Sabotage Studio",
      developer: "Sabotage Studio",
      steamAppId: STEAM_APP_IDS["sea-of-stars"],
    }),
  },
  {
    slug: "split-fiction",
    title: "Split Fiction",
    shortTitle: "Split Fiction",
    tagline: "Two players, one reckless imagination",
    description:
      "Hazelight’s co-op genre blender, published by Electronic Arts — it only works if you trust the other stick.",
    developer: "Hazelight Studios AB",
    publisher: "Electronic Arts Inc.",
    copyrightOwner: "Electronic Arts Inc. / Hazelight Studios AB",
    platforms: ["PC", "PlayStation", "Xbox"],
    released: "2025",
    hue: 280,
    evergreen: false,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["split-fiction"],
    aliases: ["Split Fiction"],
    image: steamCover({
      slug: "split-fiction",
      title: "Split Fiction",
      copyrightOwner: "Electronic Arts Inc. / Hazelight Studios AB",
      publisher: "Electronic Arts Inc.",
      developer: "Hazelight Studios AB",
      steamAppId: STEAM_APP_IDS["split-fiction"],
      steamFile: "header.jpg",
    }),
  },
  {
    slug: "gta-6",
    title: "Grand Theft Auto VI",
    shortTitle: "GTA 6",
    tagline: "Vice City after dark — preview only",
    description:
      "Rockstar’s forthcoming dual-protagonist crime story. Coverage here is preview and analysis only; we do not have official launch art.",
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    copyrightOwner: "Take-Two Interactive Software, Inc.",
    platforms: ["PlayStation", "Xbox"],
    released: "TBA",
    hue: 330,
    evergreen: false,
    listedHub: true,
    kind: "game",
    aliases: [
      "GTA 6",
      "GTA VI",
      "Grand Theft Auto VI",
      "Grand Theft Auto 6",
    ],
    seoTitle: "GTA 6 release date Australia, platforms, and pre-order notes",
    seoDescription:
      "GamePlayer's GTA 6 hub for Australia — 19 November 2026 on PS5 and Xbox Series, retailer listings, and why this is not a scored review yet.",
    faq: [
      {
        question: "What is the GTA 6 release date in Australia?",
        answer:
          "Rockstar has dated Grand Theft Auto VI Thursday 19 November 2026 on PlayStation 5 and Xbox Series X/S. Australian storefronts unlock on that calendar date; exact hour depends on how Sony and Microsoft stagger the AU stores.",
      },
      {
        question: "Is GTA 6 coming to PC at launch?",
        answer:
          "No PC date has been confirmed for launch. Coverage here treats PS5 and Xbox Series as the day-one platforms. A later PC port is widely expected and still unofficial.",
      },
      {
        question: "Does GamePlayer have a GTA 6 review?",
        answer:
          "No. We have a preview and an Australia release-date guide. A scored review waits until we have played the shipped game.",
      },
    ],
    image: editorialCover({
      src: "/games/gta-6.jpg",
      title: "Grand Theft Auto VI",
      copyrightOwner: "Take-Two Interactive Software, Inc.",
      publisher: "Rockstar Games",
      developer: "Rockstar Games",
      alt: "Original editorial artwork evoking a neon coastal night — no characters, vehicles, or Rockstar logos",
    }),
  },
  {
    slug: "atari-2600-plus",
    title: "Atari 2600+",
    shortTitle: "Atari 2600+",
    tagline: "The living-room cabinet returns",
    description:
      "Atari’s plug-and-play revival of the 2600 form. Hardware nostalgia, museum-grade and HDMI-stick alike.",
    developer: "Atari, Inc.",
    publisher: "Atari, Inc.",
    copyrightOwner: "Atari Interactive, Inc.",
    platforms: ["Classic"],
    released: "2023",
    hue: 45,
    evergreen: false,
    listedHub: true,
    kind: "hardware",
    aliases: ["Atari 2600+", "Atari 2600 Plus", "Atari 2600"],
    image: editorialCover({
      src: "/games/atari-2600-plus.jpg",
      title: "Atari 2600+",
      copyrightOwner: "Atari Interactive, Inc.",
      publisher: "Atari, Inc.",
      developer: "Atari, Inc.",
      alt: "Original editorial artwork evoking 1970s living-room hardware — no Atari logos or game pixels",
      licenseNote: LICENSE_PLATFORM,
    }),
  },
  {
    slug: "nintendo-switch-2",
    title: "Nintendo Switch 2",
    shortTitle: "Switch 2",
    tagline: "Handheld first, always",
    description:
      "Nintendo’s successor hybrid — stock, pricing, and the first-party slate that matters once the midnight queues thin out.",
    developer: "Nintendo",
    publisher: "Nintendo",
    copyrightOwner: "Nintendo",
    platforms: ["Nintendo Switch"],
    released: "2025",
    hue: 355,
    evergreen: false,
    listedHub: true,
    kind: "hardware",
    aliases: ["Nintendo Switch 2", "Switch 2"],
    image: editorialCover({
      src: "/games/nintendo-switch-2.jpg",
      title: "Nintendo Switch 2",
      copyrightOwner: "Nintendo",
      publisher: "Nintendo",
      developer: "Nintendo",
      alt: "Original editorial artwork evoking a handheld-to-dock launch — no Nintendo logos or Joy-Con copies",
      licenseNote: LICENSE_PLATFORM,
    }),
  },
  {
    slug: "mario-kart-world",
    title: "Mario Kart World",
    shortTitle: "Mario Kart World",
    tagline: "One island, twenty-four engines",
    description:
      "Nintendo’s Switch 2 launch racer — Knockout Tour, interconnected tracks, and the living-room argument that starts at $89.",
    developer: "Nintendo EPD",
    publisher: "Nintendo",
    copyrightOwner: "Nintendo",
    platforms: ["Nintendo Switch"],
    released: "2025",
    hue: 8,
    evergreen: false,
    listedHub: true,
    kind: "game",
    aliases: ["Mario Kart World", "MK World"],
    image: editorialCover({
      src: "/games/mario-kart-world.jpg",
      title: "Mario Kart World",
      copyrightOwner: "Nintendo",
      publisher: "Nintendo",
      developer: "Nintendo EPD",
      alt: "Original editorial artwork evoking a coastal racetrack archipelago — no characters or Nintendo logos",
      licenseNote: LICENSE_PLATFORM,
    }),
  },
  {
    slug: "donkey-kong-bananza",
    title: "Donkey Kong Bananza",
    shortTitle: "DK Bananza",
    tagline: "Punch a path to the core",
    description:
      "Nintendo’s destructible 3D platformer for Switch 2 — layers, Bananza forms, and a thousand bananas.",
    developer: "Nintendo EPD",
    publisher: "Nintendo",
    copyrightOwner: "Nintendo",
    platforms: ["Nintendo Switch"],
    released: "2025",
    hue: 35,
    evergreen: false,
    listedHub: true,
    kind: "game",
    aliases: ["Donkey Kong Bananza", "DK Bananza"],
    image: editorialCover({
      src: "/games/donkey-kong-bananza.jpg",
      title: "Donkey Kong Bananza",
      copyrightOwner: "Nintendo",
      publisher: "Nintendo",
      developer: "Nintendo EPD",
      alt: "Original editorial artwork of subterranean gold geology — no characters or Nintendo logos",
      licenseNote: LICENSE_PLATFORM,
    }),
  },
  {
    slug: "clair-obscur-expedition-33",
    title: "Clair Obscur: Expedition 33",
    shortTitle: "Expedition 33",
    tagline: "For those who come after",
    description:
      "Sandfall Interactive’s Belle Époque RPG, published by Kepler — turn-based combat with a dodge you can feel in your wrists.",
    developer: "Sandfall Interactive",
    publisher: "Kepler Interactive",
    copyrightOwner: "Sandfall Interactive / Kepler Interactive",
    platforms: ["PC", "PlayStation", "Xbox"],
    released: "2025",
    hue: 268,
    evergreen: false,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["clair-obscur-expedition-33"],
    aliases: [
      "Clair Obscur: Expedition 33",
      "Expedition 33",
      "Clair Obscur",
    ],
    image: steamCover({
      slug: "clair-obscur-expedition-33",
      title: "Clair Obscur: Expedition 33",
      copyrightOwner: "Sandfall Interactive / Kepler Interactive",
      publisher: "Kepler Interactive",
      developer: "Sandfall Interactive",
      steamAppId: STEAM_APP_IDS["clair-obscur-expedition-33"],
    }),
  },
  {
    slug: "death-stranding-2",
    title: "Death Stranding 2: On the Beach",
    shortTitle: "Death Stranding 2",
    tagline: "The strand that hits home",
    description:
      "Kojima Productions’ sequel — Sam Porter Bridges crossing a wrecked Australia. PS5 first, PC later. We review both.",
    developer: "Kojima Productions",
    publisher: "Sony Interactive Entertainment",
    copyrightOwner: "Sony Interactive Entertainment / Kojima Productions",
    platforms: ["PlayStation", "PC"],
    released: "2025",
    hue: 200,
    evergreen: false,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["death-stranding-2"],
    aliases: [
      "Death Stranding 2",
      "Death Stranding 2: On the Beach",
      "DS2",
    ],
    image: editorialCover({
      src: "/games/death-stranding-2.jpg",
      title: "Death Stranding 2: On the Beach",
      copyrightOwner: "Sony Interactive Entertainment / Kojima Productions",
      publisher: "Sony Interactive Entertainment",
      developer: "Kojima Productions",
      alt: "Original editorial artwork of a chiral Australian coastline — no characters or Sony logos",
    }),
  },
  {
    slug: "monster-hunter-wilds",
    title: "Monster Hunter Wilds",
    shortTitle: "MH Wilds",
    tagline: "The Forbidden Lands, live",
    description:
      "Capcom’s sixth-generation hunt — weather that changes the hunt, a Seikret under you, and a PC port that needed a season to settle.",
    developer: "Capcom",
    publisher: "Capcom",
    copyrightOwner: "Capcom Co., Ltd.",
    platforms: ["PC", "PlayStation", "Xbox"],
    released: "2025",
    hue: 22,
    evergreen: false,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["monster-hunter-wilds"],
    aliases: ["Monster Hunter Wilds", "MH Wilds", "Monster Hunter"],
    image: steamCover({
      slug: "monster-hunter-wilds",
      title: "Monster Hunter Wilds",
      copyrightOwner: "Capcom Co., Ltd.",
      publisher: "Capcom",
      developer: "Capcom",
      steamAppId: STEAM_APP_IDS["monster-hunter-wilds"],
    }),
  },
  {
    slug: "ghost-of-yotei",
    title: "Ghost of Yotei",
    shortTitle: "Ghost of Yotei",
    tagline: "Atsu under the mountain",
    description:
      "Sucker Punch’s standalone Ghost sequel in 1600s Ezo. PS5 exclusive: our review, Australian pricing, and whether Atsu’s revenge is worth a first-party weekend.",
    developer: "Sucker Punch Productions",
    publisher: "Sony Interactive Entertainment",
    copyrightOwner: "Sony Interactive Entertainment / Sucker Punch Productions",
    platforms: ["PlayStation"],
    released: "2025",
    hue: 28,
    evergreen: true,
    listedHub: true,
    kind: "game",
    aliases: ["Ghost of Yotei", "Ghost of Yōtei", "Yotei"],
    seoTitle: "Ghost of Yotei reviews, release date, and guides Australia",
    seoDescription:
      "GamePlayer's Ghost of Yotei hub — original PS5 review, 2 October 2025 Australian release notes, platforms, and FAQ. No PC or Xbox version at launch.",
    faq: [
      {
        question: "Is Ghost of Yotei on PC or Xbox?",
        answer:
          "Not at launch and not as of this filing. Ghost of Yotei is a PlayStation 5 exclusive from Sucker Punch and Sony. There is no Steam page and no Xbox store listing.",
      },
      {
        question: "When did Ghost of Yotei release in Australia?",
        answer:
          "2 October 2025, same global calendar date as other regions. It is out now on PS5, including PS5 Pro.",
      },
      {
        question: "Is Ghost of Yotei a sequel to Ghost of Tsushima?",
        answer:
          "It is a standalone follow-up set about 300 years later. Jin Sakai is not the lead. You play Atsu, a mercenary hunting the Yotei Six in Ezo — modern-day Hokkaido.",
      },
      {
        question: "How long is Ghost of Yotei?",
        answer:
          "A focused story lands around 25–35 hours. Side tales, shrines, and duels push most players into the 40–50 hour band.",
      },
    ],
    image: editorialCover({
      src: "/games/ghost-of-yotei.jpg",
      title: "Ghost of Yotei",
      copyrightOwner: "Sony Interactive Entertainment / Sucker Punch Productions",
      publisher: "Sony Interactive Entertainment",
      developer: "Sucker Punch Productions",
      alt: "Original editorial artwork of a snow-capped volcanic mountain over golden grasslands — no characters or PlayStation logos",
    }),
  },
  {
    slug: "pokemon-legends-za",
    title: "Pokémon Legends: Z-A",
    shortTitle: "Pokémon Legends Z-A",
    tagline: "Lumiose after dark",
    description:
      "Game Freak’s urban Pokémon return to Kalos. Switch and Switch 2: our review, Australian eShop pricing, and whether Mega Evolution in Lumiose is worth the trip.",
    developer: "Game Freak",
    publisher: "Nintendo / The Pokémon Company",
    copyrightOwner:
      "Nintendo, The Pokémon Company, Game Freak, and Creatures Inc.",
    platforms: ["Nintendo Switch"],
    released: "2025",
    hue: 265,
    evergreen: true,
    listedHub: true,
    kind: "game",
    aliases: [
      "Pokémon Legends: Z-A",
      "Pokemon Legends Z-A",
      "Pokemon Legends ZA",
      "Pokemon ZA",
      "Pokémon ZA",
    ],
    seoTitle: "Pokémon Legends Z-A reviews and guides Australia",
    seoDescription:
      "GamePlayer's Pokémon Legends Z-A hub — original review targeting Pokémon Legends ZA, Switch vs Switch 2, Australian pricing, and FAQ.",
    faq: [
      {
        question: "Is Pokémon Legends Z-A the same as Pokémon ZA?",
        answer:
          "Yes. Australians search both. The full title is Pokémon Legends: Z-A. Our review lives at /pokemon-legends-za-review/ with a /pokemon-za-review/ redirect.",
      },
      {
        question: "What platforms is Pokémon Legends Z-A on?",
        answer:
          "Nintendo Switch and Nintendo Switch 2. There is no PlayStation, Xbox, or Steam version. Buy the Switch 2 Edition if you already own the new hardware.",
      },
      {
        question: "When did Pokémon Legends Z-A release in Australia?",
        answer:
          "16 October 2025, worldwide. It is out now on eShop AU and at EB Games / JB Hi-Fi.",
      },
    ],
    image: editorialCover({
      src: "/games/pokemon-legends-za.jpg",
      title: "Pokémon Legends: Z-A",
      copyrightOwner:
        "Nintendo, The Pokémon Company, Game Freak, and Creatures Inc.",
      publisher: "Nintendo / The Pokémon Company",
      developer: "Game Freak",
      alt: "Original editorial artwork of a twilight city of plazas and cream facades — no Pokémon, characters, or Nintendo logos",
    }),
  },
  {
    slug: "metroid-prime-4",
    title: "Metroid Prime 4: Beyond",
    shortTitle: "Metroid Prime 4",
    tagline: "Samus on Viewros",
    description:
      "Retro Studios’ long-waited Prime sequel. Switch and Switch 2: our review, Sol Valley caveats, and whether Beyond is worth a first-party Nintendo weekend in Australia.",
    developer: "Retro Studios",
    publisher: "Nintendo",
    copyrightOwner: "Nintendo",
    platforms: ["Nintendo Switch"],
    released: "2025",
    hue: 175,
    evergreen: true,
    listedHub: true,
    kind: "game",
    aliases: [
      "Metroid Prime 4",
      "Metroid Prime 4: Beyond",
      "Metroid Prime 4 Beyond",
    ],
    seoTitle: "Metroid Prime 4: Beyond reviews and guides Australia",
    seoDescription:
      "GamePlayer's Metroid Prime 4: Beyond hub — original review, Switch vs Switch 2, Australian pricing, and FAQ for the Retro Studios sequel.",
    faq: [
      {
        question: "What platforms is Metroid Prime 4: Beyond on?",
        answer:
          "Nintendo Switch and Nintendo Switch 2. There is no PlayStation, Xbox, or Steam version. Switch 2 is the intended show.",
      },
      {
        question: "When did Metroid Prime 4 release in Australia?",
        answer:
          "4 December 2025, worldwide. It is out now on eShop AU and at Australian retailers.",
      },
      {
        question: "Is Metroid Prime 4: Beyond a sequel to Prime 3?",
        answer:
          "Yes — eighteen years after Corruption. Samus is stranded on Viewros with new psychic abilities. You do not need to replay the trilogy, but Prime Remastered is the kinder on-ramp.",
      },
    ],
    image: editorialCover({
      src: "/games/metroid-prime-4.jpg",
      title: "Metroid Prime 4: Beyond",
      copyrightOwner: "Nintendo",
      publisher: "Nintendo",
      developer: "Retro Studios",
      alt: "Original editorial artwork of rust dunes and distant industrial spires under a teal sky — no characters or Nintendo logos",
    }),
  },
  {
    slug: "black-ops-7",
    title: "Call of Duty: Black Ops 7",
    shortTitle: "Black Ops 7",
    tagline: "Avalon, then the Dark Aether — AU till notes only",
    description:
      "Treyarch and Raven’s 2025 Black Ops. GamePlayer’s Australia guide covers platforms, Vault vs Standard, Game Pass, and storefront prices. Not a scored review.",
    developer: "Treyarch / Raven Software",
    publisher: "Activision Publishing, Inc.",
    copyrightOwner: "Activision Publishing, Inc.",
    platforms: ["PC", "PlayStation", "Xbox"],
    released: "2025",
    hue: 18,
    evergreen: true,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["black-ops-7"],
    aliases: [
      "Black Ops 7",
      "Call of Duty Black Ops 7",
      "Call of Duty: Black Ops 7",
      "BO7",
    ],
    seoTitle: "Black Ops 7 Australia: release date, price, editions, Game Pass",
    seoDescription:
      "Call of Duty: Black Ops 7 Australia guide — November 2025 launch, PS4/PS5/Xbox/PC, Standard vs Vault, Steam AU $109.95, Game Pass. Not a review.",
    faq: [
      {
        question: "When did Black Ops 7 release in Australia?",
        answer:
          "Consoles unlocked mid-November 2025 (Xbox AU lists 14 November; PlayStation AU listed 13 November). Steam AU dated the PC build 21 November 2025. It is out now.",
      },
      {
        question: "How much is Black Ops 7 in Australia?",
        answer:
          "Steam AU lists Standard at A$109.95 as of 13 October 2026. Xbox AU has listed Vault Edition from A$149.95. Live retailer stickers move — check PSN, Xbox, Steam, EB, and JB before you tap buy.",
      },
      {
        question: "Is Black Ops 7 on Game Pass in Australia?",
        answer:
          "Xbox’s Australian Black Ops 7 page has pitched it as playable with Game Pass. Confirm the live SKU (Ultimate vs PC vs console) on xbox.com/en-AU — Activision benefits get rewritten.",
      },
    ],
    image: steamCover({
      slug: "black-ops-7",
      title: "Call of Duty: Black Ops 7",
      copyrightOwner: "Activision Publishing, Inc.",
      publisher: "Activision Publishing, Inc.",
      developer: "Treyarch / Raven Software",
      steamAppId: STEAM_APP_IDS["black-ops-7"],
      steamFile: "header.jpg",
      imageSource:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3606480/d7041a15f572f7702d5f4bc97e498cd3e1cc62e2/header.jpg",
    }),
  },
  {
    slug: "nba-2k26",
    title: "NBA 2K26",
    shortTitle: "NBA 2K26",
    tagline: "Leave no doubt — after you pick an edition",
    description:
      "Visual Concepts and 2K’s 2025 hoops annual. Australian editions, launch RRP versus today’s till, Switch vs Switch 2, and why this is not a scored review.",
    developer: "Visual Concepts",
    publisher: "2K",
    copyrightOwner: "2K / Take-Two Interactive Software, Inc.",
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    released: "2025",
    hue: 12,
    evergreen: true,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["nba-2k26"],
    aliases: ["NBA 2K26", "2K26", "NBA 2K 26"],
    seoTitle: "NBA 2K26 Australia: editions, price, platforms",
    seoDescription:
      "NBA 2K26 Australia buyer guide — 5 September 2025 launch, Standard / Superstar / Leave No Doubt / SLAM editions, AU prices, platforms. Not a review.",
    faq: [
      {
        question: "When did NBA 2K26 release in Australia?",
        answer:
          "Friday 5 September 2025 in Australian retail and console stores (Steam dated 4 September). Superstar and Leave No Doubt had a week of early access from 30 August 2025.",
      },
      {
        question: "How much is NBA 2K26 in Australia?",
        answer:
          "Launch RRP for Standard was A$119.95 on current-gen and PC (Switch last-gen was cheaper). Steam AU lists Standard at A$99.95 and Superstar at A$159.95 as of 13 October 2026. Physical copies at EB/JB/Target often sit lower — check the live sticker.",
      },
      {
        question: "What NBA 2K26 editions exist?",
        answer:
          "Standard, Superstar (VC, MyCAREER/MyTEAM extras, early access), the limited Leave No Doubt bundle at launch, and a later SLAM Edition on Steam AU. Leave No Doubt was a short sales window in September 2025.",
      },
    ],
    image: steamCover({
      slug: "nba-2k26",
      title: "NBA 2K26",
      copyrightOwner: "2K / Take-Two Interactive Software, Inc.",
      publisher: "2K",
      developer: "Visual Concepts",
      steamAppId: STEAM_APP_IDS["nba-2k26"],
      steamFile: "header.jpg",
      imageSource:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3472040/f7e126add75c3b09779b44cd349be93d31b0a80b/header.jpg",
    }),
  },
  {
    slug: "afl-26",
    title: "AFL 26",
    shortTitle: "AFL 26",
    tagline: "Big Ant’s footy, not an EA annual",
    description:
      "Melbourne-made AFL 26 from Big Ant and Nacon. Australian release dates, Switch 2 arrival, A$99.95 listings, and the platforms that actually shipped.",
    developer: "Big Ant Studios",
    publisher: "Nacon",
    copyrightOwner: "Nacon / Australian Football League",
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    released: "2025",
    hue: 42,
    evergreen: true,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["afl-26"],
    aliases: ["AFL 26", "AFL26", "AFL '26"],
    seoTitle: "AFL 26 Australia: release date, price, Switch 2, platforms",
    seoDescription:
      "AFL 26 Australia guide — 8 May 2025 launch, Switch 2 on 31 March 2026, A$99.95, Big Ant / Nacon. Not an EA Sports game and not a scored review.",
    faq: [
      {
        question: "When did AFL 26 release in Australia?",
        answer:
          "Thursday 8 May 2025 on PlayStation, Xbox, and PC (Steam dated 7 May). Nintendo Switch 2 followed on 31 March 2026.",
      },
      {
        question: "How much is AFL 26 in Australia?",
        answer:
          "Steam AU and Xbox AU have listed Standard around A$99.95. PlayStation Store AU has sat at the same RRP. Confirm EB Games and JB Hi-Fi before you assume a sale.",
      },
      {
        question: "Is AFL 26 an EA Sports game?",
        answer:
          "No. It is developed by Big Ant Studios in Melbourne and published by Nacon, under licence from the AFL. Do not confuse it with EA Sports FC 26.",
      },
    ],
    image: steamCover({
      slug: "afl-26",
      title: "AFL 26",
      copyrightOwner: "Nacon / Australian Football League",
      publisher: "Nacon",
      developer: "Big Ant Studios",
      steamAppId: STEAM_APP_IDS["afl-26"],
      steamFile: "header.jpg",
      imageSource:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3468640/28212f89bf2c6257fe2f1f380bb31ac18f63897f/header.jpg",
    }),
  },
  {
    slug: "kirby-air-riders",
    title: "Kirby Air Riders",
    shortTitle: "Kirby Air Riders",
    tagline: "Air Ride comes back — Switch 2 only",
    description:
      "Sakurai’s Air Ride successor on Nintendo Switch 2. Australian eShop pricing, City Trial notes, and why there is no PlayStation or Xbox version.",
    developer: "Bandai Namco Studios / Sora Ltd.",
    publisher: "Nintendo",
    copyrightOwner: "Nintendo",
    platforms: ["Nintendo Switch"],
    released: "2025",
    hue: 330,
    evergreen: true,
    listedHub: true,
    kind: "game",
    aliases: [
      "Kirby Air Riders",
      "Kirby Air Ride",
      "Kirby Airriders",
    ],
    seoTitle: "Kirby Air Riders Australia: Switch 2 price, release, modes",
    seoDescription:
      "Kirby Air Riders Australia explainer — 20 November 2025 on Switch 2 only, A$109.95 eShop RRP, City Trial and Air Ride. Editorial cover; not a review.",
    faq: [
      {
        question: "What platforms is Kirby Air Riders on?",
        answer:
          "Nintendo Switch 2 only. There is no PlayStation, Xbox, Steam, or original Switch version.",
      },
      {
        question: "When did Kirby Air Riders release in Australia?",
        answer:
          "Thursday 20 November 2025, same worldwide calendar date. It is out now on eShop AU and at Australian retailers.",
      },
      {
        question: "How much is Kirby Air Riders in Australia?",
        answer:
          "Nintendo’s Australian store and eShop list A$109.95 as the full sticker. Physical copies at Target, EB, JB, and Big W have already been cheaper — check the live listing.",
      },
    ],
    image: editorialCover({
      src: "/games/kirby-air-riders.jpg",
      title: "Kirby Air Riders",
      copyrightOwner: "Nintendo",
      publisher: "Nintendo",
      developer: "Bandai Namco Studios / Sora Ltd.",
      alt: "Original editorial artwork of pastel floating islands and empty gold air-lanes — no characters or Nintendo logos",
      width: 1280,
      height: 720,
      licenseNote: LICENSE_PLATFORM,
    }),
  },
  {
    slug: "battlefield-6",
    title: "Battlefield 6",
    shortTitle: "Battlefield 6",
    tagline: "All-out warfare, Australian unlock included",
    description:
      "Battlefield Studios and EA’s 2025 reset. Australian launch timing, Standard vs Phantom, Steam AU pricing, and the comparison with Black Ops 7 — no scores.",
    developer: "Battlefield Studios",
    publisher: "Electronic Arts Inc.",
    copyrightOwner: "Electronic Arts Inc.",
    platforms: ["PC", "PlayStation", "Xbox"],
    released: "2025",
    hue: 28,
    evergreen: true,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["battlefield-6"],
    aliases: ["Battlefield 6", "BF6", "Battlefield VI"],
    seoTitle: "Battlefield 6 Australia: price, editions, vs Black Ops 7",
    seoDescription:
      "Battlefield 6 Australia guide — 10 October 2025 launch (2am AEDT 11 Oct), Standard A$109.95, Phantom A$149.95, current-gen only. Not a review.",
    faq: [
      {
        question: "When did Battlefield 6 release in Australia?",
        answer:
          "Worldwide lock was 10 October 2025, 8am PT. In Sydney that was 2:00am AEDT on Saturday 11 October 2025. It is out now on PS5, Xbox Series, and PC.",
      },
      {
        question: "How much is Battlefield 6 in Australia?",
        answer:
          "Steam AU, PSN AU, and Xbox AU have listed Standard at A$109.95 and Phantom Edition at A$149.95 as of this filing. Day-one retail was often cheaper than RRP.",
      },
      {
        question: "Is Battlefield 6 on last-gen consoles?",
        answer:
          "No. Current-gen and PC only: PlayStation 5, Xbox Series X/S, and Windows. There is no PS4 or Xbox One SKU.",
      },
    ],
    image: steamCover({
      slug: "battlefield-6",
      title: "Battlefield 6",
      copyrightOwner: "Electronic Arts Inc.",
      publisher: "Electronic Arts Inc.",
      developer: "Battlefield Studios",
      steamAppId: STEAM_APP_IDS["battlefield-6"],
      steamFile: "header.jpg",
      imageSource:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2807960/c12d12ce3c7d217398d3fcad77427bfc9d57c570/header.jpg",
    }),
  },
  {
    slug: "ea-sports-fc-26",
    title: "EA Sports FC 26",
    shortTitle: "FC 26",
    tagline: "The club is yours — read the SKU first",
    description:
      "EA’s 2025 football annual in Australia. Standard vs Ultimate vs World’s Game, Game Pass / EA Play, and why a September launch is not a scored review.",
    developer: "EA Canada / EA Romania",
    publisher: "Electronic Arts Inc.",
    copyrightOwner: "Electronic Arts Inc.",
    platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    released: "2025",
    hue: 145,
    evergreen: true,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["ea-sports-fc-26"],
    aliases: [
      "EA Sports FC 26",
      "EA SPORTS FC 26",
      "FC 26",
      "FIFA 26",
    ],
    seoTitle: "EA Sports FC 26 Australia: price, editions, Game Pass",
    seoDescription:
      "EA Sports FC 26 Australia guide — 26 September 2025 launch, Standard / Ultimate / World’s Game editions, AU prices, EA Play. Not a FIFA review score.",
    faq: [
      {
        question: "When did EA Sports FC 26 release in Australia?",
        answer:
          "Standard landed 26 September 2025 worldwide (Xbox/PSN AU listed 25 September depending on store timezone). Ultimate Edition early access was the week before.",
      },
      {
        question: "How much is FC 26 in Australia?",
        answer:
          "PlayStation Store AU still lists Standard at A$109.95. Steam AU has been cheaper post-launch (A$39 as of 13 October 2026). World’s Game Edition has listed around A$239.95. Check the live storefront.",
      },
      {
        question: "Is FC 26 on Game Pass or EA Play?",
        answer:
          "EA Play (and Game Pass SKUs that include it) typically offer a short trial, not a full-year catalogue copy on day one. Confirm the live benefit on Xbox AU and EA’s site before you skip a purchase.",
      },
    ],
    image: steamCover({
      slug: "ea-sports-fc-26",
      title: "EA Sports FC 26",
      copyrightOwner: "Electronic Arts Inc.",
      publisher: "Electronic Arts Inc.",
      developer: "EA Canada / EA Romania",
      steamAppId: STEAM_APP_IDS["ea-sports-fc-26"],
      steamFile: "header.jpg",
      imageSource:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3405690/2d96aa1b06e453cd62dae9029d412f19e61932c3/header.jpg",
    }),
  },
  {
    slug: "borderlands-4",
    title: "Borderlands 4",
    shortTitle: "Borderlands 4",
    tagline: "Kairos, four hunters, three receipts",
    description:
      "Gearbox and 2K’s 2025 looter-shooter. Australian Standard / Deluxe / Super Deluxe prices, platforms, and the DLC maths — not a review score.",
    developer: "Gearbox Software",
    publisher: "2K",
    copyrightOwner: "2K / Take-Two Interactive Software, Inc. / Gearbox Software",
    platforms: ["PC", "PlayStation", "Xbox"],
    released: "2025",
    hue: 48,
    evergreen: true,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["borderlands-4"],
    aliases: ["Borderlands 4", "BL4"],
    seoTitle: "Borderlands 4 Australia: price, editions, platforms",
    seoDescription:
      "Borderlands 4 Australia guide — 11 September 2025, Standard A$109.95, Deluxe A$159.95, Super Deluxe A$199.95. Not a scored review.",
    faq: [
      {
        question: "When did Borderlands 4 release in Australia?",
        answer:
          "Thursday 11 September 2025 on PlayStation 5, Xbox Series X/S, and PC (Steam, Epic). It is out now.",
      },
      {
        question: "How much is Borderlands 4 in Australia?",
        answer:
          "Steam AU lists Standard A$109.95, Deluxe A$159.95, Super Deluxe A$199.95 as of 13 October 2026. Those match the launch RRP pattern reported when pre-orders opened.",
      },
      {
        question: "Is Borderlands 4 on last-gen or Switch?",
        answer:
          "Day one was PS5, Xbox Series, and PC. There is no official PS4, Xbox One, or Nintendo Switch SKU as of this filing.",
      },
    ],
    image: steamCover({
      slug: "borderlands-4",
      title: "Borderlands 4",
      copyrightOwner: "2K / Take-Two Interactive Software, Inc. / Gearbox Software",
      publisher: "2K",
      developer: "Gearbox Software",
      steamAppId: STEAM_APP_IDS["borderlands-4"],
      steamFile: "header.jpg",
      imageSource:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1285190/986a88d1b0e1420b00183def2a7034508353afa3/header.jpg",
    }),
  },
  {
    slug: "silent-hill-f",
    title: "Silent Hill f",
    shortTitle: "Silent Hill f",
    tagline: "Fog in 1960s Japan — calendar, not a score",
    description:
      "NeoBards and Konami’s Silent Hill f. Australian platforms, Steam AU pricing, Deluxe extras, and why GamePlayer is not posting a review score from the marketing.",
    developer: "NeoBards Entertainment Ltd.",
    publisher: "Konami Digital Entertainment",
    copyrightOwner: "Konami Digital Entertainment",
    platforms: ["PC", "PlayStation", "Xbox"],
    released: "2025",
    hue: 350,
    evergreen: false,
    listedHub: true,
    kind: "game",
    steamAppId: STEAM_APP_IDS["silent-hill-f"],
    aliases: [
      "Silent Hill f",
      "Silent Hill F",
      "SILENT HILL f",
    ],
    seoTitle: "Silent Hill f Australia: release date, price, platforms",
    seoDescription:
      "Silent Hill f Australia guide — 25 September 2025, PS5 / Xbox Series / PC, Steam AU A$99.94. Buyer notes only; not a scored horror review.",
    faq: [
      {
        question: "When did Silent Hill f release in Australia?",
        answer:
          "25 September 2025 worldwide (Steam storefronts also show 24 September depending on timezone). It is out now on PS5, Xbox Series, and PC.",
      },
      {
        question: "How much is Silent Hill f in Australia?",
        answer:
          "Steam AU lists Standard at A$99.94 and Digital Deluxe at A$114.95 as of 13 October 2026. Console storefronts move independently — check PSN AU and Xbox AU.",
      },
      {
        question: "Is Silent Hill f on last-gen consoles?",
        answer:
          "No. Current-gen and PC only as of this filing.",
      },
    ],
    image: steamCover({
      slug: "silent-hill-f",
      title: "Silent Hill f",
      copyrightOwner: "Konami Digital Entertainment",
      publisher: "Konami Digital Entertainment",
      developer: "NeoBards Entertainment Ltd.",
      steamAppId: STEAM_APP_IDS["silent-hill-f"],
      steamFile: "header.jpg",
      imageSource:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2947440/7e5d923ac622bd1775ebc9b5d4b5b0a24bf5ed40/header.jpg",
    }),
  },
];

export function getGameHub(slug: string) {
  return gameHubs.find((game) => game.slug === slug);
}

export function getListedHubs() {
  return gameHubs.filter((game) => game.listedHub);
}

export function getEvergreenHubs() {
  return gameHubs.filter((game) => game.evergreen);
}

export function getGameByTitle(title: string) {
  const needle = title.trim().toLowerCase();
  if (!needle) return undefined;
  return gameHubs.find(
    (game) =>
      game.title.toLowerCase() === needle ||
      game.shortTitle.toLowerCase() === needle ||
      game.aliases.some((alias) => alias.toLowerCase() === needle),
  );
}

export function getCoverForGame(slugOrTitle: string) {
  return getGameHub(slugOrTitle)?.image ?? getGameByTitle(slugOrTitle)?.image;
}
