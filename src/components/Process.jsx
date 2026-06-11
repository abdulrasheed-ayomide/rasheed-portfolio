import '../styles/Process.css'

const steps = [
  ['01','Requirement Analysis','Understanding goals, scope & user needs'],
  ['02','Project Planning','Architecture, tech stack & milestones'],
  ['03','UI/UX Design','Wireframes, prototypes, design system'],
  ['04','Frontend Dev','Component building, responsive UI'],
  ['05','Backend Dev','APIs, logic, auth & integrations'],
  ['06','Database Design','Schema modeling, data architecture'],
  ['07','API Testing','Postman testing, edge cases, validation'],
  ['08','Optimization','Performance, SEO, accessibility'],
  ['09','Deployment','CI/CD, hosting, domain setup'],
  ['10','Maintenance','Monitoring, updates, support'],
]

export default function Process() {
  return (
    <section id="process">
      <div className="s-tag rv">05. Workflow</div>
      <h2 className="s-title rv rv1">My Development Process</h2>
      <div className="proc-grid">
        {steps.map(([n, t, d], i) => (
          <div key={n} className={`proc rv rv${i % 3}`}>
            <div className="proc-n">{n}</div>
            <div className="proc-t">{t}</div>
            <div className="proc-d">{d}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
