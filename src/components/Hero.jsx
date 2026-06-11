import { useEffect, useRef, useState } from 'react'
import '../styles/Hero.css'
import heroImg from '../public/profile.jpg' // Replace with actual path to your background image

const WORDS = ['MERN Stack Developer', 'React Developer', 'Full Stack Engineer', 'Backend Developer', 'Problem Solver']

function useTyping() {
  const [text, setText] = useState('')
  const state = useRef({ wi: 0, ci: 0, del: false })

  useEffect(() => {
    let timer
    function tick() {
      const { wi, ci, del } = state.current
      const word = WORDS[wi]
      if (!del) {
        const next = ci + 1
        setText(word.slice(0, next))
        state.current.ci = next
        if (next === word.length) {
          state.current.del = true
          timer = setTimeout(tick, 1900)
        } else { timer = setTimeout(tick, 75) }
      } else {
        const next = ci - 1
        setText(word.slice(0, next))
        state.current.ci = next
        if (next === 0) {
          state.current.del = false
          state.current.wi = (wi + 1) % WORDS.length
          timer = setTimeout(tick, 400)
        } else { timer = setTimeout(tick, 38) }
      }
    }
    timer = setTimeout(tick, 800)
    return () => clearTimeout(timer)
  }, [])
  return text
}

const GH = <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
const LI = <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
const TW = <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>

export default function Hero() {
  const typed = useTyping()

  return (
    <section id="hero">
      <div className="hero-bg" />
      <div className="hero-grid-lines" />

      <div className="hero-wrap">
        <div className="hero-left">
          <div className="badge rv">
            <span className="badge-dot" />
            Available for Work
          </div>

          <h1 className="hname rv rv1">
            <span className="line1">Rasheed</span>
            <span className="grad">Ayomide.</span>
          </h1>

          <div className="hero-role rv rv2">
            <span className="role-prefix">// </span>
            <span id="tw">{typed}</span>
            <span className="caret">|</span>
          </div>

          <p className="hero-desc rv rv2">
            I build scalable, high-performance web applications using the MERN stack —
            clean code, thoughtful architecture, and exceptional user experiences.
          </p>

          <div className="hbtns rv rv3">
            <a href="#projects" className="btn btn-solid"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
              View Projects
            </a>
            <a href="#contact" className="btn btn-outline"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Hire Me
            </a>
            <button className="btn btn-solid" id="dlcv"
              onClick={() => alert('Replace this with your CV file path to enable download.')}>
              ↓ Download CV
            </button>
          </div>

          <div className="hero-socials rv rv3">
            <a href="https://github.com/abdulrasheed-ayomide" target="_blank" rel="noopener noreferrer" className="soc-link" aria-label="GitHub">{GH}</a>
            <a href="https://www.linkedin.com/in/rasheed-ayomide-3a8453395" target="_blank" rel="noopener noreferrer" className="soc-link" aria-label="LinkedIn">{LI}</a>
            <a href="https://x.com/RAyomide46156" target="_blank" rel="noopener noreferrer" className="soc-link" aria-label="Twitter">{TW}</a>
          </div>
        </div>

        {/* PHOTO PANEL */}
        <div className="hero-photo rv">
          <div className="photo-outer">
            {/*
              ━━━━━━━━━━━━━━━━━━━━━━━━━━
              TO ADD YOUR PHOTO:
              1. Put your image in /public/photo.jpg
              2. Replace the placeholder below with:
                 <img src="/rasheed-portfolio/photo.jpg" alt="Rasheed Ayomide" />
              ━━━━━━━━━━━━━━━━━━━━━━━━━━
            */}
            <div className="photo-placeholder">
              <img src={heroImg} alt="Rasheed Ayomide" />
              {/* <div className="ph-init">RA</div> */}
              {/* <div className="ph-hint">Add photo.jpg<br />to /public folder</div> */}
            </div>
          </div>
          <div className="photo-ring" />
          <div className="photo-b1">
            <div className="pb-n">10+</div>
            <div className="pb-l">Projects</div>
          </div>
          <div className="photo-b2">MERN Stack</div>
        </div>
      </div>

      <div className="scroll-hint">
        <div className="sh-line" />
        <span>SCROLL</span>
      </div>
    </section>
  )
}
