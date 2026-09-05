import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/elden-ring-review",
        destination: "/elden-ring-review-become-elden-lord/",
        permanent: true,
      },
      {
        source: "/baldurs-gate-3-review",
        destination: "/baldurs-gate-3-review-the-rpg-benchmark/",
        permanent: true,
      },
      {
        source: "/split-fiction-review",
        destination: "/split-fiction-co-op-review/",
        permanent: true,
      },
      {
        source: "/hollow-knight-silksong-review",
        destination: "/silksong-review/",
        permanent: true,
      },
      {
        source: "/clair-obscur-review",
        destination: "/clair-obscur-expedition-33-review/",
        permanent: true,
      },
      {
        source: "/expedition-33-review",
        destination: "/clair-obscur-expedition-33-review/",
        permanent: true,
      },
      {
        source: "/best-ps5-games",
        destination: "/best-ps5-games-2026/",
        permanent: true,
      },
      {
        source: "/death-stranding-2-on-the-beach-review",
        destination: "/death-stranding-2-review/",
        permanent: true,
      },
      {
        source: "/monster-hunter-wilds",
        destination: "/games/monster-hunter-wilds/",
        permanent: true,
      },
      {
        source: "/silksong",
        destination: "/games/hollow-knight-silksong/",
        permanent: true,
      },
      {
        source: "/ghost-of-yotei",
        destination: "/games/ghost-of-yotei/",
        permanent: true,
      },
      {
        source: "/ghost-of-yotei-release-date",
        destination: "/ghost-of-yotei-release-date-australia/",
        permanent: true,
      },
      {
        source: "/pokemon-za-review",
        destination: "/pokemon-legends-za-review/",
        permanent: true,
      },
      {
        source: "/pokemon-legends-za",
        destination: "/games/pokemon-legends-za/",
        permanent: true,
      },
      {
        source: "/pokemon-za",
        destination: "/games/pokemon-legends-za/",
        permanent: true,
      },
      {
        source: "/metroid-prime-4-beyond-review",
        destination: "/metroid-prime-4-review/",
        permanent: true,
      },
      {
        source: "/metroid-prime-4",
        destination: "/games/metroid-prime-4/",
        permanent: true,
      },
      {
        source: "/gta-6-release-date",
        destination: "/gta-6-release-date-australia/",
        permanent: true,
      },
      {
        source: "/gta-6-australia",
        destination: "/gta-6-release-date-australia/",
        permanent: true,
      },
      {
        source: "/xbox-game-pass-ultimate",
        destination: "/xbox-game-pass-ultimate-australia/",
        permanent: true,
      },
      {
        source: "/game-pass-ultimate-australia",
        destination: "/xbox-game-pass-ultimate-australia/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shared.akamai.steamstatic.com",
        pathname: "/store_item_assets/steam/apps/**",
      },
      {
        protocol: "https",
        hostname: "cdn.akamai.steamstatic.com",
        pathname: "/steam/apps/**",
      },
      {
        protocol: "https",
        hostname: "shared.cloudflare.steamstatic.com",
        pathname: "/store_item_assets/steam/apps/**",
      },
      {
        protocol: "https",
        hostname: "cdn.cloudflare.steamstatic.com",
        pathname: "/steam/apps/**",
      },
    ],
  },
};

export default nextConfig;
