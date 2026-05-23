'use client'

const sessionData = [
  { month: 'Nov', sessions: 4 }, { month: 'Dec', sessions: 6 },
  { month: 'Jan', sessions: 9 }, { month: 'Feb', sessions: 11 },
  { month: 'Mar', sessions: 8 }, { month: 'Apr', sessions: 14 },
  { month: 'May', sessions: 7 },
]

const maxSessions = Math.max(...sessionData.map(d => d.sessions))

const sessionTypes = [
  { label: 'Individual', count: 18, color: 'bg-sage-500' },
  { label: 'Couples', count: 9, color: 'bg-warm-500' },
  { label: 'Crisis', count: 2, color: 'bg-red-400' },
  { label: 'Follow-up', count: 5, color: 'bg-sand-400' },
  { label: 'Group', count: 3, color: 'bg-blue-400' },
]
const totalSessions = sessionTypes.reduce((a, b) => a + b.count, 0)

const topIssues = [
  { label: 'Anxiety & nervous system', count: 14 },
  { label: 'Relational trauma', count: 11 },
  { label: 'Couples communication', count: 9 },
  { label: 'Attachment patterns', count: 8 },
  { label: 'Boundary work', count: 7 },
  { label: 'Burnout / workplace stress', count: 6 },
]
const maxIssue = Math.max(...topIssues.map(i => i.count))

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-slide-up">
      <div>
        <h1 className="font-display text-3xl text-sand-900 mb-1">Practice Analytics</h1>
        <p className="text-sand-400 text-sm">Practice overview — sessions, clients, and presenting concerns.</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total sessions', value: '37', sub: 'All time', icon: '📅' },
          { label: 'Active clients', value: '2', sub: 'This month', icon: '👤' },
          { label: 'Revenue (R)', value: '31,400', sub: 'All time', icon: '💰' },
          { label: 'Completion rate', value: '89%', sub: 'Avg sessions', icon: '✓' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <span className="text-xl">{s.icon}</span>
            <div>
              <p className="text-2xl font-semibold text-sand-900">{s.value}</p>
              <p className="text-xs font-medium text-sand-700">{s.label}</p>
              <p className="text-xs text-sand-400">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sessions over time */}
      <div className="card p-6">
        <h2 className="font-semibold text-sand-900 mb-5">Sessions per month</h2>
        <div className="flex items-end gap-3 h-40">
          {sessionData.map(d => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-xs text-sand-400">{d.sessions}</span>
              <div
                className="w-full bg-sage-500 rounded-t-lg transition-all hover:bg-sage-600"
                style={{ height: `${(d.sessions / maxSessions) * 120}px` }}
              />
              <span className="text-xs text-sand-500">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Session types */}
        <div className="card p-6">
          <h2 className="font-semibold text-sand-900 mb-5">Session types</h2>
          <div className="space-y-3">
            {sessionTypes.map(s => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-sand-700">{s.label}</span>
                  <span className="text-sand-400">{s.count} · {Math.round((s.count / totalSessions) * 100)}%</span>
                </div>
                <div className="h-2 bg-sand-100 rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full transition-all`} style={{ width: `${(s.count / totalSessions) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top presenting issues */}
        <div className="card p-6">
          <h2 className="font-semibold text-sand-900 mb-5">Top presenting issues</h2>
          <div className="space-y-3">
            {topIssues.map(issue => (
              <div key={issue.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-sand-700">{issue.label}</span>
                  <span className="text-sand-400">{issue.count} clients</span>
                </div>
                <div className="h-2 bg-sand-100 rounded-full overflow-hidden">
                  <div className="h-full bg-warm-400 rounded-full transition-all" style={{ width: `${(issue.count / maxIssue) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attachment style breakdown */}
      <div className="card p-6">
        <h2 className="font-semibold text-sand-900 mb-5">Client attachment styles</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { style: 'Anxious', count: 8, emoji: '🌊', color: 'bg-blue-50 border-blue-200 text-blue-700' },
            { style: 'Avoidant', count: 5, emoji: '🏔️', color: 'bg-purple-50 border-purple-200 text-purple-700' },
            { style: 'Fearful-avoidant', count: 4, emoji: '🌪️', color: 'bg-orange-50 border-orange-200 text-orange-700' },
            { style: 'Secure', count: 3, emoji: '🌿', color: 'bg-sage-50 border-sage-200 text-sage-700' },
          ].map(s => (
            <div key={s.style} className={`border rounded-xl p-4 text-center ${s.color}`}>
              <div className="text-2xl mb-2">{s.emoji}</div>
              <p className="text-xl font-semibold">{s.count}</p>
              <p className="text-xs font-medium mt-1">{s.style}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
