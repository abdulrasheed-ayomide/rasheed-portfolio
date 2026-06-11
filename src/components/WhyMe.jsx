import '../styles/WhyMe.css'

const cards = [
  { icon: '🧹', title: 'Clean Code', desc: 'Maintainable, well-documented, and scalable code your team will thank you for.' },
  { icon: '📱', title: 'Responsive Design', desc: 'Every interface works flawlessly across mobile, tablet, and desktop.' },
  { icon: '⚡', title: 'Performance First', desc: 'Fast-loading, optimized applications that keep users engaged.' },
  { icon: '🧠', title: 'Problem Solving', desc: 'Practical, well-architected solutions to real business challenges.' },
]

export default function WhyMe() {
  return (
    <section id="why">
      <div className="s-tag rv">06. Why Me</div>
      <h2 className="s-title rv rv1">What I Bring to the Table</h2>
      <div className="why-grid">
        {cards.map((c, i) => (
          <div key={c.title} className={`why-card rv rv${i % 3}`}>
            <div className="why-icon">{c.icon}</div>
            <div className="why-title">{c.title}</div>
            <div className="why-desc">{c.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
