'use client'
import Link from 'next/link'
import Image from 'next/image'
import { LanguageSelector, useTranslation } from '@/components/Translator'

const services = [
  { num: '01', title: 'Psychosocial Support', sub: "SA's Leading Trauma-Informed Recovery", desc: 'Face-to-face counselling for depression, anxiety, trauma, bereavement, substance abuse, chronic illness, family & marriage counselling.', icon: '🫶', color: '#f0f7f4', border: '#b3dbcd', accent: '#1D9E75' },
  { num: '02', title: 'Training', sub: 'Organisational Effectiveness', desc: 'Bespoke programmes with practical skills, industry relevance, and innovative teaching methods that enhance workforce capabilities.', icon: '🎓', color: '#f5f3ff', border: '#c4b5fd', accent: '#6d28d9' },
  { num: '03', title: 'Coaching', sub: 'The Leadership Mindset Reset', desc: 'Art and science of leadership, business transformation, and growth with seasoned professionals and thought leaders.', icon: '🧭', color: '#fffbeb', border: '#fcd34d', accent: '#92400e' },
  { num: '04', title: 'Programme Management', sub: 'Turnkey Wellness Programs', desc: 'World-class facilitation and planning services to help clients develop and maintain their project plans.', icon: '📋', color: '#fdf2f8', border: '#f9a8d4', accent: '#9d174d' },
]

const tools = [
  { icon: '🌬️', title: 'Breathing & Grounding', desc: 'Calm your nervous system with clinically informed exercises.' },
  { icon: '📓', title: 'Guided Journals', desc: 'Therapeutic prompts for accountability, closure, and self-discovery.' },
  { icon: '💌', title: 'Closure Letters', desc: '7 formats — from forgiveness to boundary statements.' },
  { icon: '🧭', title: 'Attachment Assessment', desc: 'Understand how you connect with a personalised healing pathway.' },
  { icon: '👥', title: 'Couples Space', desc: 'Shared check-ins, conflict maps, and partner exercises.' },
  { icon: '✅', title: 'Accountability Tasks', desc: '30+ therapeutic exercises with reflection tracking.' },
]

const steps = [
  { icon: '📅', label: 'Book a Discovery Session', desc: 'One conversation changes everything' },
  { icon: '🎯', label: 'Implement Tailored Support', desc: 'Personalised to your needs' },
  { icon: '🌿', label: 'Experience Transformation', desc: 'A healthier, high-performing life' },
]

export default function LandingPage() {
  const { lang, setLang, t } = useTranslation()

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Jost', system-ui, sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="nav-fixed">
        <div className="nav-inner">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <Image src="/gabonewe-logo.svg" alt="Gabonewe Projects" className="logo-img-nav" width={56} height={56} />
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(13px, 2.5vw, 17px)', fontWeight: 700, color: '#1a1a18', lineHeight: 1.1 }}>Gabonewe Projects</div>
              <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '9px', color: '#1D9E75', fontWeight: 600, letterSpacing: '0.1em', marginTop: '2px' }}>EMOTIONAL CLARITY & HEALING</div>
            </div>
          </Link>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <LanguageSelector lang={lang} setLang={setLang} />
            <Link href="/auth/login" className="nav-hide-mobile" style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', textDecoration: 'none', padding: '8px 14px' }}>{t('sign_in')}</Link>
            <Link href="/auth/signup" className="btn-primary" style={{ fontSize: '13px', padding: '9px 18px', whiteSpace: 'nowrap' }}>{t('get_started')}</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="deco" style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,158,117,0.12) 0%, transparent 70%)' }} />
        <div className="deco" style={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px' }} />

        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', position: 'relative', zIndex: 1 }}>
          <div className="grid-hero">
            {/* Left */}
            <div className="animate-slide-up">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(29,158,117,0.15)', border: '1px solid rgba(29,158,117,0.3)', borderRadius: '50px', padding: '5px 14px', marginBottom: '1.5rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#5DCAA5', display: 'inline-block' }} className="animate-pulse" />
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 600, color: '#9FE1CB', letterSpacing: '0.06em' }}>PRACTICE: 0987034 · SACSSP: 10-20383</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.25rem' }}>
                <Image src="/gabonewe-logo.svg" alt="Gabonewe" className="logo-img-hero" width={120} height={120} style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                <div>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(14px, 2vw, 18px)', color: '#9FE1CB', fontWeight: 400 }}>Gabonewe Projects</p>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '9px', color: '#5DCAA5', fontWeight: 600, letterSpacing: '0.15em' }}>INNERWORK PLATFORM</p>
                </div>
              </div>

              <h1 className="hero-h1" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: 'white', lineHeight: 1.1, marginBottom: '1.25rem', fontWeight: 600 }}>
                Transform Your<br />
                <em style={{ color: '#5DCAA5' }}>Workplace.</em><br />
                Facilitate Impactful Change.
              </h1>

              <p className="hero-sub" style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', color: '#9FE1CB', lineHeight: 1.8, maxWidth: '480px', marginBottom: '2rem', fontWeight: 300 }}>
                SA&apos;s leading trauma-informed corporate wellness facilitator — social justice, mental health advocacy, and conflict resolution.
              </p>

              <div className="flex flex-wrap gap-3 btn-group" style={{ marginBottom: '2rem' }}>
                <Link href="/dashboard/client" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>Explore the platform →</Link>
                <a href="tel:+27725778419" style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', color: '#9FE1CB', textDecoration: 'none', padding: '14px 22px', border: '1.5px solid rgba(159,225,203,0.35)', borderRadius: '50px' }}>+27 72 577 8419</a>
              </div>

              <div className="flex flex-wrap gap-3">
                {[['♿', 'Wheelchair Accessible'], ['🏥', 'Clinically Informed'], ['🔒', 'Confidential'], ['🇿🇦', '11 SA Languages']].map(([icon, label]) => (
                  <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ fontSize: '13px' }}>{icon}</span>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', color: '#4da586', fontWeight: 500 }}>{label as string}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — service cards */}
            <div className="hero-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {services.map((s, i) => (
                <div key={s.num} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.11)', padding: '1.1rem', backdropFilter: 'blur(10px)', animation: `slideUp 0.5s ease ${i * 0.1}s both` }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{s.icon}</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: 'rgba(255,255,255,0.1)', lineHeight: 1 }}>{s.num}</div>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 600, color: 'white', lineHeight: 1.3, marginTop: '2px' }}>{s.title}</p>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', color: '#9FE1CB', lineHeight: 1.4, fontWeight: 300 }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section" style={{ background: '#fafaf8', borderBottom: '1px solid #e8e4dc' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '860px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Image src="/gabonewe-logo.svg" alt="Gabonewe" className="logo-img-section" width={80} height={80} style={{ opacity: 0.65 }} />
          </div>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, color: '#1D9E75', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{t('about_us')}</p>
          <h2 className="section-h2" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', color: '#1a1a18', marginBottom: '1.25rem', fontWeight: 600, lineHeight: 1.3 }}>
            Gabonewe Project (Pty) Ltd — a trusted provider of wellness solutions.
          </h2>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '15px', color: '#706b5f', lineHeight: 1.9, maxWidth: '680px', margin: '0 auto 2.5rem' }}>
            We focus on enhancing employee wellness through impactful, innovative and sustainable wellness programmes. Our on-site services effectively enhance social functioning and assist employees to manage the impact of work-life balance.
          </p>
          <div className="flex flex-wrap gap-4" style={{ justifyContent: 'center' }}>
            {[['⚖️', 'Social Justice'], ['🧠', 'Mental Health Advocacy'], ['🕊️', 'Conflict Resolution'], ['🏢', 'Organisational Resilience']].map(([icon, label]) => (
              <div key={label as string} style={{ textAlign: 'center', minWidth: '120px' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '6px' }}>{icon}</div>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 600, color: '#3d3d3a' }}>{label as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, color: '#1D9E75', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{t('our_services')}</p>
            <h2 className="section-h2" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#1a1a18', fontWeight: 600 }}>Four pillars of workplace wellness</h2>
          </div>
          <div className="grid-auto">
            {services.map((s, i) => (
              <div key={s.num} className="feature-card" style={{ background: s.color, border: `1.5px solid ${s.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.8rem', fontWeight: 700, color: s.accent, opacity: 0.18, lineHeight: 1 }}>{s.num}</span>
                  <span style={{ fontSize: '2rem' }}>{s.icon}</span>
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 600, color: '#1a1a18', marginBottom: '4px' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: s.accent, marginBottom: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.sub}</p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INNERWORK PLATFORM ── */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #0a2a1e 0%, #0d3d2b 100%)' }}>
        <div className="container">
          <div className="grid-platform">
            {/* Left */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <Image src="/gabonewe-logo.svg" alt="Gabonewe" className="logo-img-section" width={80} height={80} style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
                <div>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#5DCAA5', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Introducing</p>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: 'white', fontWeight: 600 }}>InnerWork Platform</p>
                </div>
              </div>
              <h2 className="section-h2" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'white', fontWeight: 600, lineHeight: 1.2, marginBottom: '1.25rem' }}>
                Your digital therapeutic companion
              </h2>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '15px', color: '#9FE1CB', lineHeight: 1.8, marginBottom: '2rem', fontWeight: 300 }}>
                Tools for accountability, closure, and healing — available between your sessions with Gabonewe.
              </p>
              <div className="flex flex-wrap gap-3 btn-group" style={{ marginBottom: '1.5rem' }}>
                <Link href="/dashboard/client" className="btn-primary" style={{ background: 'white', color: '#1D9E75' }}>Try demo dashboard</Link>
                <Link href="/auth/signup" style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', color: '#9FE1CB', padding: '11px 22px', border: '1.5px solid rgba(159,225,203,0.35)', borderRadius: '50px', textDecoration: 'none', textAlign: 'center' }}>Create account</Link>
              </div>
              {/* Demo credentials */}
              <div style={{ background: 'rgba(29,158,117,0.12)', border: '1px solid rgba(29,158,117,0.25)', borderRadius: '16px', padding: '1rem 1.25rem' }}>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#5DCAA5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>🔓 {t('demo_access')}</p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#9FE1CB', lineHeight: 2 }}>
                  Client: <strong style={{ color: 'white' }}>demo@innerwork.co.za</strong> · <strong style={{ color: 'white' }}>InnerWork2026</strong><br />
                  Practitioner: <strong style={{ color: 'white' }}>therapist@gabonewe.co.za</strong> · <strong style={{ color: 'white' }}>Gabonewe2026</strong>
                </p>
              </div>
            </div>
            {/* Right — tool cards */}
            <div className="tools-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {tools.map((tool, i) => (
                <div key={tool.title} className="tool-card" style={{ animation: `slideUp 0.5s ease ${i * 0.07}s both` }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{tool.icon}</div>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{tool.title}</p>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#9FE1CB', lineHeight: 1.6, fontWeight: 300 }}>{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section" style={{ background: '#fafaf8' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, color: '#1D9E75', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Your next step</p>
          <h2 className="section-h2" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#1a1a18', fontWeight: 600, marginBottom: '3rem' }}>Let&apos;s talk about your next step</h2>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            <div className="steps-line" style={{ position: 'absolute', top: '36px', left: '20%', right: '20%', height: '2px', background: 'linear-gradient(90deg, #1D9E75, #9FE1CB)', zIndex: 0 }} />
            {steps.map((s) => (
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

      {/* ── CTA FOOTER ── */}
      <section className="section" style={{ background: '#0a2a1e', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Image src="/gabonewe-logo.svg" alt="Gabonewe" className="logo-img-section" width={80} height={80} style={{ filter: 'brightness(0) invert(1)', opacity: 0.65 }} />
          </div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '4rem', color: '#1D9E75', lineHeight: 0.8, marginBottom: '1rem', opacity: 0.5 }}>&ldquo;</div>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 3vw, 2rem)', color: 'white', lineHeight: 1.5, fontStyle: 'italic', marginBottom: '0.5rem' }}>Our mission is not just to talk about change —</p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 3vw, 2rem)', color: '#5DCAA5', lineHeight: 1.5, fontWeight: 600, marginBottom: '2.5rem' }}>we equip you with the tools to make it happen.</p>
          <div className="flex flex-wrap gap-3 btn-group" style={{ justifyContent: 'center', marginBottom: '2.5rem' }}>
            <a href="tel:+27725778419" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>📞 +27 72 577 8419</a>
            <a href="mailto:therapy@app.businesshustle.co.za" style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', color: '#9FE1CB', textDecoration: 'none', padding: '14px 22px', border: '1.5px solid rgba(159,225,203,0.3)', borderRadius: '50px', textAlign: 'center' }}>✉️ {t('contact')}</a>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '2rem' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#2e8a6c', lineHeight: 2.2 }}>
              Practice number: 0987034 · SACSSP No: 10-20383 · ♿ Wheelchair accessible<br />
              therapy@app.businesshustle.co.za · Designed & Hosted by BusinessHustle
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
