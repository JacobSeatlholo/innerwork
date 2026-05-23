'use client'
import Link from 'next/link'

const moodOptions = [
  { value: 1, emoji: '😔', label: 'Very low' },
  { value: 3, emoji: '😕', label: 'Low' },
  { value: 5, emoji: '😐', label: 'Neutral' },
  { value: 7, emoji: '🙂', label: 'Good' },
  { value: 9, emoji: '😊', label: 'Thriving' },
]

const dailyPrompts = [
  'What emotion am I carrying today that I haven\'t fully named yet?',
  'Where in my body do I feel tension, and what might it be holding?',
  'What pattern am I repeating that I\'d like to shift?',
  'What would I tell someone I love if they were feeling what I\'m feeling right now?',
  'What does accountability mean to me in this season of my life?',
]

const quickActions = [
  { href: '/dashboard/client/journal', icon: '📓', label: 'Write in journal', desc: 'Reflect & process' },
  { href: '/dashboard/client/tasks', icon: '✅', label: 'View my tasks', desc: 'Accountability actions' },
  { href: '/dashboard/client/assessment', icon: '🧭', label: 'Take assessment', desc: 'Know yourself deeper' },
  { href: '/dashboard/client/closure', icon: '💌', label: 'Closure letter', desc: 'Write what was unsaid' },
  { href: '/dashboard/couples/space', icon: '👥', label: 'Couples check-in', desc: 'Connect with partner' },
  { href: '/dashboard/bookings', icon: '📅', label: 'Book a session', desc: 'With Gabonewe' },
]

const affirmations = [
  'You are not your patterns. You are the awareness noticing them.',
  'Healing is not linear. Every honest moment counts.',
  'You deserve the same compassion you offer others.',
  'Your vulnerability is not weakness — it is the beginning of real connection.',
  'The work you do on yourself changes every relationship around you.',
]

export default function ClientDashboard() {
  const today = new Date()
  const dayIndex = today.getDay()
  const prompt = dailyPrompts[dayIndex % dailyPrompts.length]
  const affirmation = affirmations[dayIndex % affirmations.length]

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sand-400 text-sm mb-1">{today.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          <h1 className="font-display text-3xl text-sand-900">Welcome back.</h1>
          <p className="text-sand-500 text-sm mt-1">How are you showing up for yourself today?</p>
        </div>
      </div>

      {/* Affirmation */}
      <div className="bg-gradient-to-br from-sage-950 to-sage-900 rounded-2xl p-6 text-white">
        <p className="text-sage-400 text-xs uppercase tracking-widest font-medium mb-3">Today&apos;s affirmation</p>
        <p className="font-display text-xl text-white leading-relaxed italic">&ldquo;{affirmation}&rdquo;</p>
      </div>

      {/* Mood check-in */}
      <div className="card p-6">
        <h2 className="font-semibold text-sand-900 mb-1">How are you feeling right now?</h2>
        <p className="text-sand-400 text-xs mb-4">A quick emotional check-in — no right answers.</p>
        <div className="flex gap-3 flex-wrap">
          {moodOptions.map(m => (
            <button key={m.value} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-sand-200 hover:border-sage-300 hover:bg-sage-50 transition-all group">
              <span className="text-2xl group-hover:scale-110 transition-transform">{m.emoji}</span>
              <span className="text-xs text-sand-500 group-hover:text-sage-700">{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Daily prompt */}
      <div className="card p-6 border-l-4 border-l-sage-500">
        <p className="text-sage-600 text-xs font-medium uppercase tracking-widest mb-2">Today&apos;s reflection prompt</p>
        <p className="font-display text-lg text-sand-800 leading-relaxed mb-4">&ldquo;{prompt}&rdquo;</p>
        <Link href="/dashboard/client/journal" className="btn-secondary text-sm inline-flex items-center gap-2">
          <span>📓</span> Write your reflection
        </Link>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-semibold text-sand-900 mb-4">Your tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map(a => (
            <Link key={a.href} href={a.href} className="card-hover p-5 flex flex-col gap-2">
              <span className="text-2xl">{a.icon}</span>
              <div>
                <p className="font-medium text-sand-900 text-sm">{a.label}</p>
                <p className="text-xs text-sand-400">{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Progress snapshot */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Journal entries', value: '0', icon: '📓' },
          { label: 'Tasks completed', value: '0', icon: '✅' },
          { label: 'Sessions attended', value: '0', icon: '📅' },
          { label: 'Days journaling', value: '0', icon: '🔥' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <span className="text-xl">{s.icon}</span>
            <div>
              <p className="text-2xl font-semibold text-sand-900">{s.value}</p>
              <p className="text-xs text-sand-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
