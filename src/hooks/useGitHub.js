import { useState, useEffect } from 'react';

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'abdulrasheed-ayomide';
const API_URL = import.meta.env.VITE_API_URL?.trim() || '';
const CAN_FALLBACK_DIRECT = import.meta.env.DEV;

function buildLanguageBreakdown(repos) {
  const languages = {};

  repos
    .filter(repo => !repo.fork && repo.language)
    .forEach(repo => {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    });

  return languages;
}

async function fetchBackendData() {
  const res = await fetch(`${API_URL}/api/github`);

  if (!res.ok) {
    throw new Error(`Backend error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

async function fetchGitHubDirect() {
  const [profileRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
  ]);

  if (!profileRes.ok || !reposRes.ok) {
    const message = `GitHub API error: ${profileRes.status}/${reposRes.status}`;
    throw new Error(message);
  }

  const profile = await profileRes.json();
  const repos = await reposRes.json();
  const publicRepos = (repos || []).filter(repo => !repo.fork);
  const topRepos = [...publicRepos]
    .sort((a, b) => {
      return (b.stargazers_count || 0) - (a.stargazers_count || 0) || (b.forks_count || 0) - (a.forks_count || 0);
    })
    .slice(0, 6);

  return {
    profile,
    repos: publicRepos,
    totalCommits: Math.max(profile.public_repos || 0, publicRepos.length, 1),
    topRepos,
    languages: buildLanguageBreakdown(publicRepos),
  };
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
        let githubData;

        if (API_URL) {
          try {
            githubData = await fetchBackendData();
          } catch (backendError) {
            if (CAN_FALLBACK_DIRECT) {
              githubData = await fetchGitHubDirect();
            } else {
              throw new Error(
                `Backend GitHub fetch failed: ${backendError.message}. ` +
                'Deploy your backend and set VITE_API_URL for production.'
              );
            }
          }
        } else if (CAN_FALLBACK_DIRECT) {
          githubData = await fetchGitHubDirect();
        } else {
          throw new Error('No GitHub backend configured. Set VITE_API_URL in production.');
        }

        if (!cancelled) {
          setData({
            profile: githubData.profile,
            repos: githubData.repos || [],
            totalCommits: githubData.totalCommits || 0,
            topRepos: githubData.topRepos || [],
            languages: githubData.languages || {},
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
