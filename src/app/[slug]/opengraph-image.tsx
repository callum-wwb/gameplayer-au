import { ImageResponse } from "next/og";
import { getAllArticles, getArticle } from "@/lib/content";
import { articleTypes, siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export default async function ArticleOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  const title = article?.title ?? siteConfig.name;
  const kicker = article ? articleTypes[article.type].label : "GamePlayer";
  const score =
    article?.type === "review" && article.score !== undefined
      ? article.score
      : null;

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
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#7CFF6B",
          }}
        >
          <span>{kicker}</span>
          <span>GamePlayer</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 32 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.1,
              flex: 1,
            }}
          >
            {title}
          </div>
          {score !== null ? (
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: 999,
                border: "4px solid #7CFF6B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 52,
                fontWeight: 700,
                color: "#7CFF6B",
              }}
            >
              {score}
            </div>
          ) : null}
        </div>
      </div>
    ),
    size,
  );
}
