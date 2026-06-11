import { useEffect, useRef } from 'react'
import '../styles/GitHub.css'

function ContribGrid() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = ''
    for (let i = 0; i < 52 * 7; i++) {
      const d = document.createElement('div')
      d.className = 'cc'
      const r = Math.random()
      if (r > 0.88) d.className += ' l4'
      else if (r > 0.7) d.className += ' l3'
      else if (r > 0.5) d.className += ' l2'
      else if (r > 0.35) d.className += ' l1'
      ref.current.appendChild(d)
    }
  }, [])
  return <div className="contrib" id="cg" ref={ref} />
}

export default function GitHub() {
  return (
    <section id="github" style={{ textAlign: 'center', background: 'var(--bg)' }}>
      <div className="s-tag rv" style={{ justifyContent: 'center' }}>08. Open Source</div>
      <h2 className="s-title rv rv1">GitHub Activity</h2>
      <div className="gh-card rv rv2">
        <div className="gh-av">RA</div>
        <div className="gh-handle">@abdulrasheed-ayomide</div>
        <div className="gh-bio">MERN Stack Developer · Building in public · Open to collaborations</div>
        <div className="gh-stats">
          <div className="gh-stat"><div className="n">10+</div><div className="l">Repositories</div></div>
          <div className="gh-stat"><div className="n">50+</div><div className="l">Commits</div></div>
          <div className="gh-stat"><div className="n">10+</div><div className="l">Projects</div></div>
        </div>
        <ContribGrid />
        <a href="https://github.com/abdulrasheed-ayomide" target="_blank" rel="noopener noreferrer"
          className="btn btn-outline" style={{ margin: '0 auto', display: 'inline-flex' }}>
          View GitHub Profile ↗
        </a>
      </div>
    </section>
  )
}
