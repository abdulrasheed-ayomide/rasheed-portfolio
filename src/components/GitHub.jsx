// src/components/GitHub.jsx
import { useEffect, useRef } from 'react'
import '../styles/GitHub.css'
import { useGitHub } from '../hooks/useGitHub'

// ── Contribution-style grid (visual only) ──
function ContribGrid({ totalCommits }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    ref.current.innerHTML = ''
    const cells = 52 * 7
    const density = Math.min(totalCommits / 80, 1)
    const activePct = 0.2 + density * 0.4

    for (let i = 0; i < cells; i++) {
      const d = document.createElement('div')
      d.className = 'cc'
      const r = Math.random()
      if (r < activePct) {
        const lvl = Math.random()
        if (lvl > 0.75) d.className += ' l4'
        else if (lvl > 0.5) d.className += ' l3'
        else if (lvl > 0.25) d.className += ' l2'
        else d.className += ' l1'
      }
      ref.current.appendChild(d)
    }
  }, [totalCommits])

  return <div className="contrib" id="cg" ref={ref} />
}

// ── Skeleton loader ──
function Skeleton({ w = '100%', h = '1rem', r = '6px', mb = '0' }) {
  return (
    <div className="gh-skel" style={{ width: w, height: h, borderRadius: r, marginBottom: mb }} />
  )
}

export default function GitHub() {
  const { profile, repos, totalCommits, languages, loading, error } = useGitHub()

  const totalStars = (repos || []).reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)

  // Top 5 languages
  const topLangs = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  const totalLangRepos = topLangs.reduce((sum, [, n]) => sum + n, 0)

  return (
    <section id="github" style={{ background: 'var(--bg)' }}>
      <div className="s-tag rv" style={{ justifyContent: 'center', textAlign: 'center' }}>
        08. Open Source
      </div>
      <h2 className="s-title rv rv1" style={{ textAlign: 'center' }}>GitHub Profile</h2>
      <p className="s-sub rv rv2" style={{ textAlign: 'center', margin: '0 auto 2.5rem' }}>
        A polished snapshot of your public GitHub presence, updated from the GitHub API.
      </p>

      {/* ── ERROR STATE ── */}
      {error && (
        <div className="gh-error rv">
          <span>⚠️</span>
          <span>Couldn't load GitHub data: {error}.<br />kindly check your GitHub token and try again.</span>
        </div>
      )}

      {/* ── PROFILE CARD ── */}
      <div className="gh-card rv rv2">
        {loading ? (
          <div className="gh-profile-row">
            <Skeleton w="72px" h="72px" r="50%" />
            <div style={{ flex: 1 }}>
              <Skeleton w="140px" h="1.1rem" mb="0.5rem" />
              <Skeleton w="200px" h="0.85rem" />
            </div>
          </div>
        ) : profile && (
          <div className="gh-profile-row">
            <img
              src={profile.avatar_url}
              alt={profile.name || profile.login}
              className="gh-av-img"
            />
            <div className="gh-profile-info">
              <div className="gh-name">{profile.name || profile.login}</div>
              <div className="gh-handle">@{profile.login}</div>
              <div className="gh-bio">{profile.bio || 'MERN Stack Developer · Building in public'}</div>
            </div>
          </div>
        )}

        {/* ── LIVE STATS ── */}
        <div className="gh-stats">
          <div className="gh-stat">
            <div className="n">
              {loading ? <Skeleton w="40px" h="1.4rem" /> : `${profile?.public_repos ?? '—'}`}
            </div>
            <div className="l">Repositories</div>
          </div>
          <div className="gh-stat">
            <div className="n">
              {loading ? <Skeleton w="40px" h="1.4rem" /> : `${totalStars > 0 ? totalStars : '—'}`}
            </div>
            <div className="l">Stars</div>
          </div>
          <div className="gh-stat">
            <div className="n">
              {loading ? <Skeleton w="40px" h="1.4rem" /> : `${profile?.followers ?? '—'}`}
            </div>
            <div className="l">Followers</div>
          </div>
          <div className="gh-stat">
            <div className="n">
              {loading ? <Skeleton w="40px" h="1.4rem" /> : `${profile?.following ?? '—'}`}
            </div>
            <div className="l">Following</div>
          </div>
        </div>

        {/* ── CONTRIBUTION GRID ── */}
        <div className="contrib-label">Contribution Activity</div>
        <ContribGrid totalCommits={totalCommits} />

        {/* ── LANGUAGE BREAKDOWN ── */}
        {!loading && topLangs.length > 0 && (
          <div className="lang-breakdown rv">
            <div className="lang-title">Top Languages</div>
            <div className="lang-bar-wrap">
              {topLangs.map(([lang, count]) => {
                const pct = ((count / totalLangRepos) * 100).toFixed(1)
                const langColors = {
                  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
                  HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219',
                }
                return (
                  <div key={lang} className="lang-seg"
                    style={{ width: pct + '%', background: langColors[lang] || 'var(--accent)' }}
                    title={`${lang}: ${pct}%`}
                  />
                )
              })}
            </div>
            <div className="lang-legend">
              {topLangs.map(([lang]) => {
                const langColors = {
                  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
                  HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219',
                }
                return (
                  <span key={lang} className="lang-item">
                    <span className="lang-dot" style={{ background: langColors[lang] || 'var(--accent)' }} />
                    {lang}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        <a
          href={`https://github.com/${profile?.login || 'abdulrasheed-ayomide'}`}
          target="_blank" rel="noopener noreferrer"
          className="btn btn-outline"
          style={{ margin: '0 auto', display: 'inline-flex' }}
        >
          View GitHub Profile ↗
        </a>
      </div>

    </section>
  )
}
