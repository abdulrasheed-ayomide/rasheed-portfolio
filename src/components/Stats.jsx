// src/components/Stats.jsx
// Live stats pulled from GitHub API — auto-updates when you push
import { useEffect, useRef } from 'react'
import { useGitHub } from '../hooks/useGitHub'
import '../styles/Stats.css'

const stats = [
  { t: 10, suffix: '+', label: 'Completed Projects' },
  { t: 10, suffix: '+', label: 'Technologies Used' },
  { t: 50, suffix: '+', label: 'GitHub Commits' },
  { t: 100, suffix: '%', label: 'Project Dedication' },
]

export default function Stats() {
  const { profile, totalCommits, repos, loading } = useGitHub()

  const stats = [
    {
      value: loading ? 0 : (repos.filter(r => !r.fork).length || 0),
      suffix: '+',
      label: 'Completed Projects',
    },
    {
      value: 10,
      suffix: '+',
      label: 'Technologies Used',
      static: true,
    },
    {
      value: loading ? 0 : totalCommits,
      suffix: '+',
      label: 'GitHub Commits',
    },
    {
      value: 100,
      suffix: '%',
      label: 'Project Dedication',
      static: true,
    },
  ]

  // Trigger count-up for static stats too via rv observer
  const staticRefs = useRef([])

  return (
    <section id="stats">
      <div className="stat-grid">
        {stats.map((s, i) => (
          <div className={`rv rv${i}`} key={s.label}>
            {s.static
              ? (
                <div className="stat-n">
                  <span className="cnt" data-t={s.value}>0</span>{s.suffix}
                </div>
              ) : (
                <div className="stat-n">
                  <span className="cnt" data-t={s.value}>0</span>{s.suffix}
                </div>
              )
            }
            <div className="stat-l">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
