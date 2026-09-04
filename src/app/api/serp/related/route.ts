import { NextResponse } from "next/server";
import { fetchSerpRelated } from "@/lib/serp";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const snapshot = await fetchSerpRelated(query);
  return NextResponse.json(snapshot);
}
