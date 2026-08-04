const GITHUB_API = "https://api.github.com";
const USERNAME = "j4nya-BinSrcs";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github.v3+json" },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export interface GitHubUser {
  login: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  stargazers_count: number;
  avatar_url: string;
  html_url: string;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  description: string | null;
  html_url: string;
  pushed_at: string;
}

export interface GitHubCommit {
  sha: string;
  commit: { message: string; author: { name: string; date: string } };
  repo: string;
}

export async function fetchGitHubUser(): Promise<GitHubUser> {
  return fetchJson<GitHubUser>(`${GITHUB_API}/users/${USERNAME}`);
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  return fetchJson<GitHubRepo[]>(
    `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=stargazers_count`
  );
}

export async function fetchGitHubCommits(
  limit: number = 200
): Promise<GitHubCommit[]> {
  const repos = await fetchJson<GitHubRepo[]>(
    `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=updated`
  );
  const commits: GitHubCommit[] = [];
  await Promise.all(
    repos.slice(0, 30).map(async (repo) => {
      try {
        const data = await fetchJson<
          { sha: string; commit: { message: string; author: { name: string; date: string } } }[]
        >(`${GITHUB_API}/repos/${USERNAME}/${repo.name}/commits?per_page=30`);
        for (const c of data) {
          commits.push({
            sha: c.sha,
            commit: c.commit,
            repo: repo.name,
          });
        }
      } catch {
        // skip repos with no commits or access issues
      }
    })
  );
  commits.sort(
    (a, b) =>
      new Date(b.commit.author.date).getTime() -
      new Date(a.commit.author.date).getTime()
  );
  return commits.slice(0, limit);
}

export async function fetchGitHubStats() {
  const [user, repos] = await Promise.all([
    fetchGitHubUser(),
    fetchGitHubRepos(),
  ]);
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  return {
    repos: user.public_repos,
    stars: totalStars,
    followers: user.followers,
    following: user.following,
  };
}

const CONTRIBUTION_COLORS = [
  "rgba(246,242,232,0.06)",
  "#c6e48b",
  "#7bc96f",
  "#239a3b",
  "#196127",
];

export function generateContributionGraph(
  commits: GitHubCommit[],
  days: number = 90
): number[][] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  const weeks = Math.ceil(days / 7);
  const graph = Array.from({ length: weeks }, () =>
    Array.from({ length: 7 }, () => 0)
  );
  for (const commit of commits) {
    const date = new Date(commit.commit.author.date);
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    if (dayStart < startDate || dayStart > now) continue;
    const daysAgo = Math.round(
      (now.getTime() - dayStart.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysAgo < 0 || daysAgo >= days) continue;
    const dayOfWeek = (date.getDay() + 6) % 7;
    const week = Math.floor(daysAgo / 7);
    if (week < weeks) {
      graph[weeks - 1 - week][dayOfWeek] = Math.min(
        graph[weeks - 1 - week][dayOfWeek] + 1,
        4
      );
    }
  }
  return graph;
}

export function cellColor(level: number) {
  return CONTRIBUTION_COLORS[level] ?? CONTRIBUTION_COLORS[0];
}
