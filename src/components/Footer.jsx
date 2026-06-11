import '../styles/Footer.css'

export default function Footer() {
  const nav = (href) => (e) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }
  return (
    <footer>
      <div className="foot-grid">
        <div className="foot-brand">
          <div className="logo">Rasheed<span>.</span></div>
          <p>MERN Stack Developer building scalable web applications with clean code and modern architecture.</p>
        </div>
        <div className="foot-col">
          <h4>Navigate</h4>
          <ul>
            <li><a href="#about" onClick={nav('#about')}>About</a></li>
            <li><a href="#tech" onClick={nav('#tech')}>Tech Stack</a></li>
            <li><a href="#projects" onClick={nav('#projects')}>Projects</a></li>
            <li><a href="#experience" onClick={nav('#experience')}>Experience</a></li>
          </ul>
        </div>
        <div className="foot-col">
          <h4>Services</h4>
          <ul>
            <li><a href="#services" onClick={nav('#services')}>Full Stack Dev</a></li>
            <li><a href="#services" onClick={nav('#services')}>API Development</a></li>
            <li><a href="#services" onClick={nav('#services')}>Firebase</a></li>
            <li><a href="#services" onClick={nav('#services')}>Maintenance</a></li>
          </ul>
        </div>
        <div className="foot-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="https://github.com/abdulrasheed-ayomide" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/rasheed-ayomide-3a8453395" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://x.com/RAyomide46156" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
            <li><a href="#contact" onClick={nav('#contact')}>Contact Me</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-btm">
        <p>© {new Date().getFullYear()} Rasheed Ayomide. All Rights Reserved.</p>
        <p>Designed & Developed by Rasheed Ayomide.</p>
      </div>
    </footer>
  )
}
