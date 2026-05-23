'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

const prompts = {
  accountability: [
    'What behaviour or pattern am I ready to take ownership of today?',
    'What excuse have I been making that I need to retire?',
    'Where have I let someone down, and what would genuine accountability look like?',
    'What part of this conflict belongs to me?',
    'If I couldn\'t blame anyone else, what would I say to myself?',
  ],
  closure: [
    'What do I need to say to this person that I\'ve been holding inside?',
    'What did this relationship teach me about myself?',
    'What am I grieving that I haven\'t given myself permission to grieve?',
    'What would forgiveness — not condoning, but releasing — feel like?',
    'What do I need to let go of to move forward with integrity?',
  ],
  self_discovery: [
    'What emotion am I avoiding right now, and why?',
    'What do I know to be true about myself that I don\'t yet believe?',
    'What would the most loving version of me say about this situation?',
    'What story am I telling myself that may not be entirely true?',
    'Where did I first learn to respond to conflict in the way I do?',
  ],
  gratitude: [
    'What three things — however small — can I genuinely be grateful for today?',
    'Who in my life shows up for me in quiet ways I sometimes overlook?',
    'What about my past am I grateful for, even if it was painful?',
    'What strength have I developed that hard times gave me?',
    'What moment from this week deserves to be honoured?',
  ],
}

const moodMap: Record<number, { emoji: string; label: string; color: string }> = {
  1: { emoji: '😔', label: 'Very low', color: 'bg-blue-100 text-blue-700' },
  2: { emoji: '😟', label: 'Low', color: 'bg-blue-50 text-blue-600' },
  3: { emoji: '😕', label: 'A bit down', color: 'bg-indigo-50 text-indigo-600' },
  4: { emoji: '😐', label: 'Meh', color: 'bg-gray-100 text-gray-600' },
  5: { emoji: '🙂', label: 'Okay', color: 'bg-yellow-50 text-yellow-700' },
  6: { emoji: '😊', label: 'Alright', color: 'bg-yellow-100 text-yellow-700' },
  7: { emoji: '😁', label: 'Good', color: 'bg-green-50 text-green-700' },
  8: { emoji: '😄', label: 'Really good', color: 'bg-green-100 text-green-700' },
  9: { emoji: '🤩', label: 'Great', color: 'bg-sage-50 text-sage-700' },
  10: { emoji: '✨', label: 'Thriving', color: 'bg-sage-100 text-sage-700' },
}

export default function JournalPage() {
  const [category, setCategory] = useState<keyof typeof prompts>('accountability')
  const [selectedPrompt, setSelectedPrompt] = useState(prompts.accountability[0])
  const [content, setContent] = useState('')
  const [mood, setMood] = useState(5)
  const [shareWithPractitioner, setShareWithPractitioner] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    if (!content.trim()) return
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('journal_entries').insert({
        user_id: user.id,
        content,
        mood,
        mood_label: moodMap[mood]?.label,
        prompt_used: selectedPrompt,
        tags: [category],
        shared_with_practitioner: shareWithPractitioner,
        is_private: true,
      })
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
    setSaving(false)
    setContent('')
  }

  function pickRandomPrompt() {
    const list = prompts[category]
    setSelectedPrompt(list[Math.floor(Math.random() * list.length)])
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
      <div>
        <h1 className="font-display text-3xl text-sand-900 mb-1">Reflection Journal</h1>
        <p className="text-sand-400 text-sm">A private space to process, understand, and grow.</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {Object.keys(prompts).map(cat => (
          <button key={cat} onClick={() => { setCategory(cat as keyof typeof prompts); setSelectedPrompt(prompts[cat as keyof typeof prompts][0]) }}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all capitalize ${category === cat ? 'bg-sage-600 text-white border-sage-600' : 'bg-white text-sand-600 border-sand-200 hover:border-sage-300'}`}>
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Prompt */}
      <div className="card p-5 border-l-4 border-l-sage-400">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sage-600 text-xs uppercase tracking-widest font-medium mb-2">Today&apos;s prompt</p>
            <p className="font-display text-base text-sand-800 leading-relaxed italic">&ldquo;{selectedPrompt}&rdquo;</p>
          </div>
          <button onClick={pickRandomPrompt} className="text-sand-400 hover:text-sage-600 transition-colors text-sm shrink-0">↻</button>
        </div>
      </div>

      {/* Writing area */}
      <div className="card p-5">
        <label className="label">Your reflection</label>
        <textarea
          className="textarea w-full min-h-[220px]"
          placeholder="Begin writing — this is your space. No judgment, no performance. Just honesty."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <p className="text-xs text-sand-300 mt-1 text-right">{content.length} characters</p>
      </div>

      {/* Mood */}
      <div className="card p-5">
        <label className="label">How am I feeling right now?</label>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{moodMap[mood]?.emoji}</span>
          <input type="range" min={1} max={10} value={mood} onChange={e => setMood(Number(e.target.value))} className="flex-1 accent-sage-600" />
          <span className={`badge text-xs ${moodMap[mood]?.color}`}>{moodMap[mood]?.label}</span>
        </div>
      </div>

      {/* Options */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={shareWithPractitioner} onChange={e => setShareWithPractitioner(e.target.checked)} className="accent-sage-600" />
          <span className="text-sm text-sand-600">Share with my practitioner</span>
        </label>
        <div className="flex gap-3">
          {saved && <span className="text-sage-600 text-sm flex items-center gap-1">✓ Saved</span>}
          <button onClick={handleSave} disabled={saving || !content.trim()} className="btn-primary">
            {saving ? 'Saving…' : 'Save entry'}
          </button>
        </div>
      </div>
    </div>
  )
}
