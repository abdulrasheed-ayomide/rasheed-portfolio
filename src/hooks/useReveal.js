import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            // Skill bars
            e.target.querySelectorAll('.sk-fill').forEach(b => {
              b.style.width = b.dataset.p + '%'
            })
            // Counters
            e.target.querySelectorAll('.cnt').forEach(c => {
              if (c.dataset.done) return
              c.dataset.done = 1
              let cur = 0
              const tgt = +c.dataset.t
              const id = setInterval(() => {
                cur = Math.min(cur + tgt / 100, tgt)
                c.textContent = Math.round(cur)
                if (cur >= tgt) clearInterval(id)
              }, 16)
            })
          }
        })
      },
      { threshold: 0.12 }
    )

    const els = document.querySelectorAll('.rv')
    els.forEach(el => obs.observe(el))

    // Stats section counters
    document.querySelectorAll('#stats .stat-item').forEach(el => {
      el.classList.add('rv')
      obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])
}
