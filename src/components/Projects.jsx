import { useState } from 'react';
import '../styles/Projects.css';
import primelaneimg from '../assets/primelane.png';
import audiomackimg from '../assets/audiomack.png';
import studentinfoImg from '../assets/studentinfo.png';
import plumbingimg from '../assets/plumbing.png';
import rechargeimg from '../assets/rechargecard.png';
// import portfolioimg from '../assets/portfolio.png';

const projects = [
  {
    id: 'pl', cat: 'frontend', letters: 'PL',
    image: primelaneimg,
    name: 'PrimeLane E-commerce',
    desc: 'Modern e-commerce site with polished UI, product browsing, add-to-cart, and checkout flow built using Tailwind CSS, JavaScript, and Firebase.',
    tags: ['Tailwind CSS', 'JavaScript', 'Firebase'],
    features: ['Product Catalog', 'Cart', 'Checkout Flow', 'Responsive Design'],
    bg: 'linear-gradient(135deg,rgba(92,255,230,.15),rgba(77,142,255,.08))',
    live: 'https://primelane-wr.vercel.app/', gh: 'https://github.com/abdulrasheed-ayomide/primelane-ecommerce-level2',
  },
  {
    id: 'ac', cat: 'frontend', letters: 'AC',
    image: audiomackimg,
    name: 'Audiomack Clone',
    desc: 'Frontend music experience built with Tailwind CSS, JavaScript, and HTML for a polished audio browsing interface.',
    tags: ['Tailwind CSS', 'JavaScript', 'html'],
    features: ['Responsive Music UI', 'Search & Browse', 'Playlist Playback', 'Interactive Audio Player'],
    bg: 'linear-gradient(135deg,rgba(176,108,255,.15),rgba(92,255,230,.06))',
    live: 'https://abdulrasheed-ayomide.github.io/Audiomack/', gh: 'https://github.com/abdulrasheed-ayomide/Audiomack',
  },
  {
    id: 'siu', cat: 'frontend', letters: 'SIU',
    image: studentinfoimg,
    name: 'Student Information UI',
    desc: 'Frontend student information dashboard built with HTML, JavaScript, and CSS, designed for adding and viewing student records.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    features: ['Student Records', 'Attendance Tracking', 'Search & Filter', 'Responsive Design'],
    bg: 'linear-gradient(135deg,rgba(77,142,255,.12),rgba(176,108,255,.1))',
    live: 'https://abdulrasheed-ayomide.github.io/student-Information-Profile/', gh: 'https://github.com/abdulrasheed-ayomide/student-Information-Profile',
  },
  {
    id: 'ap', cat: 'frontend', letters: 'AP',
    image: plumbingimg,
    name: 'Adeshina Plumbing',
    desc: 'Modern plumbing service landing page built with Tailwind CSS, JavaScript, and WhatsApp contact integration for fast customer booking.',
    tags: ['Tailwind CSS', 'JavaScript', 'WhatsApp API'],
    features: ['Landing Page', 'WhatsApp Booking', 'Service Showcase', 'Responsive Design'],
    bg: 'linear-gradient(135deg,rgba(92,255,230,.1),rgba(77,142,255,.1))',
    live: 'https://abdulrasheed-ayomide.github.io/plumbing-service-website/', gh: 'https://github.com/abdulrasheed-ayomide/plumbing-service-website',
  },
  {
    id: 'rcg', cat: 'frontend', letters: 'RCG',
    image: rechargeimg,
    name: 'Recharge Card Generator',
    desc: 'Frontend airtime pin generator with network and amount selection, pin creation, save/load support, and local storage persistence.',
    tags: ['Tailwind CSS', 'JavaScript', 'Local Storage'],
    features: ['Network Selection', 'Amount Generator', 'Save Pins', 'Load Pins', 'Local Storage'],
    bg: 'linear-gradient(135deg,rgba(176,108,255,.12),rgba(92,255,230,.08))',
    live: 'https://abdulrasheed-ayomide.github.io/airtime-pin-generator/', gh: 'https://github.com/abdulrasheed-ayomide/airtime-pin-generator',
  },
  {
    id: 'pw', cat: 'backend', letters: 'PW',
    // image: portfolioimg,
    name: 'Portfolio Website',
    desc: 'This very portfolio — fully responsive, performance-optimized with modern animations.',
    tags: ['React', 'vite'],
    features: ['Responsive Design', 'Performance Optimization', 'Modern Animations', 'Full Stack Development'],
    bg: 'linear-gradient(135deg,rgba(77,142,255,.14),rgba(176,108,255,.1))',
    live: '#', gh: '#',
  },
]

const filters = [
  { value: 'all', label: 'All' },
  // { value: 'fullstack', label: 'Full Stack' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
]

export default function Projects() {
  const [active, setActive] = useState('all')
  const visible = projects.filter(p => active === 'all' || p.cat === active)
  // console.log('active:', active)
  // console.log('visible:', visible)

  return (
    <section id="projects">
      <div className="s-tag rv">04. Projects</div>
      <h2 className="s-title rv rv1">Featured Work</h2>
      <p className="s-sub rv rv2">A selection of projects demonstrating my skills and problem-solving approach.</p>

      <div className="proj-filters rv rv3">
        {filters.map(f => (
          <button key={f.value} className={`fb${active === f.value ? ' on' : ''}`}
            onClick={() => setActive(f.value)}>{f.label}</button>
        ))}
      </div>

      <div className="proj-grid">
        {visible.map((p, i) => (
          // <div key={p.id} className={`pc rv rv${i % 3}`}>
          <div key={p.id} className="pc">
            <div className="proj-thumb">
              <img src={p.image} alt={p.name} />
            </div>
            <div className="proj-body">
              <div className="proj-tags">
                {p.tags.map(t => <span className="ptag" key={t}>{t}</span>)}
              </div>
              <div className="proj-name">{p.name}</div>
              <div className="proj-desc">{p.desc}</div>
              <div className="proj-feats">
                {p.features.map(f => <span className="pfeat" key={f}>{f}</span>)}
              </div>
              <div className="plinks">
                <a href={p.live} className="pl pl-live">Live Demo ↗</a>
                <a href={p.gh} className="pl pl-gh">GitHub</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
