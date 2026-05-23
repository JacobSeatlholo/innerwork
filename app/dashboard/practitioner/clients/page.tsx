'use client'
import { useState } from 'react'
import Link from 'next/link'

interface Client {
  id: string
  name: string
  email: string
  phone: string
  joinedAt: string
  lastSession: string
  sessionCount: number
  attachmentStyle: string
  status: 'active' | 'paused' | 'completed'
  tags: string[]
  notes: string
}

const mockClients: Client[] = [
  { id: '1', name: 'Sample Client A', email: 'client.a@example.com', phone: '+27 82 000 0001', joinedAt: '2026-01-15', lastSession: '2026-05-10', sessionCount: 8, attachmentStyle: 'anxious', status: 'active', tags: ['trauma', 'relationship', 'anxiety'], notes: 'Working through early relational patterns.' },
  { id: '2', name: 'Sample Couple B & C', email: 'couple.b@example.com', phone: '+27 82 000 0002', joinedAt: '2026-03-01', lastSession: '2026-05-15', sessionCount: 4, attachmentStyle: 'fearful_avoidant', status: 'active', tags: ['couples', 'conflict', 'communication'], notes: 'Couples work — conflict de-escalation focus.' },
]

const attachmentColors: Record<string, string> = {
  secure: 'badge-sage',
  anxious: 'badge bg-blue-50 text-blue-700 border border-blue-200',
  avoidant: 'badge bg-purple-50 text-purple-700 border border-purple-200',
  fearful_avoidant: 'badge bg-orange-50 text-orange-700 border border-orange-200',
}

export default function ClientsPage() {
  const [clients, setClients] = useState(mockClients)
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', tags: '', notes: '' })

  function addClient() {
    if (!newClient.name) return
    setClients(prev => [...prev, {
      id: crypto.randomUUID(),
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      joinedAt: new Date().toISOString().split('T')[0],
      lastSession: '',
      sessionCount: 0,
      attachmentStyle: '',
      status: 'active',
      tags: newClient.tags.split(',').map(t => t.trim()).filter(Boolean),
      notes: newClient.notes,
    }])
    setShowAdd(false)
    setNewClient({ name: '', email: '', phone: '', tags: '', notes: '' })
  }

  const filtered = clients.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-sand-900 mb-1">Client Directory</h1>
          <p className="text-sand-400 text-sm">Manage client records, track progress, and access notes.</p>
        </div>
        <button onClick={() => setShowAdd(s => !s)} className="btn-primary text-sm">+ Add client</button>
      </div>

      {showAdd && (
        <div className="card p-6 border-sage-300 bg-sage-50/30">
          <h2 className="font-semibold text-sand-900 mb-4">Add new client</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="label">Full name *</label><input className="input" placeholder="Full name" value={newClient.name} onChange={e => setNewClient(f => ({ ...f, name: e.target.value }))} /></div>
            <div><label className="label">Email</label><input className="input" type="email" placeholder="email@example.com" value={newClient.email} onChange={e => setNewClient(f => ({ ...f, email: e.target.value }))} /></div>
            <div><label className="label">Phone</label><input className="input" placeholder="+27 XX XXX XXXX" value={newClient.phone} onChange={e => setNewClient(f => ({ ...f, phone: e.target.value }))} /></div>
            <div><label className="label">Tags</label><input className="input" placeholder="trauma, couples, anxiety…" value={newClient.tags} onChange={e => setNewClient(f => ({ ...f, tags: e.target.value }))} /></div>
            <div className="md:col-span-2"><label className="label">Initial notes</label><textarea className="textarea" placeholder="Presenting concerns, context…" value={newClient.notes} onChange={e => setNewClient(f => ({ ...f, notes: e.target.value }))} /></div>
          </div>
          <div className="flex gap-3 mt-4 justify-end">
            <button onClick={() => setShowAdd(false)} className="btn-ghost">Cancel</button>
            <button onClick={addClient} className="btn-primary">Save client</button>
          </div>
        </div>
      )}

      <input className="input max-w-sm" placeholder="Search clients…" value={search} onChange={e => setSearch(e.target.value)} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(client => (
          <div key={client.id} className="card-hover p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 font-semibold text-sm shrink-0">
                {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sand-900 text-sm">{client.name}</p>
                <p className="text-xs text-sand-400">{client.email}</p>
                {client.phone && <p className="text-xs text-sand-400">{client.phone}</p>}
              </div>
              <span className={`badge text-xs ${client.status === 'active' ? 'badge-sage' : 'badge-sand'}`}>{client.status}</span>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-sand-400 mb-3">
              <span>📅 {client.sessionCount} sessions</span>
              {client.lastSession && <span>Last: {new Date(client.lastSession).toLocaleDateString('en-ZA')}</span>}
              {client.attachmentStyle && <span className={`badge text-xs ${attachmentColors[client.attachmentStyle] || 'badge-sand'}`}>{client.attachmentStyle.replace('_', '-')}</span>}
            </div>

            {client.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap mb-3">
                {client.tags.map(tag => <span key={tag} className="badge badge-sand text-xs">{tag}</span>)}
              </div>
            )}

            {client.notes && <p className="text-xs text-sand-500 leading-relaxed mb-3 italic">{client.notes}</p>}

            <div className="flex gap-2">
              <Link href="/dashboard/practitioner/notes" className="btn-secondary text-xs py-1.5">View notes</Link>
              <Link href="/dashboard/practitioner/bookings" className="btn-ghost text-xs py-1.5">Book session</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
