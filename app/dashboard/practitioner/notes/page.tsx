'use client'
import { useState } from 'react'

type NoteType = 'session' | 'observation' | 'risk' | 'progress' | 'referral' | 'admin'

interface Note {
  id: string
  clientName: string
  noteType: NoteType
  content: string
  tags: string[]
  followUpDate: string
  createdAt: string
  isConfidential: boolean
}

const noteTypes: { value: NoteType; label: string; icon: string }[] = [
  { value: 'session', label: 'Session note', icon: '📋' },
  { value: 'observation', label: 'Observation', icon: '👁️' },
  { value: 'risk', label: 'Risk flag', icon: '⚠️' },
  { value: 'progress', label: 'Progress note', icon: '📈' },
  { value: 'referral', label: 'Referral note', icon: '🔗' },
  { value: 'admin', label: 'Admin', icon: '🗂️' },
]

const noteTypeColors: Record<NoteType, string> = {
  session: 'badge-sage',
  observation: 'badge-sand',
  risk: 'badge bg-red-50 text-red-700 border border-red-200',
  progress: 'badge bg-green-50 text-green-700 border border-green-200',
  referral: 'badge bg-blue-50 text-blue-700 border border-blue-200',
  admin: 'badge badge-sand',
}

const sessionTemplates: Record<NoteType, string> = {
  session: `SESSION SUMMARY
Date: ${new Date().toLocaleDateString('en-ZA')}
Client: 
Session type: 

PRESENTING CONCERNS:


INTERVENTIONS USED:


CLIENT RESPONSE:


HOMEWORK / TASKS ASSIGNED:


NEXT SESSION FOCUS:


FOLLOW-UP REQUIRED: Yes / No`,
  observation: `CLINICAL OBSERVATION
Date: ${new Date().toLocaleDateString('en-ZA')}
Client: 

OBSERVATION:


CONTEXT:


CLINICAL SIGNIFICANCE:


ACTION REQUIRED:`,
  risk: `⚠️ RISK ASSESSMENT NOTE
Date: ${new Date().toLocaleDateString('en-ZA')}
Client: 
Risk level: Low / Medium / High / Critical

RISK FACTORS IDENTIFIED:


PROTECTIVE FACTORS:


SAFETY PLAN DISCUSSED:


ACTIONS TAKEN:


REVIEW DATE:`,
  progress: `PROGRESS NOTE
Date: ${new Date().toLocaleDateString('en-ZA')}
Client: 
Sessions completed: 

GOALS AT INTAKE:


CURRENT PROGRESS:


CHALLENGES REMAINING:


REVISED TREATMENT DIRECTION:`,
  referral: `REFERRAL NOTE
Date: ${new Date().toLocaleDateString('en-ZA')}
Client: 
Referred to: 
Reason for referral: 

BACKGROUND CONTEXT:


INFORMATION SHARED WITH REFERRAL:


CLIENT CONSENT: Yes / No
Follow-up plan:`,
  admin: `ADMIN NOTE
Date: ${new Date().toLocaleDateString('en-ZA')}
Client: 

NOTES:


ACTION ITEMS:`,
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [showForm, setShowForm] = useState(false)
  const [noteType, setNoteType] = useState<NoteType>('session')
  const [clientName, setClientName] = useState('')
  const [content, setContent] = useState(sessionTemplates.session)
  const [tags, setTags] = useState('')
  const [followUpDate, setFollowUpDate] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<NoteType | 'all'>('all')

  function handleTypeChange(type: NoteType) {
    setNoteType(type)
    setContent(sessionTemplates[type])
  }

  function saveNote() {
    if (!content.trim() || !clientName.trim()) return
    const note: Note = {
      id: crypto.randomUUID(),
      clientName,
      noteType,
      content,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      followUpDate,
      createdAt: new Date().toISOString(),
      isConfidential: true,
    }
    setNotes(prev => [note, ...prev])
    setShowForm(false)
    setClientName(''); setContent(sessionTemplates.session); setTags(''); setFollowUpDate('')
  }

  const filtered = notes
    .filter(n => filterType === 'all' || n.noteType === filterType)
    .filter(n => !searchTerm || n.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || n.content.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-sand-900 mb-1">Session Notes</h1>
          <p className="text-sand-400 text-sm">Confidential clinical notes, risk flags, and progress tracking.</p>
        </div>
        <button onClick={() => setShowForm(s => !s)} className="btn-primary text-sm">
          {showForm ? '✕ Cancel' : '+ New note'}
        </button>
      </div>

      {/* New note form */}
      {showForm && (
        <div className="card p-6 border-sage-300">
          <h2 className="font-semibold text-sand-900 mb-4">New clinical note</h2>
          
          <div className="flex gap-2 flex-wrap mb-5">
            {noteTypes.map(nt => (
              <button key={nt.value} onClick={() => handleTypeChange(nt.value)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${noteType === nt.value ? 'bg-sage-600 text-white border-sage-600' : 'bg-white text-sand-500 border-sand-200'}`}>
                {nt.icon} {nt.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Client name *</label>
              <input className="input" placeholder="Client full name" value={clientName} onChange={e => setClientName(e.target.value)} />
            </div>
            <div>
              <label className="label">Follow-up date</label>
              <input className="input" type="date" value={followUpDate} onChange={e => setFollowUpDate(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Tags (comma separated)</label>
              <input className="input" placeholder="anxiety, couples, trauma, boundary-work…" value={tags} onChange={e => setTags(e.target.value)} />
            </div>
          </div>

          <div className="mb-4">
            <label className="label">Note content</label>
            <textarea
              className="textarea w-full font-mono text-xs min-h-[280px] leading-relaxed"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-sand-400 flex items-center gap-1">
              🔒 This note is confidential and only visible to the practitioner.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowForm(false)} className="btn-ghost text-sm">Cancel</button>
              <button onClick={saveNote} className="btn-primary text-sm">Save note</button>
            </div>
          </div>
        </div>
      )}

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input className="input flex-1" placeholder="Search notes by client or content…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilterType('all')} className={`text-xs px-3 py-1.5 rounded-full border ${filterType === 'all' ? 'bg-sage-600 text-white border-sage-600' : 'bg-white text-sand-500 border-sand-200'}`}>All</button>
          {noteTypes.map(nt => (
            <button key={nt.value} onClick={() => setFilterType(nt.value)}
              className={`text-xs px-3 py-1.5 rounded-full border ${filterType === nt.value ? 'bg-sage-600 text-white border-sage-600' : 'bg-white text-sand-500 border-sand-200'}`}>
              {nt.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Notes list */}
      {filtered.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-3xl mb-3">📋</p>
          <p className="text-sand-500 text-sm">No notes yet. Create your first clinical note.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(note => (
            <details key={note.id} className="card overflow-hidden group">
              <summary className="p-5 cursor-pointer list-none flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 font-semibold text-xs shrink-0">
                  {note.clientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-sand-900 text-sm">{note.clientName}</p>
                    <span className={`badge text-xs ${noteTypeColors[note.noteType]}`}>
                      {noteTypes.find(nt => nt.value === note.noteType)?.label}
                    </span>
                    {note.noteType === 'risk' && <span className="badge bg-red-100 text-red-700 border border-red-200 text-xs">⚠️ Risk</span>}
                  </div>
                  <div className="flex gap-3 text-xs text-sand-400">
                    <span>{new Date(note.createdAt).toLocaleDateString('en-ZA')}</span>
                    {note.followUpDate && <span>Follow-up: {new Date(note.followUpDate).toLocaleDateString('en-ZA')}</span>}
                  </div>
                  {note.tags.length > 0 && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {note.tags.map(tag => <span key={tag} className="badge badge-sand text-xs">{tag}</span>)}
                    </div>
                  )}
                </div>
                <span className="text-sand-400 text-xs group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="border-t border-sand-100 p-5 bg-sand-50">
                <pre className="text-xs text-sand-700 font-mono whitespace-pre-wrap leading-relaxed">{note.content}</pre>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  )
}
