'use client'
import Link from 'next/link'

const features = [
  { icon: '🌬️', title: 'Breathwork & Grounding', desc: 'Guided breathing and sensory exercises to calm your nervous system instantly.', color: '#f0f7f4', border: '#b3dbcd', text: '#186b52' },
  { icon: '📓', title: 'Reflection Journals', desc: 'Therapeutic prompts for accountability, closure, self-discovery and gratitude.', color: '#f5f3ff', border: '#c4b5fd', text: '#6d28d9' },
  { icon: '🧭', title: 'Attachment Assessment', desc: 'Understand how you connect — and receive a personalised healing pathway.', color: '#fffbeb', border: '#fcd34d', text: '#92400e' },
  { icon: '💌', title: 'Closure Letters', desc: 'Say what was never said. 7 formats — from forgiveness to boundary statements.', color: '#fdf2f8', border: '#f9a8d4', text: '#9d174d' },
  { icon: '👥', title: 'Couples Space', desc: 'Shared check-ins, conflict mapping, and therapeutic exercises for partners.', color: '#eff6ff', border: '#93c5fd', text: '#1d4ed8' },
  { icon: '📅', title: 'Session Booking', desc: 'Book face-to-face or virtual sessions with Gabonewe directly.', color: '#f0fdf4', border: '#86efac', text: '#166534' },
]

const emotions = ['Anxiety', 'Burnout', 'Grief', 'Anger', 'Shame', 'Loneliness', 'Numbness', 'Overwhelm', 'Fear', 'Confusion', 'Avoidance', 'Heartbreak']

const testimonials = [
  { quote: 'I finally understood why I keep repeating the same patterns in relationships. The attachment assessment alone changed everything.', name: 'Client — Individual therapy', emoji: '🌿' },
  { quote: 'The couples check-in tools helped us have conversations we\'d been avoiding for years. We finally felt heard by each other.', name: 'Client — Couples session', emoji: '💛' },
  { quote: 'The exercises at home between sessions kept me grounded. I actually looked forward to the body scan every evening.', name: 'Client — Ongoing support', emoji: '🌸' },
]

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'white', fontFamily: '"DM Sans", system-ui, sans-serif' }}>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f0f0ec' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #1D9E75, #186b52)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: '16px' }}>G</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a18', lineHeight: 1 }}>InnerWork</div>
              <div style={{ fontSize: '11px', color: '#afa99a', lineHeight: 1 }}>by Gabonewe</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link href="/auth/login" style={{ fontSize: '14px', color: '#8e887a', textDecoration: 'none', padding: '8px 16px' }}>Sign in</Link>
            <Link href="/auth/signup" className="btn-primary" style={{ fontSize: '13px', padding: '8px 20px' }}>Get started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '100px', paddingBottom: '80px', background: 'linear-gradient(160deg, #0a2a1e 0%, #0d3d2b 50%, #1a5c40 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, #1D9E7520 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, #5DCAA520 0%, transparent 70%)' }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(29,158,117,0.2)', border: '1px solid rgba(29,158,117,0.4)', color: '#9FE1CB', fontSize: '12px', fontWeight: 500, padding: '6px 16px', borderRadius: '20px', marginBottom: '2rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#5DCAA5', display: 'inline-block' }} />
            SA&apos;s Leading Trauma-Informed Wellness Platform
          </div>

          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            People can only meet others<br />
            <em style={{ color: '#5DCAA5' }}>as deeply as they&apos;ve met themselves.</em>
          </h1>

          <p style={{ color: '#9FE1CB', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            InnerWork is your sanctuary for emotional clarity — a therapeutic platform for accountability, 
            closure, and relational healing, built with the clinical depth of Gabonewe Projects.
          </p>

          {/* Floating emotion pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            {emotions.map((e, i) => (
              <span key={e} style={{ fontSize: '12px', padding: '5px 12px', borderRadius: '20px', background: `rgba(29,158,117,${0.1 + (i % 3) * 0.05})`, border: '1px solid rgba(93,202,165,0.25)', color: '#9FE1CB' }}>{e}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/signup" className="btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>Begin your inner work →</Link>
            <Link href="/auth/login" style={{ color: '#9FE1CB', fontSize: '14px', padding: '14px 20px', textDecoration: 'none' }}>Already a client? Sign in</Link>
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['SACSSP No: 10-20383', 'Practice: 0987034', 'Clinically informed', 'Trauma-aware'].map(t => (
              <span key={t} style={{ fontSize: '11px', color: '#4da586' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Coloured feature strip */}
      <section style={{ padding: '80px 1.5rem', background: '#fafaf8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#1D9E75', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Everything you need</p>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', color: '#1a1a18', marginBottom: '0.75rem' }}>Your complete healing toolkit</h2>
            <p style={{ color: '#8e887a', fontSize: '15px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>Designed for individuals, couples, and the practitioners who support them.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {features.map(f => (
              <div key={f.title} style={{ background: f.color, border: `1.5px solid ${f.border}`, borderRadius: '16px', padding: '1.5rem', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#1a1a18', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ fontSize: '13px', color: '#706b5f', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exercises callout */}
      <section style={{ padding: '80px 1.5rem', background: 'linear-gradient(135deg, #1D9E75 0%, #0d3d2b 100%)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#9FE1CB', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Do the work at home</p>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: 'white', marginBottom: '1rem', lineHeight: 1.3 }}>10 healing exercises — no appointment needed</h2>
            <p style={{ color: '#9FE1CB', fontSize: '14px', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Box breathing. Body scans. Mirror work. Anger release. Inner child letters. 
              Clinically informed practices you can do in your living room, right now.
            </p>
            <Link href="/auth/signup" className="btn-primary" style={{ background: 'white', color: '#1D9E75', fontSize: '14px' }}>Access all exercises →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {['🌬️ Box Breathing', '🧘 Body Scan', '🪞 Mirror Work', '🔥 Anger Release', '💌 Unsent Letter', '🌸 Gratitude', '🧒 Inner Child', '👁️ Grounding'].map(ex => (
              <div key={ex} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '12px', padding: '12px', fontSize: '13px', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }}>{ex}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 1.5rem', background: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#1D9E75', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>From our community</p>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: '#1a1a18' }}>What healing sounds like</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: i === 0 ? '#f0f7f4' : i === 1 ? '#fffbeb' : '#fdf2f8', borderRadius: '16px', padding: '1.5rem', border: `1px solid ${i === 0 ? '#b3dbcd' : i === 1 ? '#fcd34d' : '#f9a8d4'}` }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t.emoji}</div>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '15px', color: '#1a1a18', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1rem' }}>&ldquo;{t.quote}&rdquo;</p>
                <p style={{ fontSize: '12px', color: '#8e887a', fontWeight: 500 }}>— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 1.5rem', background: '#0a2a1e', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', fontFamily: '"Playfair Display", serif', color: '#1D9E75', marginBottom: '0.5rem' }}>&ldquo;</div>
          <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.6rem', color: 'white', lineHeight: 1.5, marginBottom: '0.75rem' }}>
            Our mission is not just to talk about change —
            <span style={{ color: '#5DCAA5' }}> we equip you with the tools to make it happen.</span>
          </p>
          <p style={{ color: '#4da586', fontSize: '13px', marginBottom: '2.5rem' }}>Gabonewe Projects · Trusted corporate wellness facilitator</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/signup" className="btn-primary" style={{ fontSize: '15px', padding: '14px 32px' }}>Create your account</Link>
            <a href="tel:+27725778419" style={{ color: '#9FE1CB', fontSize: '14px', padding: '14px 20px', textDecoration: 'none', border: '1px solid rgba(93,202,165,0.3)', borderRadius: '12px' }}>+27 72 577 8419</a>
          </div>
          <p style={{ color: '#2e8a6c', fontSize: '12px', marginTop: '2rem' }}>therapy@app.businesshustle.co.za · Wheelchair accessible · Designed by BusinessHustle</p>
        </div>
      </section>
    </div>
  )
}
