import { ArticleCard } from "@/components/article/article-card";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { Article } from "@/lib/types";

export function ArchivePage({
  title,
  description,
  path,
  articles,
}: {
  title: string;
  description: string;
  path: string;
  articles: Article[];
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: title, href: path },
        ])}
      />
      <p className="font-heading text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        GamePlayer
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {articles.length} {articles.length === 1 ? "story" : "stories"}
      </p>
      {articles.length === 0 ? (
        <p className="mt-10 text-muted-foreground">Nothing filed here yet.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
