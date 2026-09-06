import { ImageResponse } from "next/og";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111827",
          color: "#7CFF6B",
          fontSize: 220,
          fontWeight: 700,
          letterSpacing: -8,
        }}
      >
        GP
      </div>
    ),
    { width: 512, height: 512 },
  );
}
