import { Suspense } from "react";
import { ArchivePage } from "@/components/archive/archive-page";
import { SearchForm } from "@/components/layout/search-form";
import { searchArticles } from "@/lib/content";

export const metadata = {
  title: "Search",
  description: "Search GamePlayer reviews, news, previews, opinion, and video.",
};

async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const articles = query ? searchArticles(query) : [];

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-10">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Search
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find reviews, news, hubs, and features across the GamePlayer archive.
        </p>
        <div className="mt-6 max-w-xl">
          <SearchForm defaultValue={query} />
        </div>
      </div>
      {query ? (
        <ArchivePage
          title={`Results for “${query}”`}
          description={
            articles.length
              ? "Matching stories from the editorial archive."
              : "No stories matched that query. Try a game, platform, or author topic."
          }
          path={`/search?q=${encodeURIComponent(query)}`}
          articles={articles}
        />
      ) : (
        <p className="mx-auto max-w-6xl px-4 py-10 text-muted-foreground">
          Type a game, platform, or topic to search the archive.
        </p>
      )}
    </div>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <p className="mx-auto max-w-6xl px-4 py-10 text-muted-foreground">
          Loading search…
        </p>
      }
    >
      <SearchResults searchParams={searchParams} />
    </Suspense>
  );
}
