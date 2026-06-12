// src/hooks/useGitHub.js
// Fetches real live data from GitHub API
// Uses VITE_GITHUB_TOKEN from your .env file

import { useState, useEffect } from 'react'

const USERNAME = 'abdulrasheed-ayomide'
const BASE = 'https://api.github.com'

function getHeaders() {
  return {
    Accept: 'application/vnd.github+json'
  }
}

// Fetch all pages of paginated GitHub API results
async function fetchAllPages(url) {
  let results = []
  let page = 1
  while (true) {
    const res = await fetch(`${url}?per_page=100&page=${page}`, { headers: getHeaders() })
    if (!res.ok) break
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) break
    results = results.concat(data)
    if (data.length < 100) break
    page++
  }
  return results
}

// Count total commits across all repos (uses contributors endpoint — fast & accurate)
async function getTotalCommits(repos) {
  let total = 0
  // Only check repos that have commits (non-fork or forks you've pushed to)
  const ownRepos = repos.filter(r => !r.fork || r.pushed_at)
  // Limit to 20 most recently pushed to avoid too many requests
  const recent = ownRepos
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, 20)

  await Promise.allSettled(
    recent.map(async (repo) => {
      try {
        const res = await fetch(
          `${BASE}/repos/${USERNAME}/${repo.name}/contributors?per_page=100`,
          { headers: getHeaders() }
        )
        if (!res.ok) return
        const contribs = await res.json()
        if (!Array.isArray(contribs)) return
        const me = contribs.find(c => c.login.toLowerCase() === USERNAME.toLowerCase())
        if (me) total += me.contributions
      } catch { /* skip */ }
    })
  )
  return total
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
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        // 1. Profile
        const profileRes = await fetch(`${BASE}/users/${USERNAME}`, { headers: getHeaders() })
        if (!profileRes.ok) throw new Error('Failed to fetch GitHub profile')
        const profile = await profileRes.json()

        // 2. All repos
        const repos = await fetchAllPages(`${BASE}/users/${USERNAME}/repos`)

        // 3. Total commits (own repos only)
        const totalCommits = await getTotalCommits(repos)

        // 4. Top repos — sorted by stars then pushed_at
        const topRepos = [...repos]
          .filter(r => !r.fork)
          .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)))
          .slice(0, 6)

        // 5. Language breakdown
        const langMap = {}
        repos.filter(r => r.language).forEach(r => {
          langMap[r.language] = (langMap[r.language] || 0) + 1
        })

        if (!cancelled) {
          setData({ profile, repos, totalCommits, topRepos, languages: langMap, loading: false, error: null })
        }
      } catch (err) {
        if (!cancelled) {
          setData(d => ({ ...d, loading: false, error: err.message }))
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return data
}
