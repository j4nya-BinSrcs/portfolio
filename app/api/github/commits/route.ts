import { NextResponse } from "next/server";
import { fetchGitHubCommits } from "@/lib/github";

export const revalidate = 300;

export async function GET() {
  try {
    const commits = await fetchGitHubCommits(200);
    return NextResponse.json(commits, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" },
    });
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}