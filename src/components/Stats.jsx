import '../styles/Stats.css'

const stats = [
  { t: 10, suffix: '+', label: 'Completed Projects' },
  { t: 10, suffix: '+', label: 'Technologies Used' },
  { t: 50, suffix: '+', label: 'GitHub Commits' },
  { t: 100, suffix: '%', label: 'Project Dedication' },
]

export default function Stats() {
  return (
    <section id="stats">
      <div className="stat-grid">
        {stats.map((s, i) => (
          <div className={`rv rv${i}`} key={s.label}>
            <div className="stat-n">
              <span className="cnt" data-t={s.t}>0</span>{s.suffix}
            </div>
            <div className="stat-l">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
