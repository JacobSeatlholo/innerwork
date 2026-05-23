'use client'
import { useState } from 'react'

type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
type SessionType = 'individual' | 'couples' | 'group' | 'crisis' | 'follow_up'

interface MockBooking {
  id: string
  clientName: string
  clientEmail: string
  sessionType: SessionType
  status: BookingStatus
  scheduledAt: string
  duration: number
  location: string
  amount: number
  paid: boolean
  notes: string
  invoiceRef: string
}

const mockBookings: MockBooking[] = [
  { id: '1', clientName: 'Sample Client A', clientEmail: 'client.a@example.com', sessionType: 'individual', status: 'confirmed', scheduledAt: new Date(Date.now() + 86400000).toISOString(), duration: 60, location: 'in_person', amount: 850, paid: true, notes: '', invoiceRef: 'INV-001' },
  { id: '2', clientName: 'Sample Couple B', clientEmail: 'couple.b@example.com', sessionType: 'couples', status: 'pending', scheduledAt: new Date(Date.now() + 172800000).toISOString(), duration: 90, location: 'virtual', amount: 1200, paid: false, notes: 'First session', invoiceRef: 'INV-002' },
]

const statusColors: Record<BookingStatus, string> = {
  pending: 'badge-pending',
  confirmed: 'badge-sage',
  completed: 'badge-completed',
  cancelled: 'badge-cancelled',
  no_show: 'badge bg-gray-100 text-gray-600 border border-gray-200',
}

const sessionTypeLabels: Record<SessionType, string> = {
  individual: 'Individual',
  couples: 'Couples',
  group: 'Group',
  crisis: 'Crisis',
  follow_up: 'Follow-up',
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState(mockBookings)
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all')
  const [showForm, setShowForm] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [newNote, setNewNote] = useState<Record<string, string>>({})

  // New booking form state
  const [form, setForm] = useState({
    clientName: '', clientEmail: '', sessionType: 'individual' as SessionType,
    scheduledAt: '', duration: 60, location: 'in_person',
    amount: 850, notes: '', invoiceRef: ''
  })

  function addBooking() {
    if (!form.clientName || !form.scheduledAt) return
    const booking: MockBooking = {
      id: crypto.randomUUID(),
      ...form,
      status: 'pending',
      paid: false,
    }
    setBookings(prev => [booking, ...prev])
    setShowForm(false)
    setForm({ clientName: '', clientEmail: '', sessionType: 'individual', scheduledAt: '', duration: 60, location: 'in_person', amount: 850, notes: '', invoiceRef: '' })
  }

  function updateStatus(id: string, status: BookingStatus) {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  function togglePaid(id: string) {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, paid: !b.paid } : b))
  }

  function saveNote(id: string) {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, notes: newNote[id] || '' } : b))
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-sand-900 mb-1">Bookings</h1>
          <p className="text-sand-400 text-sm">Manage sessions, track payments, and record notes.</p>
        </div>
        <button onClick={() => setShowForm(s => !s)} className="btn-primary text-sm">
          {showForm ? '✕ Cancel' : '+ New booking'}
        </button>
      </div>

      {/* New booking form */}
      {showForm && (
        <div className="card p-6 border-sage-300 bg-sage-50/50">
          <h2 className="font-semibold text-sand-900 mb-4">New booking</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Client name *</label>
              <input className="input" placeholder="Full name" value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} />
            </div>
            <div>
              <label className="label">Client email</label>
              <input className="input" type="email" placeholder="client@example.com" value={form.clientEmail} onChange={e => setForm(f => ({ ...f, clientEmail: e.target.value }))} />
            </div>
            <div>
              <label className="label">Session type</label>
              <select className="input" value={form.sessionType} onChange={e => setForm(f => ({ ...f, sessionType: e.target.value as SessionType }))}>
                <option value="individual">Individual</option>
                <option value="couples">Couples</option>
                <option value="group">Group</option>
                <option value="crisis">Crisis</option>
                <option value="follow_up">Follow-up</option>
              </select>
            </div>
            <div>
              <label className="label">Date & time *</label>
              <input className="input" type="datetime-local" value={form.scheduledAt} onChange={e => setForm(f => ({ ...f, scheduledAt: e.target.value }))} />
            </div>
            <div>
              <label className="label">Duration (minutes)</label>
              <select className="input" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: Number(e.target.value) }))}>
                <option value={30}>30 min</option>
                <option value={60}>60 min</option>
                <option value={90}>90 min</option>
                <option value={120}>120 min</option>
              </select>
            </div>
            <div>
              <label className="label">Location</label>
              <select className="input" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}>
                <option value="in_person">In person</option>
                <option value="virtual">Virtual</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="label">Amount (R)</label>
              <input className="input" type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="label">Invoice reference</label>
              <input className="input" placeholder="INV-001" value={form.invoiceRef} onChange={e => setForm(f => ({ ...f, invoiceRef: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Pre-session notes</label>
              <textarea className="textarea" placeholder="Context, concerns, goals for this session…" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-3 mt-4 justify-end">
            <button onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
            <button onClick={addBooking} className="btn-primary">Create booking</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all capitalize ${filter === f ? 'bg-sage-600 text-white border-sage-600' : 'bg-white text-sand-500 border-sand-200 hover:border-sand-300'}`}>
            {f === 'all' ? `All (${bookings.length})` : `${f} (${bookings.filter(b => b.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Booking list */}
      <div className="space-y-3">
        {filtered.map(booking => (
          <div key={booking.id} className="card overflow-hidden">
            <div className="p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 font-semibold text-sm shrink-0">
                {booking.clientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-semibold text-sand-900 text-sm">{booking.clientName}</p>
                  <span className={`badge text-xs ${statusColors[booking.status]}`}>{booking.status}</span>
                  <span className="badge badge-sand text-xs">{sessionTypeLabels[booking.sessionType]}</span>
                  {!booking.paid && <span className="badge bg-red-50 text-red-600 border border-red-200 text-xs">Unpaid</span>}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-sand-400">
                  <span>📅 {new Date(booking.scheduledAt).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                  <span>⏱ {booking.duration} min</span>
                  <span>📍 {booking.location.replace('_', ' ')}</span>
                  <span>💰 R{booking.amount.toLocaleString()}</span>
                  {booking.invoiceRef && <span>🧾 {booking.invoiceRef}</span>}
                </div>
              </div>
              <button onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)} className="text-sand-400 hover:text-sand-700 text-xs shrink-0">
                {expandedId === booking.id ? '▲' : '▼'}
              </button>
            </div>

            {expandedId === booking.id && (
              <div className="border-t border-sand-100 p-5 bg-sand-50 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {(['pending', 'confirmed', 'completed', 'cancelled', 'no_show'] as BookingStatus[]).map(s => (
                    <button key={s} onClick={() => updateStatus(booking.id, s)}
                      className={`text-xs px-3 py-1 rounded-full border transition-all capitalize ${booking.status === s ? 'bg-sage-600 text-white border-sage-600' : 'bg-white text-sand-500 border-sand-200 hover:border-sage-300'}`}>
                      {s.replace('_', ' ')}
                    </button>
                  ))}
                  <button onClick={() => togglePaid(booking.id)}
                    className={`text-xs px-3 py-1 rounded-full border transition-all ${booking.paid ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-50 text-red-600 border-red-200'}`}>
                    {booking.paid ? '✓ Paid' : 'Mark paid'}
                  </button>
                </div>
                <div>
                  <label className="label">Session notes (private)</label>
                  <textarea
                    className="textarea w-full min-h-[100px]"
                    placeholder="Clinical observations, interventions used, follow-up plan…"
                    defaultValue={booking.notes}
                    onChange={e => setNewNote(prev => ({ ...prev, [booking.id]: e.target.value }))}
                  />
                  <button onClick={() => saveNote(booking.id)} className="text-xs text-sage-600 mt-1 hover:underline">Save notes</button>
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="card p-10 text-center">
            <p className="text-3xl mb-3">📅</p>
            <p className="text-sand-500 text-sm">No bookings found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
