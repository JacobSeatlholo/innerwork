'use client'
import Link from 'next/link'

const stats = [
  { label: 'Total bookings', value: '0', sub: 'This month', icon: '📅', href: '/dashboard/practitioner/bookings' },
  { label: 'Active clients', value: '0', sub: 'Registered', icon: '👤', href: '/dashboard/practitioner/clients' },
  { label: 'Session notes', value: '0', sub: 'Written', icon: '📋', href: '/dashboard/practitioner/notes' },
  { label: 'Follow-ups due', value: '0', sub: 'This week', icon: '⚠️', href: '/dashboard/practitioner/bookings' },
]

const quickActions = [
  { href: '/dashboard/practitioner/bookings', icon: '📅', label: 'New booking', desc: 'Schedule a session' },
  { href: '/dashboard/practitioner/notes', icon: '📋', label: 'Write session note', desc: 'After a session' },
  { href: '/dashboard/practitioner/clients', icon: '👤', label: 'View clients', desc: 'Client directory' },
  { href: '/dashboard/practitioner/analytics', icon: '📈', label: 'Analytics', desc: 'Practice overview' },
]

export default function PractitionerDashboard() {
  const today = new Date()

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sand-400 text-sm">{today.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          <h1 className="font-display text-3xl text-sand-900">Practitioner Dashboard</h1>
          <p className="text-sand-400 text-sm mt-1">Gabonewe Projects · SACSSP No: 10-20383</p>
        </div>
        <Link href="/dashboard/practitioner/bookings" className="btn-primary text-sm">+ New booking</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <Link key={s.label} href={s.href} className="stat-card hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
            <span className="text-xl">{s.icon}</span>
            <div>
              <p className="text-2xl font-semibold text-sand-900">{s.value}</p>
              <p className="text-xs font-medium text-sand-700">{s.label}</p>
              <p className="text-xs text-sand-400">{s.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-semibold text-sand-900 mb-4">Quick actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

      {/* Today's schedule (placeholder) */}
      <div className="card p-6">
        <h2 className="font-semibold text-sand-900 mb-4">Today&apos;s schedule</h2>
        <div className="text-center py-8">
          <p className="text-3xl mb-3">📅</p>
          <p className="text-sand-500 text-sm">No sessions scheduled today.</p>
          <Link href="/dashboard/practitioner/bookings" className="btn-secondary text-sm mt-3 inline-block">View all bookings</Link>
        </div>
      </div>

      {/* Info strip */}
      <div className="bg-sage-950 rounded-2xl p-5 text-white flex items-center justify-between">
        <div>
          <p className="font-display text-sm text-sage-300 mb-1">Gabonewe Projects</p>
          <p className="text-xs text-sage-500">Practice: 0987034 · SACSSP: 10-20383 · +27 72 577 8419</p>
        </div>
        <a href="mailto:therapy@app.businesshustle.co.za" className="btn-secondary text-xs py-1.5 bg-transparent border-sage-700 text-sage-300 hover:bg-sage-800">Contact</a>
      </div>
    </div>
  )
}
