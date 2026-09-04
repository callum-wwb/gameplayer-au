import { NextResponse } from "next/server";
import { fetchSerpSnapshot } from "@/lib/serp";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const snapshot = await fetchSerpSnapshot(query);
  const status = snapshot.configured ? 200 : 200;
  return NextResponse.json(snapshot, { status });
}
