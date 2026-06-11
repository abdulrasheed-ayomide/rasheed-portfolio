import { useState, useEffect, useRef } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Stats from './components/Stats'
import Process from './components/Process'
import WhyMe from './components/WhyMe'
import Experience from './components/Experience'
import GitHub from './components/GitHub'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') !== 'light')
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [loading, setLoading] = useState(true)

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? '' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  // Loader
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(t)
  }, [])

  // Scroll tracking
  useEffect(() => {
    const sections = ['hero','about','tech','skills','projects','stats','process','why','experience','github','services','contact']
    const onScroll = () => {
      const st = window.scrollY
      setScrollY(st)
      let cur = 'hero'
      sections.forEach(id => {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= st + 100) cur = id
      })
      setActiveSection(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Reveal observer
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          // skill bars
          e.target.querySelectorAll('.sk-fill').forEach(b => { b.style.width = b.dataset.p + '%' })
          // counters
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
    }, { threshold: 0.12 })

    const timer = setTimeout(() => {
      document.querySelectorAll('.rv').forEach(el => obs.observe(el))
    }, 100)

    return () => { clearTimeout(timer); obs.disconnect() }
  }, [loading])

  const scrollProgress = typeof window !== 'undefined'
    ? (scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)) * 100
    : 0

  return (
    <>
      {loading && <Loader />}

      {/* Scroll Progress Bar */}
      <div id="prog" style={{
        position: 'fixed', top: 0, left: 0, height: '2px',
        background: 'linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3))',
        zIndex: 9999, width: scrollProgress + '%', transition: 'width 0.08s'
      }} />

      <Navbar dark={dark} setDark={setDark} scrollY={scrollY} activeSection={activeSection} />

      <main>
        <Hero />
        <About />
        <TechStack />
        <Skills />
        <Projects />
        <Stats />
        <Process />
        <WhyMe />
        <Experience />
        <GitHub />
        <Services />
        <Contact />
      </main>

      <Footer />

      {/* Back to Top */}
      <button id="btt" className={scrollY > 400 ? 'show' : ''}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top">↑</button>
    </>
  )
}
