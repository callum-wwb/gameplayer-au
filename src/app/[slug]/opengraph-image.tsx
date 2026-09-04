import { ImageResponse } from "next/og";
import { resolveArticleCover } from "@/lib/article-covers";
import { getAllArticles, getArticle } from "@/lib/content";
import { coverDataUri } from "@/lib/og-cover";
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
  const media = article ? resolveArticleCover(article) : null;
  const image = media ? await coverDataUri(media) : null;
  const credit = media?.creditLine ??
    "Game titles and trademarks belong to their respective owners.";

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
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.82) 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#7CFF6B",
            padding: 56,
            position: "relative",
          }}
        >
          <span>{kicker}</span>
          <span>GamePlayer</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 32,
            paddingLeft: 56,
            paddingRight: 56,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 52,
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
                width: 120,
                height: 120,
                borderRadius: 999,
                border: "4px solid #7CFF6B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 46,
                fontWeight: 700,
                color: "#7CFF6B",
              }}
            >
              {score}
            </div>
          ) : null}
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
