import '../styles/Experience.css'

const exps = [
  { role: 'MERN Stack Developer', period: '2025 — PRESENT', desc: 'Building full-stack web applications using React, Node.js, Express.js, and MongoDB. Delivering complete solutions from database design to deployment, with focus on performance and scalability.' },
  { role: 'Freelance Web Developer', period: '2025 — PRESENT', desc: 'Developing custom websites and web applications for clients across various industries, handling everything from consultation to deployment and post-launch support.' },
  { role: 'Continuous Learner & Builder', period: 'ONGOING', desc: 'Actively improving skills in software architecture, system design, and emerging technologies. Building personal projects to explore new tools and frameworks.' },
]

export default function Experience() {
  return (
    <section id="experience">
      <div className="s-tag rv">07. Experience</div>
      <h2 className="s-title rv rv1">Professional Journey</h2>
      <div className="exp-list">
        {exps.map((e, i) => (
          <div key={e.role} className={`exp-c rv rv${i}`}>
            <div className="exp-role">{e.role}</div>
            <div className="exp-period">{e.period}</div>
            <div className="exp-desc">{e.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
