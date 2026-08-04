import { NextResponse } from "next/server";
import { fetchGitHubStats } from "@/lib/github";

export const revalidate = 300;

export async function GET() {
  try {
    const stats = await fetchGitHubStats();
    return NextResponse.json(stats, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" },
    });
  } catch {
    return NextResponse.json(
      { repos: 0, stars: 0, followers: 0, following: 0 },
      { status: 500 }
    );
  }
}