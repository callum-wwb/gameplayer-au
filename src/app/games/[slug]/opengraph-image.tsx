import { ImageResponse } from "next/og";
import { getGameHub, getListedHubs } from "@/lib/games";
import { coverDataUri } from "@/lib/og-cover";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getListedHubs().map((game) => ({ slug: game.slug }));
}

export default async function GameHubOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameHub(slug);
  const title = game?.title ?? siteConfig.name;
  const credit =
    game?.image.creditLine ??
    "Game titles and trademarks belong to their respective owners.";
  const image = game ? await coverDataUri(game.image) : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #10131c 0%, #1a1030 55%, #07120c 100%)",
          color: "white",
          position: "relative",
        }}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            width={1200}
            height={630}
            style={{
              position: "absolute",
              inset: 0,
              width: 1200,
              height: 630,
              objectFit: "cover",
            }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#7CFF6B",
            padding: 56,
            position: "relative",
          }}
        >
          Game hub · GamePlayer
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.05,
            paddingLeft: 56,
            paddingRight: 56,
            position: "relative",
          }}
        >
          {title}
        </div>
        <div
          style={{
            position: "relative",
            padding: "16px 56px 28px",
            fontSize: 18,
            lineHeight: 1.35,
            color: "rgba(255,255,255,0.88)",
          }}
        >
          {credit}
        </div>
      </div>
    ),
    size,
  );
}
