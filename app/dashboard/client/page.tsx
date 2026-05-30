'use client'
import Link from 'next/link'

const moodOptions = [
  { value: 1, emoji: '😔', label: 'Very low', color: '#dbeafe' },
  { value: 3, emoji: '😕', label: 'Low', color: '#e0e7ff' },
  { value: 5, emoji: '😐', label: 'Okay', color: '#fef9c3' },
  { value: 7, emoji: '🙂', label: 'Good', color: '#dcfce7' },
  { value: 9, emoji: '😊', label: 'Thriving', color: '#f0f7f4' },
]

const prompts = [
  "What emotion am I carrying today that I haven't fully named yet?",
  "Where in my body do I feel tension — and what might it be holding?",
  "What pattern am I repeating that I'd like to shift?",
  "What would I tell someone I love if they felt what I'm feeling right now?",
  "What does accountability mean to me in this season of my life?",
]

const affirmations = [
  'You are not your patterns. You are the awareness noticing them.',
  'Healing is not linear. Every honest moment counts.',
  'You deserve the same compassion you offer others.',
  'Your vulnerability is not weakness — it is the beginning of real connection.',
  'The work you do on yourself changes every relationship around you.',
]

const quickActions = [
  { href: '/dashboard/client/journal', icon: '📓', label: 'Journal', desc: 'Reflect & process', color: '#f5f3ff', border: '#c4b5fd' },
  { href: '/dashboard/exercises', icon: '🌬️', label: 'Exercises', desc: 'Calm your system', color: '#f0f7f4', border: '#b3dbcd' },
  { href: '/dashboard/client/tasks', icon: '✅', label: 'Tasks', desc: 'Take action', color: '#f0fdf4', border: '#86efac' },
  { href: '/dashboard/client/assessment', icon: '🧭', label: 'Assessment', desc: 'Know yourself', color: '#fffbeb', border: '#fcd34d' },
  { href: '/dashboard/client/closure', icon: '💌', label: 'Closure', desc: 'Write it out', color: '#fdf2f8', border: '#f9a8d4' },
  { href: '/dashboard/couples/space', icon: '👥', label: 'Couples', desc: 'Connect together', color: '#eff6ff', border: '#93c5fd' },
]

export default function ClientDashboard() {
  const today = new Date()
  const dayIndex = today.getDay()
  const prompt = prompts[dayIndex % prompts.length]
  const affirmation = affirmations[dayIndex % affirmations.length]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-slide-up">

      {/* Header */}
      <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#afa99a', marginBottom: '3px' }}>
            {today.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', color: '#1a1a18', fontWeight: 600, lineHeight: 1.2 }}>Welcome back.</h1>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', color: '#afa99a', fontWeight: 300 }}>How are you showing up today?</p>
        </div>
        <Link href="/dashboard/bookings" className="btn-primary" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>+ Book session</Link>
      </div>

      {/* Affirmation */}
      <div style={{ background: 'linear-gradient(135deg, #0a2a1e 0%, #0d3d2b 60%, #155743 100%)', borderRadius: '20px', padding: 'clamp(1.25rem, 4vw, 2rem)', position: 'relative', overflow: 'hidden' }}>
        <div className="deco" style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,158,117,0.2) 0%, transparent 70%)' }} />
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#5DCAA5', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.625rem' }}>Today&apos;s affirmation</p>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', color: 'white', fontStyle: 'italic', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>&ldquo;{affirmation}&rdquo;</p>
      </div>

      {/* Mood check-in */}
      <div className="card" style={{ padding: 'clamp(1rem, 3vw, 1.75rem)' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 600, color: '#1a1a18', marginBottom: '3px' }}>How are you feeling?</h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#afa99a', marginBottom: '1rem' }}>No right answers — just honesty.</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {moodOptions.map(m => (
            <button key={m.value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '0.875rem 1rem', borderRadius: '14px', border: '1.5px solid #e8e4dc', background: 'white', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Jost, sans-serif', minWidth: '64px' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = m.color; (e.currentTarget as HTMLElement).style.borderColor = '#1D9E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white'; (e.currentTarget as HTMLElement).style.borderColor = '#e8e4dc'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
              onTouchStart={e => { (e.currentTarget as HTMLElement).style.background = m.color; (e.currentTarget as HTMLElement).style.borderColor = '#1D9E75' }}
              onTouchEnd={e => { setTimeout(() => { (e.currentTarget as HTMLElement).style.background = 'white'; (e.currentTarget as HTMLElement).style.borderColor = '#e8e4dc' }, 300) }}>
              <span style={{ fontSize: '1.75rem' }}>{m.emoji}</span>
              <span style={{ fontSize: '11px', color: '#706b5f', fontWeight: 500 }}>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Daily prompt */}
      <div style={{ background: 'white', borderRadius: '18px', border: '1.5px solid #e8e4dc', borderLeft: '5px solid #1D9E75', padding: 'clamp(1rem, 3vw, 1.75rem)', boxShadow: '0 2px 8px rgba(10,42,30,0.05)' }}>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#1D9E75', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.625rem' }}>Today&apos;s reflection prompt</p>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1rem, 3vw, 1.3rem)', color: '#3d3d3a', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.1rem' }}>&ldquo;{prompt}&rdquo;</p>
        <Link href="/dashboard/client/journal" className="btn-secondary" style={{ fontSize: '13px' }}>📓 Write your reflection</Link>
      </div>

      {/* Quick actions */}
      <div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 4vw, 1.6rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '0.875rem' }}>Your healing toolkit</h2>
        <div className="quick-grid">
          {quickActions.map(a => (
            <Link key={a.href} href={a.href} style={{ background: a.color, border: `1.5px solid ${a.border}`, borderRadius: '16px', padding: 'clamp(0.875rem, 2.5vw, 1.25rem)', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '8px', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
              <span style={{ fontSize: '1.5rem' }}>{a.icon}</span>
              <div>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 600, color: '#1a1a18', marginBottom: '1px' }}>{a.label}</p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', color: '#706b5f' }}>{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {[{ label: 'Journal entries', value: '0', icon: '📓' }, { label: 'Tasks done', value: '0', icon: '✅' }, { label: 'Sessions', value: '0', icon: '📅' }, { label: 'Days active', value: '1', icon: '🔥' }].map(s => (
          <div key={s.label} className="stat-card">
            <span style={{ fontSize: '1.25rem' }}>{s.icon}</span>
            <div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 600, color: '#1a1a18', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', color: '#afa99a', marginTop: '2px' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
