'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

const docTypes = [
  { value: 'letter', label: 'Closure letter', icon: '💌', desc: 'Say what was never said.' },
  { value: 'forgiveness', label: 'Forgiveness letter', icon: '🕊️', desc: 'Release, not condone.' },
  { value: 'apology', label: 'Apology', icon: '🙏', desc: 'Own it with sincerity.' },
  { value: 'boundary_statement', label: 'Boundary statement', icon: '🛡️', desc: 'Define what you will no longer accept.' },
  { value: 'goodbye', label: 'Goodbye letter', icon: '🌅', desc: 'Honour what was and release it.' },
  { value: 'gratitude_letter', label: 'Gratitude letter', icon: '✨', desc: 'Acknowledge what someone gave you.' },
  { value: 'affirmation', label: 'Self-affirmation', icon: '🌿', desc: 'A letter to yourself.' },
]

const guidedFrameworks: Record<string, string[]> = {
  letter: [
    'Dear [name], I\'ve been carrying this for a long time, and I need to finally say...',
    'What I never got to tell you is...',
    'The part that hurt most was not just what happened, but...',
    'What I needed from you — and didn\'t get — was...',
    'I am choosing to close this chapter because...',
    'I release you from the power you\'ve had over my peace. And I release myself too.',
  ],
  forgiveness: [
    'I am not writing this to excuse what happened. I am writing it to free myself from...',
    'The harm done was real. And I no longer want to carry it. So I am choosing to...',
    'Forgiveness, for me, means...',
    'I release the weight of this. What I hold onto is...',
  ],
  apology: [
    'I want to be honest about what I did, without excuses:',
    'The impact my actions had on you was...',
    'I understand now that what you needed in that moment was...',
    'I am committed to changing by...',
    'I do not ask for forgiveness. I only ask that you know I mean this sincerely.',
  ],
  boundary_statement: [
    'I am writing this to be clear with myself — and with you — about what I will no longer accept:',
    'In the past, I have allowed... and the cost to my wellbeing has been...',
    'Going forward, I will not...',
    'If this boundary is crossed, I will...',
    'This is not punishment. This is self-respect.',
  ],
  goodbye: [
    'What we had was real. And now it is time to...',
    'I want to honour what this relationship gave me:',
    'I want to acknowledge what it cost me:',
    'As I close this chapter, what I carry forward is...',
    'Goodbye. I wish you well.',
  ],
  gratitude_letter: [
    'I want to tell you what you may not know you gave me:',
    'Because of you, I learned...',
    'Your presence in my life shifted something in me — specifically...',
    'Thank you for showing up when...',
    'I carry you with me in the way that...',
  ],
  affirmation: [
    'Dear [your name],',
    'I want you to know that what you\'ve been through was real, and it was hard.',
    'You are not the same person who began this journey. You have...',
    'I am proud of you for...',
    'What I want you to remember is...',
    'You are allowed to take up space. You are allowed to be loved. You are allowed to heal.',
  ],
}

export default function ClosurePage() {
  const [docType, setDocType] = useState('letter')
  const [recipient, setRecipient] = useState('')
  const [content, setContent] = useState('')
  const [useGuide, setUseGuide] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const framework = guidedFrameworks[docType] || []

  function insertPrompt(line: string) {
    setContent(prev => prev + (prev ? '\n\n' : '') + line + ' ')
  }

  async function handleSave() {
    if (!content.trim()) return
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('closure_documents').insert({
        user_id: user.id,
        recipient_name: recipient || null,
        document_type: docType,
        content,
      })
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
    setSaving(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
      <div>
        <h1 className="font-display text-3xl text-sand-900 mb-1">Closure Letters</h1>
        <p className="text-sand-400 text-sm">Say what you could never say. Healing often begins with words that are finally written.</p>
      </div>

      {/* Type selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {docTypes.map(dt => (
          <button key={dt.value} onClick={() => setDocType(dt.value)}
            className={`card p-3 text-left transition-all ${docType === dt.value ? 'border-sage-400 bg-sage-50 shadow-sm' : 'hover:border-sand-300'}`}>
            <div className="text-xl mb-1">{dt.icon}</div>
            <p className="text-xs font-medium text-sand-900 leading-tight">{dt.label}</p>
            <p className="text-xs text-sand-400 mt-0.5 leading-tight">{dt.desc}</p>
          </button>
        ))}
      </div>

      {/* Recipient */}
      <div>
        <label className="label">To (optional — or write "To myself")</label>
        <input className="input" placeholder="Their name, or leave blank" value={recipient} onChange={e => setRecipient(e.target.value)} />
      </div>

      {/* Guided framework toggle */}
      <div className="flex items-center gap-3">
        <button onClick={() => setUseGuide(g => !g)} className={`text-sm border rounded-lg px-3 py-1.5 transition-all ${useGuide ? 'bg-sage-600 text-white border-sage-600' : 'bg-white text-sand-600 border-sand-200'}`}>
          {useGuide ? '✓ Guide active' : '✦ Use guided framework'}
        </button>
        <span className="text-xs text-sand-400">Get sentence starters to help you begin</span>
      </div>

      {useGuide && (
        <div className="card p-5 bg-sand-50">
          <p className="text-xs text-sand-500 uppercase tracking-widest font-medium mb-3">Guided prompts — click to insert</p>
          <div className="space-y-2">
            {framework.map((line, i) => (
              <button key={i} onClick={() => insertPrompt(line)}
                className="w-full text-left text-xs text-sand-600 hover:text-sage-700 hover:bg-sage-50 px-3 py-2 rounded-lg transition-all border border-sand-200 hover:border-sage-200">
                {line}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Writing area */}
      <div>
        <label className="label">Your letter</label>
        <textarea
          className="textarea w-full min-h-[280px] font-display text-base leading-relaxed"
          placeholder="Begin here. There are no wrong words — only yours."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>

      {/* Important note */}
      <div className="bg-warm-50 border border-warm-200 rounded-xl p-4">
        <p className="text-xs text-warm-700 leading-relaxed">
          <strong>A gentle note:</strong> These letters are for your healing first. You choose whether they are ever shared. 
          Writing something does not obligate you to send it. Your practitioner can help you decide.
        </p>
      </div>

      <div className="flex items-center justify-between">
        {saved && <span className="text-sage-600 text-sm">✓ Saved to your space</span>}
        <div className="flex gap-3 ml-auto">
          <button onClick={handleSave} disabled={saving || !content.trim()} className="btn-primary">
            {saving ? 'Saving…' : 'Save letter'}
          </button>
        </div>
      </div>
    </div>
  )
}
