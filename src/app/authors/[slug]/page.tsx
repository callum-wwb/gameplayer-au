import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchivePage } from "@/components/archive/archive-page";
import { JsonLd } from "@/components/json-ld";
import { getArticlesByAuthor } from "@/lib/content";
import { buildPageMetadata, personJsonLd } from "@/lib/seo";
import { authors, type AuthorSlug } from "@/lib/site";

const authorSlugs = Object.keys(authors) as AuthorSlug[];

export function generateStaticParams() {
  return authorSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = authors[slug as AuthorSlug];
  if (!author) {
    return { title: "Author" };
  }
  return buildPageMetadata({
    title: `${author.name} — ${author.role}`,
    description: author.bio,
    path: `/authors/${author.slug}/`,
  });
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = authors[slug as AuthorSlug];
  if (!author) {
    notFound();
  }

  return (
    <div>
      <JsonLd data={personJsonLd(author.slug)} />
      <ArchivePage
        title={author.name}
        description={`${author.role}. ${author.bio}`}
        path={`/authors/${author.slug}/`}
        articles={getArticlesByAuthor(author.slug)}
      />
    </div>
  );
}
