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
