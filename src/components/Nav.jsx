import { useState } from 'react'
import './Nav.css'

const links = [
  { href: '#about', label: 'About' },
  { href: '#tech', label: 'Stack' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav({ dark, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const close = () => setMenuOpen(false)

  const handleSmoothScroll = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
    close()
  }

  return (
    <>
      <nav id="nb">
        {/* LOGO */}
        <a
          href="#hero"
          className="nav-logo"
          onClick={e => handleSmoothScroll(e, '#hero')}
        >
          RA.
        </a>

        {/* CENTER LINKS */}
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e => handleSmoothScroll(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* RIGHT ACTIONS */}
        <div className="nav-right">
          <a
            href="#contact"
            className="nav-cta"
            onClick={e => handleSmoothScroll(e, '#contact')}
          >
            Hire Me
          </a>
          <button
            id="ttheme"
            className="theme-btn"
            onClick={toggleTheme}
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

      {/* MOBILE MENU */}
      <div id="mmenu" className={`mob-menu${menuOpen ? ' on' : ''}`}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={e => handleSmoothScroll(e, l.href)}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  )
}
