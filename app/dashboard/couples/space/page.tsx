'use client'
import { useState } from 'react'

const checkinTypes = [
  { value: 'daily', label: 'Daily check-in', icon: '☀️', questions: [
    'On a scale of 1–10, how emotionally present am I feeling today?',
    'One thing I\'m carrying today that I haven\'t shared:',
    'One thing I appreciate about my partner right now:',
    'One thing I need from them today:',
  ]},
  { value: 'conflict', label: 'After a conflict', icon: '🌧️', questions: [
    'What I was feeling when this started (beneath the anger or hurt):',
    'What I needed that I didn\'t ask for clearly:',
    'What my partner may have been feeling that I dismissed:',
    'What I\'m willing to own in how this escalated:',
    'What I need to feel safe to reconnect:',
  ]},
  { value: 'gratitude', label: 'Gratitude ritual', icon: '✨', questions: [
    'One specific thing my partner did this week that meant something to me:',
    'A quality in them I don\'t say out loud enough:',
    'A moment this week I\'m grateful we shared:',
    'Something I want them to know I see in them:',
  ]},
  { value: 'intimacy', label: 'Intimacy check-in', icon: '💫', questions: [
    'How emotionally connected have I felt to my partner this week?',
    'What helps me feel most seen and loved in this relationship:',
    'Something I\'ve been wanting to share but haven\'t found the moment:',
    'What I need more of to feel truly close right now:',
  ]},
  { value: 'goals', label: 'Relationship goals', icon: '🌱', questions: [
    'One thing I want us to work on together this month:',
    'One habit I want to cultivate in how I show up for my partner:',
    'What I\'m most hopeful about in our relationship right now:',
    'One thing I commit to doing differently this week:',
  ]},
]

const couplesTasks = [
  {
    title: 'The 36 questions',
    desc: 'Arthur Aron\'s closeness-building questions. Take turns — answer honestly.',
    duration: '60–90 min',
    category: 'intimacy',
    steps: [
      'Find a quiet, uninterrupted space together.',
      'Take turns reading and answering each question — no skipping.',
      'Listen without interrupting. Ask follow-up questions with curiosity.',
      'After all 36, share how the exercise felt for each of you.',
    ]
  },
  {
    title: 'Conflict autopsy',
    desc: 'Revisit a past conflict together — not to relitigate, but to understand.',
    duration: '45 min',
    category: 'communication',
    steps: [
      'Choose a conflict that has been resolved — not a fresh one.',
      'Each person shares: "What I was feeling beneath my reaction."',
      'Each person shares: "What I needed that I didn\'t communicate."',
      'Together, identify: "What pattern do we want to change?"',
      'Agree on one concrete shift each person will make.',
    ]
  },
  {
    title: 'Love languages audit',
    desc: 'Understand how you each give and receive love — and the gap between them.',
    duration: '30 min',
    category: 'intimacy',
    steps: [
      'Each partner privately writes their top 2 love languages and why.',
      'Share your lists — no judgment, just curiosity.',
      'Identify where your giving and their receiving don\'t match.',
      'Each partner commits to one action in their partner\'s love language this week.',
    ]
  },
  {
    title: 'Shared vision mapping',
    desc: 'Build a shared picture of where you want to go — together.',
    duration: '60 min',
    category: 'goals',
    steps: [
      'Independently write: "In 3 years, our relationship looks like..."',
      'Share your visions. Note: what aligns? What differs?',
      'Discuss the differences with curiosity, not defensiveness.',
      'Write 3 shared intentions you both commit to.',
    ]
  },
]

export default function CouplesSpacePage() {
  const [selectedCheckin, setSelectedCheckin] = useState(checkinTypes[0])
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [partnerCode, setPartnerCode] = useState('')

  return (
    <div className="space-y-8 animate-slide-up">
      <div>
        <h1 className="font-display text-3xl text-sand-900 mb-1">Couples Space</h1>
        <p className="text-sand-400 text-sm">A shared container for honest connection, conflict repair, and intentional growth.</p>
      </div>

      {/* Partner connect */}
      <div className="card p-5 bg-sage-50 border-sage-200">
        <h2 className="font-semibold text-sage-800 mb-2 text-sm">Connect with your partner</h2>
        <p className="text-xs text-sage-600 mb-3">Share your couple code with your partner so they can join your shared space.</p>
        <div className="flex gap-3 items-center">
          <div className="bg-white border border-sage-300 rounded-xl px-4 py-2 font-mono text-sm text-sage-800 tracking-widest">
            GBNW-XXXX
          </div>
          <span className="text-sand-400 text-xs">or</span>
          <input className="input flex-1" placeholder="Enter partner's code" value={partnerCode} onChange={e => setPartnerCode(e.target.value)} />
          <button className="btn-primary text-sm py-2">Connect</button>
        </div>
      </div>

      {/* Check-in */}
      <div className="card p-6">
        <h2 className="font-semibold text-sand-900 mb-4">Couples check-in</h2>
        <div className="flex gap-2 flex-wrap mb-5">
          {checkinTypes.map(ct => (
            <button key={ct.value} onClick={() => { setSelectedCheckin(ct); setResponses({}) }}
              className={`text-sm px-3 py-1.5 rounded-full border transition-all ${selectedCheckin.value === ct.value ? 'bg-sage-600 text-white border-sage-600' : 'bg-white text-sand-600 border-sand-200 hover:border-sage-300'}`}>
              {ct.icon} {ct.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {selectedCheckin.questions.map((q, i) => (
            <div key={i}>
              <label className="text-xs font-medium text-sand-600 mb-1.5 block leading-relaxed">{q}</label>
              <textarea
                className="textarea w-full min-h-[80px]"
                placeholder="Your honest answer…"
                value={responses[`q${i}`] || ''}
                onChange={e => setResponses(prev => ({ ...prev, [`q${i}`]: e.target.value }))}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4 justify-end">
          <button className="btn-secondary text-sm">Save privately</button>
          <button className="btn-primary text-sm">Share with partner</button>
        </div>
      </div>

      {/* Couples tasks */}
      <div>
        <h2 className="font-semibold text-sand-900 mb-4">Therapeutic exercises for two</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {couplesTasks.map(task => (
            <div key={task.title} className="card-hover p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-sand-900 text-sm mb-1">{task.title}</p>
                  <p className="text-xs text-sand-400 leading-relaxed">{task.desc}</p>
                </div>
                <span className="badge badge-sage text-xs shrink-0 ml-2">{task.duration}</span>
              </div>
              <details className="group">
                <summary className="text-xs text-sage-600 cursor-pointer hover:text-sage-700 font-medium list-none flex items-center gap-1">
                  <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
                  View steps
                </summary>
                <ol className="mt-3 space-y-2">
                  {task.steps.map((step, i) => (
                    <li key={i} className="flex gap-2 text-xs text-sand-600 leading-relaxed">
                      <span className="shrink-0 text-sage-500 font-medium">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </details>
              <button className="mt-3 btn-secondary text-xs py-1.5">+ Add to our tasks</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
