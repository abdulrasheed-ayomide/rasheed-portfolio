import '../styles/Skills.css'

const categories = [
  { title: 'Frontend Development', skills: [['React.js',90],['JavaScript ES6+',88],['Tailwind CSS',85],['HTML5 / CSS3',95]] },
  { title: 'Backend Development', skills: [['Node.js',85],['Express.js',83],['RESTful APIs',88],['Auth & JWT',82]] },
  { title: 'Database & Tools', skills: [['MongoDB',85],['Firebase Firestore',80],['Git & GitHub',88],['Postman',90]] },
]

export default function Skills() {
  return (
    <section id="skills">
      <div className="s-tag rv">03. Skills</div>
      <h2 className="s-title rv rv1">Expertise & Proficiency</h2>
      <div className="skills-grid">
        {categories.map((cat, i) => (
          <div className={`sk-card rv rv${i+1}`} key={cat.title}>
            <div className="sk-title">{cat.title}</div>
            <div className="sk-rows">
              {cat.skills.map(([name, pct]) => (
                <div className="sk-row" key={name}>
                  <div className="sk-meta">
                    <span className="sk-name">{name}</span>
                    <span className="sk-pct">{pct}%</span>
                  </div>
                  <div className="sk-track">
                    <div className="sk-fill" data-p={pct} style={{ width: 0 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
