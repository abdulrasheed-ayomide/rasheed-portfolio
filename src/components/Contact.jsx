import { useState } from 'react'
import '../styles/Contact.css'
import { FaWhatsapp } from "react-icons/fa";

const GH = <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
const LI = <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>

export default function Contact() {
  const [form, setForm] = useState({ fn: '', fe: '', fs: '', fm: '' })
  const [msg, setMsg] = useState({ text: '', type: '' })
  const [sending, setSending] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    const { fn, fe, fs, fm } = form
    if (!fn || !fe || !fs || !fm) { setMsg({ text: 'Please fill in all fields.', type: 'er' }); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fe)) { setMsg({ text: 'Please enter a valid email.', type: 'er' }); return }
    setSending(true)
    setMsg({ text: 'Sending...', type: '' })
    try {
      const res = await fetch('https://rasheed-portfolio-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fn, email: fe, subject: fs, message: fm }),
      })
      if (res.ok) {
        setMsg({ text: "✓ Message sent! I'll get back to you within 24 hours.", type: 'ok' })
        setForm({ fn: '', fe: '', fs: '', fm: '' })
      } else {
        const b = await res.json().catch(() => null)
        setMsg({ text: b?.error || 'Failed to send. Please try again.', type: 'er' })
      }
    } catch {
      setMsg({ text: 'Network error. Please try again.', type: 'er' })
    }
    setSending(false)
  }

  return (
    <section id="contact">
      <div className="s-tag rv">10. Contact</div>
      <h2 className="s-title rv rv1">Let's Build Something</h2>
      <p className="s-sub rv rv2">Have a project in mind? I'd love to hear about it.</p>
      <div className="contact-grid">
        <div className="ci rv">
          <h3>Get In Touch</h3> 
          <div className="citems">
            <div className="citem"><div className="cico">📧</div><div><div className="citem-lbl">Email</div><div className="citem-val">ayomiderasheed226@gmail.com</div></div></div>
            <div className="citem"><div className="cico"> <FaWhatsapp /> </div><div><div className="citem-lbl">WhatsApp</div><div className="citem-val"><a href="https://wa.me/2349162231321?text=Hello%20Rasheed,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer"className="citem-val">+234 916 223 1321</a></div></div></div>
            <div className="citem"><div className="cico">📍</div><div><div className="citem-lbl">Location</div><div className="citem-val">Lagos, Nigeria</div></div></div>
          </div>
          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <a href="https://github.com/abdulrasheed-ayomide" target="_blank" rel="noopener noreferrer" className="soc-link" aria-label="GitHub">{GH}</a>
            <a href="https://www.linkedin.com/in/rasheed-ayomide-3a8453395" target="_blank" rel="noopener noreferrer" className="soc-link" aria-label="LinkedIn">{LI}</a>
          </div>
        </div>
        <div className="cform rv rv2">
          <div className="frow">
            <div className="fg"><label>Full Name</label><input id="fn" type="text" placeholder="John Doe" value={form.fn} onChange={set('fn')} /></div>
            <div className="fg"><label>Email Address</label><input id="fe" type="email" placeholder="john@example.com" value={form.fe} onChange={set('fe')} /></div>
          </div>
          <div className="fg"><label>Subject</label><input id="fs" type="text" placeholder="Project Inquiry" value={form.fs} onChange={set('fs')} /></div>
          <div className="fg"><label>Message</label><textarea id="fm" placeholder="Tell me about your project..." value={form.fm} onChange={set('fm')} /></div>
          <button id="sbtn" className="btn btn-solid" style={{ width: '100%', justifyContent: 'center' }} onClick={submit} disabled={sending}>
            {sending ? 'Sending...' : 'Send Message →'}
          </button>
          {msg.text && <div id="fmsg" className={`fmsg ${msg.type}`}>{msg.text}</div>}
        </div>
      </div>
    </section>
  )
}
