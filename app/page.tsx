'use client'
import Link from 'next/link'

const services = [
  { num: '01', title: 'Psychosocial Support', sub: "SA's Leading Trauma-Informed Recovery", desc: 'Face-to-face counselling for depression, anxiety, trauma, bereavement, substance abuse, chronic illness, family & marriage.', icon: '🫶', color: '#f0f7f4', border: '#b3dbcd', accent: '#1D9E75' },
  { num: '02', title: 'Training', sub: 'Organisational Effectiveness', desc: 'Bespoke programmes with practical skills, industry relevance, and innovative teaching methods that enhance workforce capabilities.', icon: '🎓', color: '#f5f3ff', border: '#c4b5fd', accent: '#6d28d9' },
  { num: '03', title: 'Coaching', sub: 'The Leadership Mindset Reset', desc: 'Art and science of leadership, business transformation, and growth with seasoned professionals and thought leaders.', icon: '🧭', color: '#fffbeb', border: '#fcd34d', accent: '#92400e' },
  { num: '04', title: 'Programme Management', sub: 'Turnkey Wellness Programs', desc: 'World-class facilitation and planning services to help clients develop and maintain their project plans.', icon: '📋', color: '#fdf2f8', border: '#f9a8d4', accent: '#9d174d' },
]

const tools = [
  { icon: '🌬️', title: 'Breathing & Grounding', desc: 'Calm your nervous system with clinically informed exercises you can do at home.', color: '#f0f7f4' },
  { icon: '📓', title: 'Guided Journals', desc: 'Therapeutic writing prompts for accountability, closure, and self-discovery.', color: '#f5f3ff' },
  { icon: '💌', title: 'Closure Letters', desc: 'Say what was never said. 7 formats — from forgiveness to boundary statements.', color: '#fdf2f8' },
  { icon: '🧭', title: 'Attachment Assessment', desc: 'Understand how you connect, and why — with a personalised healing pathway.', color: '#fffbeb' },
  { icon: '👥', title: 'Couples Space', desc: 'Shared check-ins, conflict maps, and therapeutic exercises for partners.', color: '#eff6ff' },
  { icon: '✅', title: 'Accountability Tasks', desc: '30+ therapeutic exercises with reflection tracking — for individuals or couples.', color: '#f0fdf4' },
]

const steps = [
  { icon: '📅', label: 'Book a Discovery Session', desc: 'One conversation changes everything' },
  { icon: '🎯', label: 'Implement Tailored Support', desc: 'Personalised to your needs' },
  { icon: '🌿', label: 'Experience Transformation', desc: 'A healthier, high-performing life' },
]

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Jost', system-ui, sans-serif" }}>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #e8e4dc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #1D9E75, #0d3d2b)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(29,158,117,0.35)' }}>
                <span style={{ color: 'white', fontSize: '18px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, letterSpacing: '-0.5px' }}>G</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#1a1a18', lineHeight: 1, fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.02em' }}>GABONEWE</div>
              <div style={{ fontSize: '10px', color: '#9FE1CB', lineHeight: 1, fontWeight: 600, letterSpacing: '0.15em', marginTop: '2px' }}>PROJECTS</div>
            </div>
          </Link>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link href="/auth/login" style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', color: '#706b5f', textDecoration: 'none', padding: '8px 18px', borderRadius: '50px', transition: 'all 0.2s' }}>Sign in</Link>
            <Link href="/auth/signup" className="btn-primary" style={{ fontSize: '13px' }}>Get started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '68px', minHeight: '100vh', background: 'linear-gradient(160deg, #0a2a1e 0%, #0d3d2b 45%, #155743 100%)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,158,117,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(93,202,165,0.1) 0%, transparent 70%)' }} />
        {/* Subtle pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div className="animate-slide-up">
              {/* Credential badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(29,158,117,0.15)', border: '1px solid rgba(29,158,117,0.35)', borderRadius: '50px', padding: '6px 16px', marginBottom: '2rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#5DCAA5', display: 'inline-block' }} className="animate-pulse" />
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 600, color: '#9FE1CB', letterSpacing: '0.08em' }}>PRACTICE NO: 0987034 · SACSSP: 10-20383</span>
              </div>

              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', color: 'white', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 600 }}>
                Transform Your<br />
                <em style={{ color: '#5DCAA5', fontStyle: 'italic' }}>Workplace.</em><br />
                Facilitate Impactful<br />Change.
              </h1>

              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '17px', color: '#9FE1CB', lineHeight: 1.8, maxWidth: '460px', marginBottom: '2.5rem', fontWeight: 300 }}>
                SA&apos;s leading trauma-informed corporate wellness facilitator — with decades of experience in social justice, mental health advocacy, and conflict resolution.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link href="/dashboard/client" className="btn-primary" style={{ fontSize: '15px', padding: '14px 32px' }}>Explore the platform →</Link>
                <a href="tel:+27725778419" className="btn-secondary" style={{ fontSize: '15px', padding: '14px 32px', borderColor: 'rgba(159,225,203,0.4)', color: '#9FE1CB' }}>+27 72 577 8419</a>
              </div>

              <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem' }}>
                {[['♿', 'Wheelchair Accessible'], ['🏥', 'Clinically Informed'], ['🔒', 'Confidential']].map(([icon, label]) => (
                  <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px' }}>{icon}</span>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#4da586', fontWeight: 500 }}>{label as string}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero right — service cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {services.map((s, i) => (
                <div key={s.num} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', padding: '1.25rem', backdropFilter: 'blur(10px)', animation: `slideUp 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s both` }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{s.icon}</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 700, color: 'rgba(255,255,255,0.15)', lineHeight: 1, marginBottom: '4px' }}>{s.num}</div>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{s.title}</p>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', color: '#9FE1CB', lineHeight: 1.5 }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section style={{ background: '#fafaf8', padding: '5rem 2rem', borderBottom: '1px solid #e8e4dc' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 600, color: '#1D9E75', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>About us</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#1a1a18', marginBottom: '1.5rem', fontWeight: 600, lineHeight: 1.3 }}>
            Gabonewe Project (Pty) Ltd is a trusted provider of wellness solutions tailored to your organisation&apos;s needs.
          </h2>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', color: '#706b5f', lineHeight: 1.8, maxWidth: '700px', margin: '0 auto 3rem' }}>
            We focus on enhancing employee wellness through impactful, innovative and sustainable wellness programmes. Our on-site services effectively enhance social functioning and assist employees to manage the impact of work-life balance.
          </p>
          <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['Social Justice', '⚖️'], ['Mental Health Advocacy', '🧠'], ['Conflict Resolution', '🕊️'], ['Organisational Resilience', '🏢']].map(([label, icon]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 600, color: '#3d3d3a' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '5rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 600, color: '#1D9E75', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Our services</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#1a1a18', fontWeight: 600 }}>Four pillars of workplace wellness</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {services.map((s, i) => (
              <div key={s.num} style={{ background: s.color, border: `1.5px solid ${s.border}`, borderRadius: '20px', padding: '1.75rem', transition: 'transform 0.2s', animation: `slideUp 0.5s ease ${i * 0.08}s both` }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', fontWeight: 700, color: s.accent, opacity: 0.25, lineHeight: 1 }}>{s.num}</span>
                  <span style={{ fontSize: '2rem' }}>{s.icon}</span>
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 600, color: '#1a1a18', marginBottom: '4px' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 600, color: s.accent, marginBottom: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.sub}</p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* InnerWork platform */}
      <section style={{ padding: '5rem 2rem', background: 'linear-gradient(135deg, #0a2a1e 0%, #0d3d2b 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 600, color: '#5DCAA5', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>Introducing InnerWork</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 3vw, 3rem)', color: 'white', fontWeight: 600, lineHeight: 1.2, marginBottom: '1.25rem' }}>
                Your digital therapeutic companion
              </h2>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '15px', color: '#9FE1CB', lineHeight: 1.8, marginBottom: '2rem', fontWeight: 300 }}>
                Tools for accountability, closure, and healing — available between your sessions with Gabonewe. Do the work at home, track your progress, and share with your practitioner.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/dashboard/client" className="btn-primary" style={{ background: 'white', color: '#1D9E75' }}>Try demo dashboard</Link>
                <Link href="/auth/signup" className="btn-secondary" style={{ borderColor: 'rgba(159,225,203,0.4)', color: '#9FE1CB' }}>Create account</Link>
              </div>
              {/* Demo credentials */}
              <div style={{ marginTop: '1.5rem', background: 'rgba(29,158,117,0.15)', border: '1px solid rgba(29,158,117,0.3)', borderRadius: '14px', padding: '1rem 1.25rem' }}>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 600, color: '#5DCAA5', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Demo access</p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#9FE1CB', lineHeight: 1.8 }}>
                  Client: <strong style={{ color: 'white' }}>demo@innerwork.co.za</strong><br />
                  Password: <strong style={{ color: 'white' }}>InnerWork2026</strong><br />
                  <span style={{ fontSize: '11px', color: '#4da586' }}>Or use the "Try demo" button above — no login needed.</span>
                </p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {tools.map((t, i) => (
                <div key={t.title} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '18px', padding: '1.25rem', backdropFilter: 'blur(10px)', animation: `slideUp 0.5s ease ${i * 0.07}s both` }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{t.icon}</div>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{t.title}</p>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#9FE1CB', lineHeight: 1.6, fontWeight: 300 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '5rem 2rem', background: '#fafaf8' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 600, color: '#1D9E75', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Your next step</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#1a1a18', fontWeight: 600, marginBottom: '3.5rem' }}>Let&apos;s talk about your next step</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '35px', left: '20%', right: '20%', height: '2px', background: 'linear-gradient(90deg, #1D9E75, #9FE1CB)', zIndex: 0 }} />
            {steps.map((s, i) => (
              <div key={s.label} style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #1D9E75, #186b52)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.75rem', boxShadow: '0 8px 24px rgba(29,158,117,0.3)' }}>
                  {s.icon}
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, color: '#1a1a18', marginBottom: '6px' }}>{s.label}</h3>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section style={{ padding: '5rem 2rem', background: '#0a2a1e', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '5rem', color: '#1D9E75', lineHeight: 0.8, marginBottom: '1.5rem', opacity: 0.6 }}>&ldquo;</div>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'white', lineHeight: 1.5, marginBottom: '0.75rem', fontStyle: 'italic', fontWeight: 400 }}>
            Our mission is not just to talk about change —
          </p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#5DCAA5', lineHeight: 1.5, marginBottom: '2.5rem', fontWeight: 600 }}>
            we equip you with the tools to make it happen.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <a href="tel:+27725778419" className="btn-primary" style={{ fontSize: '15px', padding: '14px 32px' }}>📞 +27 72 577 8419</a>
            <a href="mailto:therapy@app.businesshustle.co.za" className="btn-secondary" style={{ fontSize: '15px', padding: '14px 32px', borderColor: 'rgba(159,225,203,0.35)', color: '#9FE1CB' }}>✉️ Email us</a>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#2e8a6c', lineHeight: 2 }}>
              Practice number: 0987034 · SACSSP No: 10-20383 · ♿ Wheelchair accessible<br />
              therapy@app.businesshustle.co.za · Designed & Hosted by BusinessHustle
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
