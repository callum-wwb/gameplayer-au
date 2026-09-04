import "server-only";
import { getJson } from "serpapi";

export type SerpOrganicResult = {
  title: string;
  link: string;
  snippet: string;
  position: number;
};

export type SerpRelatedSearch = {
  query: string;
};

export type SerpRelatedQuestion = {
  question: string;
  snippet?: string;
  title?: string;
  link?: string;
};

export type SerpSnapshot = {
  configured: boolean;
  query: string;
  engine: string;
  organic: SerpOrganicResult[];
  relatedSearches: SerpRelatedSearch[];
  relatedQuestions: SerpRelatedQuestion[];
  error?: string;
};

type SerpOrganicRaw = {
  title?: string;
  link?: string;
  snippet?: string;
  position?: number;
};

type SerpRelatedSearchRaw = {
  query?: string;
};

type SerpRelatedQuestionRaw = {
  question?: string;
  snippet?: string;
  title?: string;
  link?: string;
};

type SerpResponse = {
  organic_results?: SerpOrganicRaw[];
  related_searches?: SerpRelatedSearchRaw[];
  related_questions?: SerpRelatedQuestionRaw[];
  error?: string;
};

const DEFAULT_ENGINE = "google";

export function isSerpConfigured() {
  return Boolean(process.env.SERPAPI_API_KEY?.trim());
}

function emptySnapshot(query: string, error?: string): SerpSnapshot {
  return {
    configured: isSerpConfigured(),
    query,
    engine: DEFAULT_ENGINE,
    organic: [],
    relatedSearches: [],
    relatedQuestions: [],
    error,
  };
}

export async function fetchSerpSnapshot(query: string): Promise<SerpSnapshot> {
  const q = query.trim();
  if (!q) {
    return emptySnapshot("", "Enter a search query.");
  }

  const apiKey = process.env.SERPAPI_API_KEY?.trim();
  if (!apiKey) {
    return emptySnapshot(
      q,
      "SERPAPI_API_KEY is not set. Add it on the server to run live Google snapshots.",
    );
  }

  try {
    const response = (await getJson({
      engine: DEFAULT_ENGINE,
      api_key: apiKey,
      q,
      google_domain: "google.com.au",
      gl: "au",
      hl: "en",
      num: 10,
    })) as SerpResponse;

    if (response.error) {
      return emptySnapshot(q, response.error);
    }

    return {
      configured: true,
      query: q,
      engine: DEFAULT_ENGINE,
      organic: (response.organic_results ?? [])
        .filter((item) => item.title && item.link)
        .map((item, index) => ({
          title: item.title as string,
          link: item.link as string,
          snippet: item.snippet ?? "",
          position: item.position ?? index + 1,
        })),
      relatedSearches: (response.related_searches ?? [])
        .filter((item) => item.query)
        .map((item) => ({ query: item.query as string })),
      relatedQuestions: (response.related_questions ?? [])
        .filter((item) => item.question)
        .map((item) => ({
          question: item.question as string,
          snippet: item.snippet,
          title: item.title,
          link: item.link,
        })),
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "SerpAPI request failed.";
    return emptySnapshot(q, message);
  }
}

export async function fetchSerpRelated(query: string): Promise<SerpSnapshot> {
  const snapshot = await fetchSerpSnapshot(query);
  return {
    ...snapshot,
    organic: [],
  };
}
