'use client'
import { useState } from 'react'

const attachmentQuestions = [
  { id: 'q1', text: 'When I feel emotionally close to someone, I often worry they will leave.', options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q2', text: 'I find it difficult to depend on others or ask for help.', options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q3', text: 'I feel uncomfortable when a partner wants more intimacy than I\'m ready for.', options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q4', text: 'I worry that I care more about the relationship than my partner does.', options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q5', text: 'I tend to pull away when I sense conflict coming.', options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q6', text: 'When someone is distant, I immediately wonder if I did something wrong.', options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q7', text: 'I find it hard to fully trust that someone truly loves me.', options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
  { id: 'q8', text: 'I value my independence to the point where closeness can feel suffocating.', options: ['Never', 'Sometimes', 'Often', 'Almost always'] },
]

const styles = {
  secure: {
    title: 'Secure Attachment',
    emoji: '🌿',
    color: 'bg-sage-50 border-sage-300',
    textColor: 'text-sage-800',
    description: 'You tend to feel comfortable with emotional intimacy and can depend on others without losing yourself. You handle conflict with relative ease and recover well from relational stress.',
    strengths: ['Emotional availability', 'Healthy interdependence', 'Conflict resilience', 'Trust in relationships'],
    growth: ['Continue building communication depth', 'Support partners with different styles', 'Maintain your boundaries even when you feel secure'],
    affirmation: 'Your capacity for secure love is a gift — share it thoughtfully.',
  },
  anxious: {
    title: 'Anxious Attachment',
    emoji: '🌊',
    color: 'bg-blue-50 border-blue-300',
    textColor: 'text-blue-800',
    description: 'You crave deep connection but often fear it won\'t last. This can lead to hypervigilance around signs of rejection, emotional flooding, or people-pleasing to feel safe.',
    strengths: ['Deep empathy', 'Capacity for intense connection', 'Emotional attunement', 'Loyalty'],
    growth: ['Self-soothing practices', 'Recognising anxiety vs. intuition', 'Building secure relationship with self', 'Tolerating uncertainty'],
    affirmation: 'Your longing for love is not weakness — it is the deepest human need, asking to be met safely.',
  },
  avoidant: {
    title: 'Avoidant Attachment',
    emoji: '🏔️',
    color: 'bg-purple-50 border-purple-300',
    textColor: 'text-purple-800',
    description: 'You value independence and may pull away when relationships feel too intense. Vulnerability can feel threatening, which may lead to emotional withdrawal when closeness increases.',
    strengths: ['Emotional regulation', 'Self-sufficiency', 'Clear boundaries', 'Groundedness'],
    growth: ['Expanding emotional vocabulary', 'Practising vulnerability in safe spaces', 'Recognising intimacy as safe', 'Moving toward rather than away from conflict'],
    affirmation: 'Your strength is real — and so is your need for connection. Both can be true.',
  },
  fearful_avoidant: {
    title: 'Fearful-Avoidant Attachment',
    emoji: '🌪️',
    color: 'bg-orange-50 border-orange-300',
    textColor: 'text-orange-800',
    description: 'You both crave and fear closeness — often sending mixed signals to partners. This style often develops from early experiences where love and pain were intertwined.',
    strengths: ['Deep self-awareness potential', 'Capacity for healing', 'Profound empathy', 'Resilience'],
    growth: ['Safety in the nervous system', 'Understanding your triggers', 'Trauma-informed healing', 'Building consistent self-trust'],
    affirmation: 'You didn\'t choose this. But you can, with support, choose what comes next.',
  },
}

function calculateStyle(answers: Record<string, number>): keyof typeof styles {
  const vals = Object.values(answers)
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length
  const q1 = answers.q1 || 0; const q4 = answers.q4 || 0; const q6 = answers.q6 || 0
  const q2 = answers.q2 || 0; const q5 = answers.q5 || 0; const q8 = answers.q8 || 0
  const anxious = (q1 + q4 + q6) / 3
  const avoidant = (q2 + q5 + q8) / 3
  if (anxious > 2 && avoidant > 2) return 'fearful_avoidant'
  if (anxious > 2) return 'anxious'
  if (avoidant > 2) return 'avoidant'
  return 'secure'
}

export default function AssessmentPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<keyof typeof styles | null>(null)
  const [step, setStep] = useState(0)

  const allAnswered = attachmentQuestions.every(q => answers[q.id] !== undefined)
  const current = attachmentQuestions[step]

  function handleAnswer(value: number) {
    const newAnswers = { ...answers, [current.id]: value }
    setAnswers(newAnswers)
    if (step < attachmentQuestions.length - 1) {
      setTimeout(() => setStep(s => s + 1), 300)
    }
  }

  function submit() {
    setResult(calculateStyle(answers))
  }

  function restart() {
    setAnswers({}); setResult(null); setStep(0)
  }

  if (result) {
    const s = styles[result]
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
        <div>
          <h1 className="font-display text-3xl text-sand-900 mb-1">Your Attachment Profile</h1>
          <p className="text-sand-400 text-sm">Based on your responses — this is a starting point, not a label.</p>
        </div>

        <div className={`card p-6 border-2 ${s.color}`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{s.emoji}</span>
            <div>
              <p className="text-xs text-sand-400 uppercase tracking-widest font-medium mb-1">Your attachment style</p>
              <h2 className={`font-display text-2xl ${s.textColor}`}>{s.title}</h2>
            </div>
          </div>
          <p className="text-sand-600 text-sm leading-relaxed mb-4">{s.description}</p>
          <div className="bg-white/70 rounded-xl p-4 border-l-4 border-l-sage-400">
            <p className="font-display text-base text-sand-800 italic">&ldquo;{s.affirmation}&rdquo;</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-5">
            <h3 className="font-semibold text-sand-900 mb-3 text-sm">Your strengths</h3>
            <ul className="space-y-2">
              {s.strengths.map(str => (
                <li key={str} className="flex items-center gap-2 text-sm text-sand-600">
                  <span className="text-sage-500">✦</span>{str}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-sand-900 mb-3 text-sm">Your growth edges</h3>
            <ul className="space-y-2">
              {s.growth.map(g => (
                <li key={g} className="flex items-center gap-2 text-sm text-sand-600">
                  <span className="text-warm-500">→</span>{g}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={restart} className="btn-ghost">Retake assessment</button>
          <a href="/dashboard/bookings" className="btn-primary">Book a session to explore this →</a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-slide-up">
      <div>
        <h1 className="font-display text-3xl text-sand-900 mb-1">Attachment Style Assessment</h1>
        <p className="text-sand-400 text-sm">8 questions · ~3 minutes · Clinically informed</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-sand-200 rounded-full overflow-hidden">
          <div className="h-full bg-sage-500 rounded-full transition-all duration-300" style={{ width: `${(step / attachmentQuestions.length) * 100}%` }} />
        </div>
        <span className="text-xs text-sand-400">{step + 1} / {attachmentQuestions.length}</span>
      </div>

      {/* Question */}
      <div className="card p-8 text-center">
        <p className="text-sand-400 text-xs uppercase tracking-widest mb-4">Question {step + 1}</p>
        <p className="font-display text-xl text-sand-900 leading-relaxed mb-8">{current.text}</p>
        <div className="grid grid-cols-2 gap-3">
          {current.options.map((opt, i) => (
            <button key={opt} onClick={() => handleAnswer(i)}
              className={`p-3 rounded-xl border text-sm font-medium transition-all ${answers[current.id] === i ? 'bg-sage-600 text-white border-sage-600' : 'bg-white text-sand-700 border-sand-200 hover:border-sage-300 hover:bg-sage-50'}`}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {allAnswered && (
        <button onClick={submit} className="btn-primary w-full py-3 text-base">
          See my attachment profile →
        </button>
      )}
    </div>
  )
}
