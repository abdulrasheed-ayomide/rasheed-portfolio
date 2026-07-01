import { useState, useEffect } from 'react';

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'abdulrasheed-ayomide';

function buildLanguageBreakdown(repos) {
  const languages = {};

  repos
    .filter(repo => !repo.fork && repo.language)
    .forEach(repo => {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    });

  return languages;
}

export function useGitHub() {
  const [data, setData] = useState({
    profile: null,
    repos: [],
    totalCommits: 0,
    topRepos: [],
    languages: {},
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ]);

        if (!profileRes.ok || !reposRes.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const profile = await profileRes.json();
        const repos = await reposRes.json();
        const publicRepos = (repos || []).filter(repo => !repo.fork);
        const topRepos = [...publicRepos]
          .sort((a, b) => {
            return (b.stargazers_count || 0) - (a.stargazers_count || 0) || (b.forks_count || 0) - (a.forks_count || 0);
          })
          .slice(0, 6);

        if (!cancelled) {
          setData({
            profile,
            repos: publicRepos,
            totalCommits: Math.max(profile.public_repos || 0, publicRepos.length, 1),
            topRepos,
            languages: buildLanguageBreakdown(publicRepos),
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setData(d => ({
            ...d,
            loading: false,
            error: err.message,
          }));
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}