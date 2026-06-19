import { useState, useEffect } from 'react';

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
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/github`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const githubData = await res.json();

        if (!cancelled) {
          setData({
            profile: githubData.profile,
            repos: githubData.repos,
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