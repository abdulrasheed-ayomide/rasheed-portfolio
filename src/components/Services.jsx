import '../styles/Services.css'

const services = [
  { icon: '🏗️', name: 'Full Stack Development', desc: 'End-to-end MERN apps from concept to deployment' },
  { icon: '⚛️', name: 'React Development', desc: 'Modern component-driven frontend with React' },
  { icon: '🔧', name: 'Backend & API Dev', desc: 'Robust REST APIs with Node.js & Express' },
  { icon: '🔥', name: 'Firebase Integration', desc: 'Auth, Firestore, hosting & real-time features' },
  { icon: '🔐', name: 'Auth Systems', desc: 'JWT, OAuth, Firebase Auth — secure by design' },
  { icon: '📱', name: 'Responsive UI/UX', desc: 'Mobile-first interfaces that look great everywhere' },
  { icon: '🚀', name: 'Optimization', desc: 'Performance audits, bug fixes, speed improvements' },
  { icon: '🛠️', name: 'Maintenance', desc: 'Ongoing support, updates, and feature additions' },
]

export default function Services() {
  return (
    <section id="services">
      <div className="s-tag rv">09. Services</div>
      <h2 className="s-title rv rv1">What I Do</h2>
      <p className="s-sub rv rv2">End-to-end development services to bring your product to life.</p>
      <div className="svc-grid">
        {services.map((s, i) => (
          <div key={s.name} className={`svc rv rv${i % 3}`}>
            <div className="svc-ico">{s.icon}</div>
            <div className="svc-name">{s.name}</div>
            <div className="svc-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
