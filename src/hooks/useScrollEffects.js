import { useEffect } from 'react'

export function useScrollEffects() {
  useEffect(() => {
    const prog = document.getElementById('prog')
    const nb = document.getElementById('nb')
    const btt = document.getElementById('btt')
    const sections = ['hero','about','tech','skills','projects','experience','services','contact']

    const onScroll = () => {
      const st = window.scrollY
      const dh = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)

      if (prog) prog.style.width = (st / dh * 100) + '%'
      if (nb) nb.classList.toggle('solid', st > 40)
      if (btt) btt.classList.toggle('show', st > 400)

      let act = ''
      sections.forEach(id => {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= st + 80) act = id
      })
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('act', a.getAttribute('href') === '#' + act)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
