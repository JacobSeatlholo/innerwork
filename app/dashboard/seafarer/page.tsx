'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { ScreenBand } from '@/types'

// Maritime-adapted wellbeing screen (PHQ-style self-check, not a diagnostic tool)
const screenQuestions = [
  { id: 'sleep', text: 'Sleep — trouble falling or staying asleep between watches, or sleeping far more than usual', icon: '🌙' },
  { id: 'mood', text: 'Mood — feeling down, low, or hopeless most of the day', icon: '🌧️' },
  { id: 'interest', text: 'Interest — little interest or pleasure in things that used to help (calls home, port time, meals, gym)', icon: '🪸' },
  { id: 'energy', text: 'Energy — feeling drained beyond normal watch fatigue; even small tasks feel heavy', icon: '🔋' },
  { id: 'connection', text: 'Connection — feeling cut off from family and friends, or avoiding their calls', icon: '📡' },
  { id: 'alarm', text: 'Thoughts that you would be better off not being here, or of harming yourself', icon: '🆘' },
]

const answerOptions = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Several days' },
  { value: 2, label: 'More than half the days' },
  { value: 3, label: 'Nearly every day' },
]

const bandMeta: Record<ScreenBand, { label: string; color: string; bg: string; border: string; guidance: string[] }> = {
  healthy: {
    label: 'Steady seas',
    color: '#166534', bg: '#f0fdf4', border: '#86efac',
    guidance: [
      'Keep your anchors strong: sleep routine, movement, connection rituals and crew social time.',
      'Save your self-care plan and revisit it weekly — prevention is easier than recovery.',
      'Check in on your crewmates. A steady shipmate can be someone else\'s lifeline.',
    ],
  },
  stressed: {
    label: 'Choppy waters',
    color: '#92400e', bg: '#fffbeb', border: '#fcd34d',
    guidance: [
      'Your system is carrying more than usual. Start with sleep hygiene and the emotional support strategies.',
      'Use the Emotional Support toolkit daily for the next two weeks, then re-screen.',
      'Talk to someone you trust on board — naming stress early stops it compounding.',
    ],
  },
  struggling: {
    label: 'Heavy weather',
    color: '#991b1b', bg: '#fef2f2', border: '#fecaca',
    guidance: [
      'These symptoms deserve real support — this is what the platform is for.',
      'Book a session with a practitioner (crisis sessions are available) or use a 24/7 helpline today.',
      'Use the Trauma Support grounding tools daily, and tell one person on board how you are really doing.',
    ],
  },
  urgent: {
    label: 'Immediate support needed',
    color: '#7f1d1d', bg: '#fef2f2', border: '#ef4444',
    guidance: [
      'Please do not carry this alone. Reach out now — you matter, and help is available 24/7.',
      'Call or message one of the helplines listed below, or your officer, chaplain, or a trusted person right now.',
      'If you are in immediate danger, alert the bridge or a crewmate and stay with someone until you are safe.',
    ],
  },
}

const helplines = [
  { name: 'ISWAN SeafarerHelp', desc: 'Free, confidential, multilingual, 24/7 for all seafarers and their families', contact: '+44 20 7323 2737 · seafarerhelp.org', icon: '🌐' },
  { name: 'The Mission to Seafarers', desc: 'Flying Angel support network — 24/7 helpline and port chaplains worldwide', contact: '+44 20 7246 4778 · missiontoseafarers.org', icon: '👼' },
  { name: "Sailors' Society", desc: 'Crisis response and wellness-at-sea programmes, including Southern Africa', contact: '24/7 crisis response via sailors-society.org', icon: '⛵' },
  { name: 'SADAG (South Africa)', desc: 'SA Depression and Anxiety Group — toll-free, seven days a week', contact: '0800 12 12 12 · Suicide Crisis 0800 567 567', icon: '🇿🇦' },
  { name: 'Gabonewe Projects', desc: 'Your InnerWork practice — trauma-informed counselling and referrals', contact: '+27 72 577 8419', icon: '🌿' },
]

const moduleCards = [
  {
    href: '/dashboard/seafarer/trauma-support',
    icon: '🛟',
    title: 'Trauma Counselling & Psychological Support',
    desc: 'Psychological First Aid for critical incidents, grounding tools for flashbacks and hypervigilance, private incident logs, and a clear escalation pathway.',
    color: '#f0f7f4', border: '#b3dbcd', accent: '#186b52',
  },
  {
    href: '/dashboard/seafarer/grief-support',
    icon: '🕯️',
    title: 'Grief & Family Intervention',
    desc: 'Grieving at sea, rituals from afar, a digital memorial wall, support for grieving families ashore, and how to stand beside a grieving crewmate.',
    color: '#fdf8f3', border: '#fcd34d', accent: '#92400e',
  },
  {
    href: '/dashboard/seafarer/emotional-support',
    icon: '🧭',
    title: 'Emotional Support Strategies',
    desc: 'Daily seafarer check-ins, coping strategies for homesickness, isolation and watch fatigue, and a personal self-care plan you can carry anywhere.',
    color: '#f5f3ff', border: '#c4b5fd', accent: '#6d28d9',
  },
]

export default function SeafarerHubPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [screenResult, setScreenResult] = useState<{ score: number; band: ScreenBand } | null>(null)
  const [saving, setSaving] = useState(false)

  function selectAnswer(qid: string, value: number) {
    setAnswers(prev => ({ ...prev, [qid]: value }))
    setScreenResult(null)
  }

  function scoreScreen(): { score: number; band: ScreenBand } {
    let score = 0
    for (const q of screenQuestions) {
      if (q.id !== 'alarm') score += answers[q.id] ?? 0
    }
    let band: ScreenBand = 'healthy'
    if (score >= 15) band = 'urgent'
    else if (score >= 10) band = 'struggling'
    else if (score >= 5) band = 'stressed'
    if ((answers['alarm'] ?? 0) > 0) band = 'urgent'
    return { score, band }
  }

  async function submitScreen() {
    if (Object.keys(answers).length < screenQuestions.length) return
    setSaving(true)
    const { score, band } = scoreScreen()
    const meta = bandMeta[band]
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('wellbeing_screens').insert({
      user_id: user?.id ?? null,
      responses: answers,
      score,
      band,
      recommended_actions: meta.guidance,
    })
    setScreenResult({ score, band })
    setSaving(false)
    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        document.getElementById('screen-result')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-slide-up">

      {/* Hero */}
      <div style={{ background: 'linear-gradient(150deg, #0a2a1e 0%, #0d3d2b 55%, #11466a 130%)', borderRadius: '22px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', position: 'relative', overflow: 'hidden' }}>
        <div className="deco" style={{ position: 'absolute', top: '-40px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,158,117,0.25) 0%, transparent 70%)' }} />
        <div className="deco" style={{ position: 'absolute', bottom: '-60px', left: '30%', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,158,117,0.12) 0%, transparent 70%)' }} />
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#5DCAA5', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem', position: 'relative', zIndex: 1 }}>⚓ Anchored Minds — Maritime Programme</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.9rem, 5vw, 2.8rem)', color: 'white', fontWeight: 600, lineHeight: 1.15, marginBottom: '0.875rem', position: 'relative', zIndex: 1 }}>
          Psychosocial support for life at sea
        </h1>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '14.5px', color: '#9FE1CB', lineHeight: 1.85, maxWidth: '640px', fontWeight: 300, position: 'relative', zIndex: 1, marginBottom: '1.5rem' }}>
          Seafaring keeps world trade moving — but it asks a lot of the people who do it: long contracts away from home, watch-keeping fatigue, confined routines, storms, piracy zones, and the grief of missing life ashore. This programme brings trauma counselling, grief and family support, and daily emotional strategies into one confidential space — built for the realities of shipboard life.
        </p>
        <div className="flex flex-wrap gap-3" style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/dashboard/seafarer/trauma-support" className="btn-primary" style={{ fontSize: '13px' }}>🛟 Trauma support</Link>
          <Link href="/dashboard/seafarer/grief-support" className="btn-primary" style={{ fontSize: '13px', background: 'white', color: '#0d3d2b', boxShadow: 'none' }}>🕯️ Grief & family</Link>
          <Link href="/dashboard/seafarer/emotional-support" className="btn-primary" style={{ fontSize: '13px', background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(159,225,203,0.4)', boxShadow: 'none' }}>🧭 Emotional strategies</Link>
        </div>
      </div>

      {/* Why it matters stats */}
      <div className="stats-grid">
        {[
          { icon: '🌍', value: '~80%', label: 'of world trade moves by sea — carried by ~1.9 million seafarers' },
          { icon: '📅', value: '6–9 mo', label: 'typical contract length spent away from family and home' },
          { icon: '🧠', value: '1 in 4', label: 'seafarers in industry surveys report signs of depression or anxiety' },
          { icon: '🤐', value: '#1 barrier', label: 'stigma and career fears keep most from asking for help' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
            <div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.7rem', fontWeight: 600, color: '#1a1a18', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10.5px', color: '#706b5f', marginTop: '4px', lineHeight: 1.5 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* The three modules */}
      <div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '0.875rem' }}>Three ways this programme supports you</h2>
        <div className="grid-3">
          {moduleCards.map(m => (
            <Link key={m.href} href={m.href} className="feature-card" style={{ background: m.color, border: `1.5px solid ${m.border}`, textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: '1.9rem', marginBottom: '0.75rem' }}>{m.icon}</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 600, color: '#1a1a18', marginBottom: '6px', lineHeight: 1.3 }}>{m.title}</h3>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12.5px', color: '#5c574d', lineHeight: 1.7 }}>{m.desc}</p>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 600, color: m.accent, marginTop: '0.875rem' }}>Open module →</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Wellbeing self-check */}
      <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)' }} id="wellbeing-check">
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#1D9E75', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>2-minute check</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '6px' }}>How is your mind holding up at sea?</h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Over the past two weeks, how often has each of these been true for you? This is a self-check inspired by WHO screening practice — it is not a diagnosis, and your answers stay private on your account.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {screenQuestions.map((q, qi) => (
            <div key={q.id} style={{ border: '1px solid #e8e4dc', borderRadius: '16px', padding: '1rem 1.1rem', background: '#fdfcfa' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{q.icon}</span>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#1a1a18', lineHeight: 1.55, fontWeight: 500 }}>{qi + 1}. {q.text}</p>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {answerOptions.map(o => {
                  const active = answers[q.id] === o.value
                  return (
                    <button key={o.value} onClick={() => selectAnswer(q.id, o.value)}
                      style={{ fontFamily: 'Jost, sans-serif', fontSize: '11.5px', fontWeight: active ? 600 : 400, padding: '7px 13px', borderRadius: '50px', cursor: 'pointer', transition: 'all 0.15s', border: active ? '1.5px solid #1D9E75' : '1px solid #e8e4dc', background: active ? '#f0f7f4' : 'white', color: active ? '#186b52' : '#706b5f' }}>
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <button onClick={submitScreen} disabled={saving || Object.keys(answers).length < screenQuestions.length} className="btn-primary" style={{ fontSize: '13.5px' }}>
            {saving ? 'Saving…' : Object.keys(answers).length < screenQuestions.length ? `Answer all ${screenQuestions.length} to continue` : 'See my result'}
          </button>
          <button onClick={() => { setAnswers({}); setScreenResult(null) }} className="btn-ghost" style={{ fontSize: '12.5px' }}>Reset</button>
        </div>

        {screenResult && (
          <div id="screen-result" className="animate-fade" style={{ marginTop: '1.5rem', background: bandMeta[screenResult.band].bg, border: `1.5px solid ${bandMeta[screenResult.band].border}`, borderRadius: '18px', padding: '1.25rem 1.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.875rem' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 600, color: bandMeta[screenResult.band].color }}>
                {screenResult.band === 'urgent' ? '🆘 ' : ''}{bandMeta[screenResult.band].label}
              </p>
              <span className="badge" style={{ background: 'white', color: bandMeta[screenResult.band].color, border: `1px solid ${bandMeta[screenResult.band].border}` }}>
                Score {screenResult.score}
              </span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {bandMeta[screenResult.band].guidance.map((g, i) => (
                <li key={i} style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#3d3d3a', lineHeight: 1.65, display: 'flex', gap: '8px' }}>
                  <span style={{ color: bandMeta[screenResult.band].color, fontWeight: 700 }}>{i + 1}.</span><span>{g}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3" style={{ marginTop: '1.25rem' }}>
              {screenResult.band === 'urgent' ? (
                <a href="#helplines" className="btn-primary" style={{ fontSize: '13px' }}>Get help now — 24/7 lines ↓</a>
              ) : (
                <>
                  <Link href="/dashboard/seafarer/emotional-support" className="btn-primary" style={{ fontSize: '12.5px' }}>Start with emotional strategies</Link>
                  <Link href="/dashboard/bookings" className="btn-secondary" style={{ fontSize: '12.5px' }}>Book a session</Link>
                </>
              )}
            </div>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', color: '#706b5f', marginTop: '1rem', lineHeight: 1.6 }}>
              This screen is a self-reflection aid, not a clinical diagnosis. If you are worried about your safety or someone else&apos;s, contact a helpline above or emergency services immediately.
            </p>
          </div>
        )}
      </div>

      {/* Helplines */}
      <div id="helplines" style={{ background: 'linear-gradient(135deg, #0a2a1e 0%, #0d3d2b 100%)', borderRadius: '20px', padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#5DCAA5', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Never carry it alone</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>24/7 support lines for seafarers & families</h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#9FE1CB', lineHeight: 1.7, marginBottom: '1.5rem', fontWeight: 300 }}>
          These services are free, confidential, independent of your employer, and staffed by people who understand maritime life. Save at least one number in your phone before you need it.
        </p>
        <div className="grid-2">
          {helplines.map(h => (
            <div key={h.name} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '1rem 1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '1.1rem' }}>{h.icon}</span>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 600, color: 'white' }}>{h.name}</p>
              </div>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11.5px', color: '#9FE1CB', lineHeight: 1.6, marginBottom: '6px', fontWeight: 300 }}>{h.desc}</p>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12.5px', fontWeight: 600, color: '#5DCAA5' }}>{h.contact}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10.5px', color: '#2e8a6c', marginTop: '1.25rem', lineHeight: 1.7 }}>
          Verify numbers on each organisation&apos;s website before departure — details can change. For medical emergencies on board, follow your ship&apos;s emergency procedures and contact your coastal radio medical service.
        </p>
      </div>

      {/* For companies */}
      <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', borderLeft: '5px solid #1D9E75' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '0.625rem' }}>For shipping companies & crew managers</h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.8, marginBottom: '1rem' }}>
          Mental health at sea is a safety system, not a perk. Fatigue, isolation and unprocessed trauma directly affect watch-keeping, decision-making and incident rates. Gabonewe Projects partners with operators to deploy this programme across fleets — including trauma debriefing after critical incidents, grief support for bereaved crews and families, and anonymised wellbeing reporting for management.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/bookings" className="btn-primary" style={{ fontSize: '12.5px' }}>Discuss a fleet programme</Link>
          <a href="tel:+27725778419" className="btn-secondary" style={{ fontSize: '12.5px' }}>+27 72 577 8419</a>
        </div>
      </div>
    </div>
  )
}
