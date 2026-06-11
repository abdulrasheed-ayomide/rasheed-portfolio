import '../styles/TechStack.css'

const groups = [
  { label: 'Frontend', items: ['HTML5','CSS3','JavaScript ES6+','React.js','Tailwind CSS','Responsive Design'] },
  { label: 'Backend', items: ['Node.js','Express.js','REST APIs','JWT Auth','Firebase Auth'] },
  { label: 'Database', items: ['MongoDB','Mongoose','Firebase Firestore'] },
  { label: 'Tools & Workflow', items: ['Git & GitHub','Postman','VS Code','Figma','NPM','Chrome DevTools'] },
]

export default function TechStack() {
  return (
    <section id="tech">
      <div className="s-tag rv">02. Technologies</div>
      <h2 className="s-title rv rv1">My Tech Stack</h2>
      <p className="s-sub rv rv2">Tools and technologies I use to build real-world applications.</p>
      <div className="tech-grid">
        {groups.map((g, i) => (
          <div className={`tech-card rv rv${i}`} key={g.label}>
            <div className="tc-label">{g.label}</div>
            <div className="tc-chips">
              {g.items.map(item => <span className="tc-chip" key={item}>{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
