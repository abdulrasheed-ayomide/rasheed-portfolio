import '../styles/About.css'
import aboutprofile from '../assets/profile1.jpg' // Replace with actual path to your photo

const strengths = ['Frontend Development','Backend Development','Database Design','API Development','Authentication & Security','Performance Optimization','Problem Solving','Team Collaboration']

export default function About() {
  return (
    <section id="about">
      <div className="about-wrap">
        <div className="about-photo rv">
          <div className="about-photo-inner">
            <img src={aboutprofile} alt="Rasheed Ayomide" />
          </div>
          <div className="about-badge">
            <div className="ab-n">1+</div>
            <div className="ab-l">Years Coding</div>
          </div>
        </div>

        <div className="about-content rv rv2">
          <div className="s-tag">01. About Me</div>
          <h2 className="s-title">Building the Web,<br />One Stack at a Time</h2>
          <p>I'm a passionate MERN Stack Developer focused on creating responsive, user-friendly, and scalable web applications. I enjoy transforming ideas into powerful digital solutions through clean code and efficient architecture.</p>
          <p>My experience spans building responsive UIs, RESTful APIs, authentication systems, database architectures, and cloud-integrated applications.</p>
          <div className="strengths-grid">
            {strengths.map(s => (
              <div className="str" key={s}><span className="str-dot" />{s}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
