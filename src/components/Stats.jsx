// src/components/Stats.jsx
// Live stats pulled from GitHub API — auto-updates when you push
import { useRef } from 'react'
import { useGitHub } from '../hooks/useGitHub'
import '../styles/Stats.css'
import CountUp from 'react-countup'


export default function Stats() {
  const { profile, totalCommits, repos, loading } = useGitHub()

  const stats = [
    {
      value: loading ? 0 : (repos.filter(r => !r.fork).length || 0),
      suffix: '+',
      label: 'GitHub Repositories',
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
            <div className="stat-n">
              <CountUp end={s.value}  duration={2.5}  />
              {s.suffix}
            </div>
            <div className="stat-l">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
