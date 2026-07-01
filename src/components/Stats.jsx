// src/components/Stats.jsx
// Live stats pulled from GitHub API — auto-updates when you push
import { useGitHub } from '../hooks/useGitHub'
import '../styles/Stats.css'
import CountUp from 'react-countup'


export default function Stats() {
  const { profile, repos, loading } = useGitHub()

  const totalStars = (repos || []).reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)

  const stats = [
    {
      value: loading ? 0 : (repos.filter(r => !r.fork).length || 0),
      suffix: '+',
      label: 'GitHub Repositories',
    },
    {
      value: loading ? 0 : totalStars,
      suffix: '+',
      label: 'GitHub Stars',
    },
    {
      value: loading ? 0 : (profile?.followers || 0),
      suffix: '+',
      label: 'Followers',
    },
    {
      value: loading ? 0 : (profile?.following || 0),
      suffix: '+',
      label: 'Following',
    },
  ]

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
