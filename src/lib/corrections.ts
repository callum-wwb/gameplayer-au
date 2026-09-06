export type CorrectionEntry = {
  date: string;
  articleSlug: string;
  articleTitle: string;
  summary: string;
};

/** Public corrections log. Add a row here when the desk amends a published story. */
export const corrections: CorrectionEntry[] = [];
