import { useState, useEffect } from 'react';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  size: number;
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  created_at: string;
}

export interface RepoStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { name: string; count: number; color: string }[];
}

const LANG_COLORS: Record<string, string> = {
  Python: '#3776AB',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Solidity: '#AA6746',
  Java: '#B07219',
  Rust: '#DEA584',
  Go: '#00ADD8',
  'C++': '#F34B7D',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Jupyter: '#F37626',
  'Jupyter Notebook': '#F37626',
};

const USERNAME = 'Manirider';
const CACHE_KEY = 'gh_data_v3';
const CACHE_TTL = 15 * 60 * 1000;

const STATIC_STATS: RepoStats = {
  totalRepos: 31,
  totalStars: 0,
  totalForks: 0,
  topLanguages: [
    { name: 'Python', count: 22, color: '#3776AB' },
    { name: 'Solidity', count: 4, color: '#AA6746' },
    { name: 'TypeScript', count: 3, color: '#3178C6' },
    { name: 'JavaScript', count: 1, color: '#F7DF1E' },
    { name: 'Java', count: 1, color: '#B07219' },
  ],
};

export const useGitHubData = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [stats, setStats] = useState<RepoStats>(STATIC_STATS);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { ts, data } = JSON.parse(cached);
          if (Date.now() - ts < CACHE_TTL) {
            setRepos(data.repos);
            setUser(data.user);
            setStats(data.stats);
            setLoading(false);
            return;
          }
        }
      } catch {
        /* cache miss */
      }

      try {
        const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' };
        const [userRes, p1Res, p2Res] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`, { headers }),
          fetch(`https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=100&page=1`, { headers }),
          fetch(`https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=100&page=2`, { headers }),
        ]);

        if (!userRes.ok) throw new Error('GitHub API rate limited');

        const userData: GitHubUser = await userRes.json();
        const p1: GitHubRepo[] = await p1Res.json();
        const p2: GitHubRepo[] = p2Res.ok ? await p2Res.json() : [];

        const allRepos = [...p1, ...p2]
          .filter((r) => !r.fork && !r.archived)
          .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

        const langCount: Record<string, number> = {};
        allRepos.forEach((r) => {
          if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
        });

        const computedStats: RepoStats = {
          totalRepos: allRepos.length,
          totalStars: allRepos.reduce((s, r) => s + r.stargazers_count, 0),
          totalForks: allRepos.reduce((s, r) => s + r.forks_count, 0),
          topLanguages: Object.entries(langCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 6)
            .map(([name, count]) => ({ name, count, color: LANG_COLORS[name] || '#8888AA' })),
        };

        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ ts: Date.now(), data: { repos: allRepos, user: userData, stats: computedStats } })
        );

        setRepos(allRepos);
        setUser(userData);
        setStats(computedStats);
      } catch (err) {
        console.warn('GitHub API unavailable, using static data:', err);
        setApiError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { repos, user, stats, loading, apiError };
};
