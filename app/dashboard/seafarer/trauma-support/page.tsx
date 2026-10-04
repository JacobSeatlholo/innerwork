'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { IncidentType } from '@/types'

const pfaPrinciples = [
  {
    id: 'safety', icon: '⚓', title: 'Safety', tagline: 'Stabilise the body and the ship first',
    steps: ['Move to a physically safe, warm area away from the scene.', 'Hand over your duties if you are unsafe to stand watch — say it plainly: "I am not fit for watch right now."', 'Check basics: injuries, warmth, water, food, medication.', 'Ask the question that matters: "Are you safe enough to stay alone for a few minutes?"'],
  },
  {
    id: 'calm', icon: '🌊', title: 'Calm', tagline: 'Slow the nervous system before anything else',
    steps: ['Slow your breathing: longer exhale than inhale (in 4, out 6).', 'Use the grounding sequence below — anchor yourself in the present.', 'Reduce noise and bright light where possible; avoid replays of the event on screens.', 'Remind yourself and others: "The event is over. This moment is now."'],
  },
  {
    id: 'connected', icon: '🤝', title: 'Connectedness', tagline: 'Trauma shrinks in the presence of others',
    steps: ['Stay within reach of trusted crew — do not isolate in a cabin for days.', 'Call family or a helpline when the ship calms; hearing a familiar voice resets the system.', 'Let one person on board know what you saw and how it hit you.', 'Accept help that is offered — hot tea, a covered watch, company at meals.'],
  },
  {
    id: 'efficacy', icon: '🧭', title: 'Self-efficacy', tagline: 'Small acts of control rebuild strength',
    steps: ['Take one achievable action: eat, shower, write the incident log below, tidy your cabin.', 'Return to routine duties gradually — routine is scaffolding for the mind.', 'Note what you did that helped. Competence is the antidote to helplessness.', 'If you led or acted during the incident, acknowledge it — review, don\'t re-live.'],
  },
  {
    id: 'hope', icon: '🌅', title: 'Hope', tagline: 'This response is normal — and it passes with support',
    steps: ['Expect waves: bad nights, intrusive images, jumpiness. This is a normal brain processing an abnormal event.', 'Most acute reactions settle within days to weeks — especially with support.', 'Book a debrief or counselling session; talking is treatment, not weakness.', 'If weeks pass without easing, use the escalation ladder below — that is a sign to get professional care, not a personal failure.'],
  },
]

const groundingSteps = [
  { sense: '5 — SEE', icon: '👀', instruction: 'Name five things you can see right now. Say them slowly: the rivet in the bulkhead, the mug on the chart table, the line of the horizon.' },
  { sense: '4 — FEEL', icon: '✋', instruction: 'Four things you can feel against your body: boots on steel deck, the rail under your hand, fabric on your skin, the air\'s temperature.' },
  { sense: '3 — HEAR', icon: '👂', instruction: 'Three sounds: the engine\'s hum, water against the hull, wind in the rigging. Let the ship\'s sounds tell you the present moment is different from the memory.' },
  { sense: '2 — SMELL', icon: '👃', instruction: 'Two smells: coffee from the galley, salt and diesel on the air. Smell reaches the brain\'s alarm centre fastest — it can anchor you quickly.' },
  { sense: '1 — TASTE', icon: '👅', instruction: 'One taste: sip water or tea slowly. Then take one long breath, look at the horizon, and say: "I am here. I am on this ship. Right now, I am safe."' },
]

const symptoms = [
  { id: 'intrusive', text: 'Unwanted memories, images or nightmares of the event that break into my day' },
  { id: 'avoidance', text: 'Avoiding places, tasks, people or conversations connected to what happened' },
  { id: 'arousal', text: 'Feeling constantly on edge, jumpy at noises, or unusually irritable with crew' },
  { id: 'sleep', text: 'Sleep broken by waking, dread before watch, or exhaustion that rest does not fix' },
  { id: 'numbness', text: 'Feeling flat, detached, or distant from crewmates, family calls and things I usually care about' },
  { id: 'guilt', text: 'Guilt, self-blame, or replaying "what I should have done" over and over' },
]

const symptomOptions = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Occasionally' },
  { value: 2, label: 'Most days' },
  { value: 3, label: 'Nearly every day' },
]

const incidentTypes: { value: IncidentType; label: string }[] = [
  { value: 'accident_injury', label: 'Accident / serious injury on board' },
  { value: 'man_overboard', label: 'Person overboard / search and rescue' },
  { value: 'piracy_security', label: 'Piracy / armed robbery / security threat' },
  { value: 'collision_grounding', label: 'Collision, grounding or structural failure' },
  { value: 'cargo_enclosed_space', label: 'Cargo or enclosed-space incident' },
  { value: 'loss_of_colleague', label: 'Loss of a colleague' },
  { value: 'medical_emergency', label: 'Medical emergency / serious illness' },
  { value: 'abandonment', label: 'Abandonment / unpaid wages / repatriation stress' },
  { value: 'near_miss', label: 'Near miss — "it could have been me"' },
  { value: 'other', label: 'Other' },
]

const redFlags = [
  'Intrusive memories or nightmares lasting more than a month, or getting stronger',
  'Avoiding essential duties (bridge, engine room, the area where it happened)',
  'Using alcohol or substances to sleep or to get through the day',
  'Feeling numb or disconnected from your family for weeks',
  'Thoughts of harming yourself or feeling you would be better off not here',
  'Crewmates saying they are worried about you',
]

export default function TraumaSupportPage() {
  const [openPfa, setOpenPfa] = useState<string | null>('safety')
  const [gStep, setGStep] = useState(-1)
  const [symptomAnswers, setSymptomAnswers] = useState<Record<string, number>>({})
  const [symptomResult, setSymptomResult] = useState<string | null>(null)
  const [incidentType, setIncidentType] = useState<IncidentType | ''>('')
  const [description, setDescription] = useState('')
  const [occurredOn, setOccurredOn] = useState('')
  const [immediateResponse, setImmediateResponse] = useState('')
  const [coping, setCoping] = useState(5)
  const [share, setShare] = useState(false)
  const [logSaved, setLogSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  function runGrounding() {
    setGStep(0)
    if (typeof window !== 'undefined') {
      document.getElementById('grounding-box')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  function nextGroundingStep() {
    setGStep(prev => (prev < 0 ? 0 : prev >= groundingSteps.length - 1 ? -1 : prev + 1))
  }

  function scoreSymptoms() {
    const total = (symptomAnswers['intrusive'] ?? 0) + (symptomAnswers['avoidance'] ?? 0) + (symptomAnswers['arousal'] ?? 0)
      + (symptomAnswers['sleep'] ?? 0) + (symptomAnswers['numbness'] ?? 0) + (symptomAnswers['guilt'] ?? 0)
    if ((symptomAnswers['intrusive'] ?? 0) >= 3 && (symptomAnswers['arousal'] ?? 0) >= 2) {
      return {
        tone: 'urgent' as const,
        text: 'You are carrying significant trauma responses. These are well-known, treatable injury reactions — and they respond best when addressed early. Please book a trauma-focused session today or use a 24/7 helpline. You should not have to hold this alone while standing watch.',
      }
    }
    if (total >= 8) {
      return {
        tone: 'concern' as const,
        text: 'Your responses are in the range where professional support makes a real difference. Book a counselling session this week, use the grounding tools daily, and let one trusted person on board know what is going on. If this persists beyond a month, insist on a referral — persistent symptoms deserve treatment, not endurance.',
      }
    }
    if (total >= 4) {
      return {
        tone: 'watch' as const,
        text: 'Some normal post-incident responses are showing up. Keep your routine strong, use grounding before sleep, and re-check yourself weekly. If any of these climb, treat it as a signal to book a session — early support shortens recovery.',
      }
    }
    return {
      tone: 'ok' as const,
      text: 'Your system appears to be settling. Keep your anchors: sleep, movement, connection, and honest conversation after hard incidents. Look after your crewmates too — many seafarers notice others struggling before they admit it themselves.',
    }
  }

  const toneStyles = {
    urgent: { bg: '#fef2f2', border: '#ef4444', color: '#991b1b' },
    concern: { bg: '#fffbeb', border: '#f59e0b', color: '#92400e' },
    watch: { bg: '#f0f9ff', border: '#7dd3fc', color: '#0c4a6e' },
    ok: { bg: '#f0fdf4', border: '#86efac', color: '#166534' },
  }

  async function saveIncidentLog() {
    if (!description.trim() || !incidentType) return
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('incident_logs').insert({
      user_id: user?.id ?? null,
      incident_type: incidentType,
      description,
      occurred_on: occurredOn || null,
      immediate_response: immediateResponse || null,
      current_coping: coping,
      shared_with_practitioner: share,
    })
    setLogSaved(true)
    setSaving(false)
    setDescription(''); setImmediateResponse(''); setOccurredOn(''); setIncidentType(''); setCoping(5); setShare(false)
    setTimeout(() => setLogSaved(false), 4000)
  }

  const answeredAll = symptoms.every(s => symptomAnswers[s.id] !== undefined)
  const symptomFeedback = symptomResult ? scoreSymptoms() : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-slide-up">

      {/* Header */}
      <div style={{ background: 'linear-gradient(150deg, #0a2a1e 0%, #0d3d2b 60%, #186b52 120%)', borderRadius: '22px', padding: 'clamp(1.5rem, 4vw, 2.25rem)' }}>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#5DCAA5', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.625rem' }}>🛟 Trauma counselling & psychological support</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.7rem, 4.5vw, 2.5rem)', color: 'white', fontWeight: 600, lineHeight: 1.15, marginBottom: '0.75rem' }}>When the sea leaves a mark</h1>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', color: '#9FE1CB', lineHeight: 1.85, maxWidth: '640px', fontWeight: 300 }}>
          Accidents, piracy, rescues, loss — critical incidents are part of maritime work, and their psychological impact is an occupational injury, not a weakness. This module gives you the same tools trauma counsellors use: immediate stabilisation, honest self-assessment, and a clear path to professional care.
        </p>
      </div>

      {/* Psychological First Aid */}
      <div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '4px' }}>Psychological First Aid at sea</h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.7, marginBottom: '1rem' }}>
          Used by crisis responders worldwide in the first hours and days after a critical incident. Open each principle and work through it — for yourself, or to help a crewmate.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {pfaPrinciples.map(p => {
            const open = openPfa === p.id
            return (
              <div key={p.id} style={{ border: `1.5px solid ${open ? '#1D9E75' : '#e8e4dc'}`, borderRadius: '16px', background: open ? '#f0f7f4' : 'white', overflow: 'hidden', transition: 'all 0.2s' }}>
                <button onClick={() => setOpenPfa(open ? null : p.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem 1.1rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontSize: '1.35rem' }}>{p.icon}</span>
                  <span style={{ flex: 1 }}>
                    <span style={{ display: 'block', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 600, color: '#1a1a18' }}>{p.title}</span>
                    <span style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#706b5f' }}>{p.tagline}</span>
                  </span>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', color: '#1D9E75' }}>{open ? '−' : '+'}</span>
                </button>
                {open && (
                  <ol style={{ margin: '0 1.1rem 1.1rem 3.4rem', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {p.steps.map((s, i) => (
                      <li key={i} style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#3d3d3a', lineHeight: 1.65 }}>{s}</li>
                    ))}
                  </ol>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Grounding */}
      <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)' }} id="grounding-box">
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#1D9E75', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Right now tool</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '6px' }}>Grounding when memories flood back</h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          For flashbacks, hypervigilance after a hard watch, or when the body replays the incident. The 5-4-3-2-1 sequence pulls your mind out of the memory and into the present — adapted here to a ship&apos;s senses.
        </p>
        {gStep >= 0 ? (
          <div className="animate-fade" style={{ background: 'linear-gradient(135deg, #f0f7f4 0%, #ecfdf5 100%)', border: '1.5px solid #1D9E75', borderRadius: '18px', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>{groundingSteps[gStep].icon}</div>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 700, color: '#186b52', letterSpacing: '0.12em', marginBottom: '0.625rem' }}>{groundingSteps[gStep].sense}</p>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.05rem, 2.8vw, 1.3rem)', color: '#1a1a18', lineHeight: 1.6, marginBottom: '1.25rem' }}>{groundingSteps[gStep].instruction}</p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '1rem' }}>
              {groundingSteps.map((_, i) => (
                <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i <= gStep ? '#1D9E75' : '#d1e7dd', transition: 'background 0.3s' }} />
              ))}
            </div>
            <button onClick={nextGroundingStep} className="btn-primary" style={{ fontSize: '13px' }}>
              {gStep >= groundingSteps.length - 1 ? 'Finish — I am here now' : 'Next sense →'}
            </button>
          </div>
        ) : (
          <button onClick={runGrounding} className="btn-primary" style={{ fontSize: '13.5px' }}>▶ Start the 5-4-3-2-1 grounding</button>
        )}
      </div>

      {/* Symptom check */}
      <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '6px' }}>How am I responding since the incident?</h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Answer for the past two weeks. Trauma responses are the mind&apos;s attempt to protect you — checking them honestly is how you know whether they are settling or hardening.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {symptoms.map((s, si) => (
            <div key={s.id} style={{ border: '1px solid #e8e4dc', borderRadius: '16px', padding: '1rem 1.1rem', background: '#fdfcfa' }}>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#1a1a18', lineHeight: 1.55, marginBottom: '0.75rem', fontWeight: 500 }}>{si + 1}. {s.text}</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {symptomOptions.map(o => {
                  const active = symptomAnswers[s.id] === o.value
                  return (
                    <button key={o.value} onClick={() => { setSymptomAnswers(prev => ({ ...prev, [s.id]: o.value })); setSymptomResult(null) }}
                      style={{ fontFamily: 'Jost, sans-serif', fontSize: '11.5px', fontWeight: active ? 600 : 400, padding: '7px 13px', borderRadius: '50px', cursor: 'pointer', transition: 'all 0.15s', border: active ? '1.5px solid #1D9E75' : '1px solid #e8e4dc', background: active ? '#f0f7f4' : 'white', color: active ? '#186b52' : '#706b5f' }}>
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1.25rem' }}>
          <button onClick={() => setSymptomResult('done')} disabled={!answeredAll} className="btn-primary" style={{ fontSize: '13.5px' }}>
            {answeredAll ? 'Understand my responses' : `Answer all ${symptoms.length} to continue`}
          </button>
        </div>
        {symptomFeedback && (
          <div className="animate-fade" style={{ marginTop: '1.25rem', background: toneStyles[symptomFeedback.tone].bg, border: `1.5px solid ${toneStyles[symptomFeedback.tone].border}`, borderRadius: '18px', padding: '1.25rem 1.35rem' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, color: toneStyles[symptomFeedback.tone].color, marginBottom: '0.625rem' }}>
              {symptomFeedback.tone === 'urgent' ? '🆘 Get support today' : symptomFeedback.tone === 'concern' ? 'Professional support is warranted' : symptomFeedback.tone === 'watch' ? 'Keep watch on yourself' : 'Responses settling'}
            </p>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#3d3d3a', lineHeight: 1.75, marginBottom: '1rem' }}>{symptomFeedback.text}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard/bookings" className="btn-primary" style={{ fontSize: '12.5px' }}>Book a trauma session</Link>
              <Link href="/dashboard/seafarer#helplines" className="btn-secondary" style={{ fontSize: '12.5px' }}>24/7 helplines</Link>
            </div>
          </div>
        )}
      </div>

      {/* Incident log */}
      <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#1D9E75', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Private record</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '6px' }}>Log the incident, contain the memory</h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Writing an incident down — what happened, what you did, how you are coping — moves it from a looping image in your head to an ordered story on a page. This log is private to you; you choose whether to share it with your practitioner for a structured debrief.
        </p>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label className="label">Type of incident</label>
            <select value={incidentType} onChange={e => setIncidentType(e.target.value as IncidentType)} className="input" style={{ appearance: 'none' }}>
              <option value="">Select…</option>
              {incidentTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-2">
            <div>
              <label className="label">Date it occurred (optional)</label>
              <input type="date" value={occurredOn} onChange={e => setOccurredOn(e.target.value)} className="input" />
            </div>
            <div>
              <label className="label">How well am I coping now? ({coping}/10)</label>
              <input type="range" min={1} max={10} value={coping} onChange={e => setCoping(Number(e.target.value))} style={{ width: '100%', accentColor: '#1D9E75', marginTop: '10px' }} />
            </div>
          </div>
          <div>
            <label className="label">What happened — in your own words</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="textarea" placeholder="Facts first, then feelings. What did you see, hear, do? What has replayed since?" rows={5} />
          </div>
          <div>
            <label className="label">What helped in the moment? (optional)</label>
            <textarea value={immediateResponse} onChange={e => setImmediateResponse(e.target.value)} className="textarea" placeholder="What did you or others do that steadied things — a procedure, a person, a thought?" rows={3} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input type="checkbox" checked={share} onChange={e => setShare(e.target.checked)} style={{ width: 16, height: 16, accentColor: '#1D9E75' }} />
            <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#5c574d' }}>Share this log with my practitioner to prepare for a debrief session</span>
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={saveIncidentLog} disabled={saving || !description.trim() || !incidentType} className="btn-primary" style={{ fontSize: '13.5px' }}>
              {saving ? 'Saving…' : 'Save incident log'}
            </button>
            {logSaved && <span className="badge badge-completed animate-fade">✓ Log saved — private to you</span>}
          </div>
        </div>
      </div>

      {/* Escalation ladder */}
      <div style={{ background: '#fafaf8', border: '1px solid #e8e4dc', borderRadius: '20px', padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '0.625rem' }}>The escalation ladder — when to step up support</h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Recovery is rarely one jump from &ldquo;fine&rdquo; to &ldquo;counselling&rdquo;. Move up the ladder whenever a level stops working — and jump straight to the top if safety is at stake.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {[
            { level: '1', label: 'Self-care first', desc: 'Routine, sleep, movement, grounding tools, honest journaling. Give it days, not weeks.' },
            { level: '2', label: 'Talk to someone on board', desc: 'A trusted crewmate, your buddy, the bosun, a welfare contact. Saying it out loud halves the load.' },
            { level: '3', label: 'Formal support', desc: 'Book a session through InnerWork, contact the ship\'s chaplain, or reach a welfare service. Ask management for shore-side support — it is their duty of care.' },
            { level: '4', label: '24/7 professional care', desc: 'Helplines, telehealth sessions via the ship\'s connection, or a crisis line. Available at any hour, wherever the ship is.' },
            { level: '5', label: 'Emergency', desc: 'Immediate danger to yourself or others: alert the bridge/OOW, involve the master, use emergency medical channels now.' },
          ].map(step => (
            <div key={step.level} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: 'white', border: '1px solid #e8e4dc', borderRadius: '14px', padding: '0.9rem 1.1rem' }}>
              <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #1D9E75, #186b52)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 700 }}>{step.level}</span>
              <div>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 600, color: '#1a1a18', marginBottom: '2px' }}>{step.label}</p>
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12.5px', color: '#706b5f', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1.25rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '14px', padding: '1rem 1.1rem' }}>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 700, color: '#991b1b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Red flags — do not wait</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {redFlags.map((f, i) => (
              <li key={i} style={{ fontFamily: 'Jost, sans-serif', fontSize: '12.5px', color: '#7f1d1d', lineHeight: 1.6, display: 'flex', gap: '8px' }}><span>⚠️</span><span>{f}</span></li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-3" style={{ marginTop: '1.25rem' }}>
          <Link href="/dashboard/seafarer#helplines" className="btn-primary" style={{ fontSize: '13px' }}>24/7 helplines</Link>
          <Link href="/dashboard/bookings" className="btn-secondary" style={{ fontSize: '13px' }}>Book a session</Link>
        </div>
      </div>
    </div>
  )
}
