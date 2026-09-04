import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.title;

export default function OpenGraphImage() {
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
          padding: 72,
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#7CFF6B",
          }}
        >
          GamePlayer.com.au
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            News and Gaming Reviews
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: "#c9d0dc" }}>
            From Xbox to PlayStation, PC to Mac, Nintendo to Atari.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
