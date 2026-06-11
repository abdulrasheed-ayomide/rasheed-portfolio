import { useState } from 'react'
import '../styles/Navbar.css'

const links = [
  { href: '#about', label: 'About' },
  { href: '#tech', label: 'Stack' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#services', label: 'Services' },
]

export default function Navbar({ dark, setDark, scrollY, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav id="nb" className={scrollY > 40 ? 'solid' : ''}>
        <a href="#hero" className="nav-logo" onClick={e => handleNav(e, '#hero')}>
          Rasheed<span className="dot">.</span>
        </a>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={activeSection === l.href.slice(1) ? 'act' : ''}
                onClick={e => handleNav(e, l.href)}
              >{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <a href="#contact" className="nav-cta" onClick={e => handleNav(e, '#contact')}>
            Hire Me
          </a>
          <button
            id="ttheme"
            className="theme-btn"
            onClick={() => setDark(d => !d)}
            aria-label="Toggle theme"
          >
            {dark ? '☀️' : '🌙'}
          </button>
          <button
            id="hham"
            className={`ham${menuOpen ? ' on' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div id="mmenu" className={`mob-menu${menuOpen ? ' on' : ''}`}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={e => handleNav(e, l.href)}>{l.label}</a>
        ))}
        <a href="#contact" onClick={e => handleNav(e, '#contact')}>Contact</a>
      </div>
    </>
  )
}
