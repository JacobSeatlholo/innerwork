'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { SeafarerChallenge } from '@/types'

const challenges: { value: SeafarerChallenge; label: string; icon: string }[] = [
  { value: 'homesickness', label: 'Homesickness', icon: '🏠' },
  { value: 'isolation', label: 'Isolation', icon: '🏝️' },
  { value: 'fatigue', label: 'Watch fatigue', icon: '😴' },
  { value: 'crew_conflict', label: 'Crew conflict', icon: '⚡' },
  { value: 'work_pressure', label: 'Work pressure', icon: '📋' },
  { value: 'family_worry', label: 'Family worry', icon: '👨‍👩‍👧' },
  { value: 'connectivity', label: 'Connectivity', icon: '📡' },
  { value: 'none', label: 'Holding steady', icon: '🌤️' },
]

const strategies: Record<Exclude<SeafarerChallenge, 'none'>, { title: string; items: { icon: string; name: string; how: string }[] }> = {
  homesickness: {
    title: 'Homesickness',
    items: [
      { icon: '📆', name: 'Countdown with content', how: 'Don\'t just count contract days — attach one plan per month: a meal to cook with the crew, a port to explore, a project at home to follow by message. Aimed days pass lighter than empty ones.' },
      { icon: '📞', name: 'Call with a purpose', how: 'Calls home can feel flat because "how are you" runs out fast. Keep a note of things to tell and questions to ask — stories beat summaries, for both of you.' },
      { icon: '🎁', name: 'Send presence, not just words', how: 'Record a short video from the bridge wing, mail a postcard from port, help a crewmate surprise their family too. Giving comfort relieves homesickness faster than receiving it.' },
      { icon: '🧭', name: 'Name the feeling with the horizon', how: 'Homesickness is love with nowhere to land. Once a day, look at the horizon and name one thing you love about home — then one thing you\'re building by being here.' },
    ],
  },
  isolation: {
    title: 'Isolation & loneliness',
    items: [
      { icon: '🍲', name: 'Structured social time', how: 'Loneliness on a full ship is real. Propose small rituals: galley movie night, Sunday breakfast together, chess or fitness challenges across departments. Consistency matters more than scale.' },
      { icon: '🚶', name: 'Deck walks with intent', how: 'One loop of the deck after each watch, without your phone. Movement plus daylight plus open sky is the cheapest antidepressant at sea.' },
      { icon: '🌐', name: 'Guard the wifi window', how: 'When signal appears, loneliness says "scroll". Choose connection instead: message three people first before consuming anything.' },
      { icon: '🤗', name: 'Be the invitation', how: 'Almost everyone on board is quietly waiting for someone else to start. Be the one who asks. One genuine conversation a day keeps isolation from hardening.' },
    ],
  },
  fatigue: {
    title: 'Watch-keeping fatigue',
    items: [
      { icon: '🛏️', name: 'Protect the anchor sleep', how: 'Your longest sleep block is sacred. Blackout the cabin, keep it cool, use earplugs, and brief your cabin-mate or use do-not-disturb norms. Anchor sleep first, naps second.' },
      { icon: '☕', name: 'Time your caffeine', how: 'Caffeine takes ~20 minutes to hit and stays 4-6 hours. Take it at the start of a watch, none within 6 hours of planned sleep — it steals the sleep you\'ll need tomorrow.' },
      { icon: '💤', name: 'Nap like a professional', how: 'A 20-40 minute nap before a night watch genuinely restores alertness; longer dips into deep sleep and leaves you groggy. Use a nap before, not after, the hardest watch.' },
      { icon: '🥗', name: 'Eat for alertness', how: 'Heavy meals at night trigger drowsiness on watch. Smaller, protein-leaning portions at night; save the big meal after your main sleep.' },
      { icon: '🗣️', name: 'Report fatigue like a hazard', how: 'Micro-sleeps at the wheel are a safety event, not a personal failing. Flag exhaustion to the OOW/master early — fatigue management is a company duty under the MLG/STCW hours-of-work rules.' },
    ],
  },
  crew_conflict: {
    title: 'Crew conflict',
    items: [
      { icon: '🌬️', name: 'The 24-hour rule', how: 'On a ship you can\'t walk away, so don\'t fight at peak heat. Say "I\'ll come back to you on that" — then return within a day, calm and specific.' },
      { icon: '🪞', name: 'Describe behaviour, not character', how: '"The log entry was missing twice this week" lands differently than "you\'re careless". Describe what happened, its impact, and what you need next.' },
      { icon: '🌍', name: 'Cultural humility', how: 'Many "attitude" conflicts are cultural translations: directness vs. saving face, silence vs. agreement. Ask what they meant, not what you assumed.' },
      { icon: '🪜', name: 'Escalate cleanly', how: 'If it won\'t settle, take it through the chain — bosun, head of department, master — focused on the work impact, not personality. Bullying and harassment should be reported formally; that\'s what the system is for.' },
    ],
  },
  work_pressure: {
    title: 'Work pressure & stress',
    items: [
      { icon: '✂️', name: 'Chunk the mountain', how: 'Audits, inspections, port turnarounds: list every task, pick the next 30 minutes only. Pressure grows in the fog of "everything"; it shrinks in the clarity of "next".' },
      { icon: '⏸️', name: 'Micro-recovery between evolutions', how: 'After each intense evolution — mooring, bunkering, drill — take 3 slow breaths and roll your shoulders before the next task. Recovery in minutes prevents exhaustion over months.' },
      { icon: '🎯', name: 'Separate urgent from loud', how: 'Not everything noisy is important. Rank tasks by consequence for safety and schedule, and let the master/CSO help re-prioritise rather than absorbing it all silently.' },
      { icon: '📝', name: 'End-of-shift download', how: 'Before sleep, write tomorrow\'s top 3 and anything unresolved. The mind rehearses what it hasn\'t filed — filing it buys you sleep.' },
    ],
  },
  family_worry: {
    title: 'Worry about family at home',
    items: [
      { icon: '📡', name: 'Set a comms rhythm', how: 'Uncertainty breeds rumination. Agree with family on a rhythm you can actually keep (e.g., voice notes daily, video Sunday) and what counts as an emergency channel. A rhythm turns dread into patience.' },
      { icon: '🧾', name: 'Plan for the bad news scenario', how: 'Ask yourself: if something happened at home, what would I do? Know your relief/repatriation procedure, your union contact, and who covers your watch. A rehearsed plan loosens worry\'s grip.' },
      { icon: '🫱', name: 'Worry well, once a day', how: 'Give worry a scheduled 10 minutes with a notebook: name each worry, decide one action or release it. Outside that window, note the worry and return to your watch.' },
      { icon: '🤝', name: 'Share the load ashore', how: 'Ask one trusted relative to be the family\'s hub for news, so you\'re not piecing together fragments from five group chats. Fewer, clearer sources = calmer mind.' },
    ],
  },
  connectivity: {
    title: 'Poor or no connectivity',
    items: [
      { icon: '📥', name: 'Compose offline, send in bursts', how: 'Write messages and voice notes offline during the day; send everything in one burst when signal returns. It turns frustrating dead zones into planned rhythms.' },
      { icon: '📭', name: 'Pre-agree silence', how: 'Tell family: "No signal until Thursday" — silence with a known end is bearable; unexplained silence breeds panic on both sides.' },
      { icon: '🗒️', name: 'Keep a letter-log', how: 'Write short daily notes you\'d want to tell them — a running letter. Reading it back on leave shows you how much you lived, and gives your family the story later.' },
      { icon: '🧠', name: 'Use the offline toolkit', how: 'Journal prompts, breathing exercises, and the self-care plan on this platform all work without signal. Download what helps before long passages.' },
    ],
  },
}

const waveSteps = [
  { title: '1. Notice the wave forming', desc: 'Tight chest, replaying thoughts, sudden urge to message home three times, anger rising at small things. Naming "a wave is coming" splits you from it.' },
  { title: '2. Let it rise without fighting', desc: 'Emotions crest and fall in about 90 seconds if you don\'t feed them with story. Breathe, feel it peak, resist the urge to act while it\'s peaking.' },
  { title: '3. Anchor in the deck beneath you', desc: 'Feel the deck\'s vibration, the rail under your hand, the air\'s temperature. The sea is allowed to move — you are still standing.' },
  { title: '4. Ask what the wave is saying', desc: 'Homesickness says "you love them". Anger says "a line was crossed". Fear says "something matters". Waves carry information, not orders.' },
  { title: '5. Choose the next small action', desc: 'Drink water, take a lap, write one line in the journal, speak to someone. Action chosen in calm integration beats reaction forced by the swell.' },
]

const dailyPractices = [
  '10 minutes of deck walking in daylight',
  'Box breathing before sleep (4-4-4-4)',
  'One genuine conversation with a crewmate',
  'Message or voice note to family',
  'Stretching or bodyweight routine',
  'Write 3 lines in the journal',
  'Fixed wake/sleep anchor, even on rest days',
  '10 minutes of quiet on the bridge wing or deck',
  'Drink water at every watch change',
  'Read something not work-related',
]

const warningSigns = [
  'Skipping meals or living on coffee and cigarettes',
  'Avoiding calls from home',
  'Snapping at crew over small things',
  'Sleep dropping below 5 hours',
  'Dreading every watch',
  'Drinking more than planned on port days',
  'Feeling invisible to everyone ashore',
  'Intrusive memories of a hard incident',
]

const peerSigns = [
  { sign: 'Withdrawal', desc: 'Eating alone every day, skipping the mess, staying in the cabin on rest days' },
  { sign: 'Changes on watch', desc: 'Unusual quietness, mistakes on routine tasks, late to relieve the watch' },
  { sign: 'Mood shifts', desc: 'Irritability, flatness, dark humour that turns self-deprecating and constant' },
  { sign: 'Appearance', desc: 'Neglecting hygiene or sleep, bloodshot eyes, smelling of alcohol off-duty' },
  { sign: 'Words that worry', desc: '"You\'d all manage fine without me", "the ship would be easier if I wasn\'t here"' },
]

export default function EmotionalSupportPage() {
  const [mood, setMood] = useState(5)
  const [sleep, setSleep] = useState(5)
  const [connection, setConnection] = useState(5)
  const [isolation, setIsolation] = useState(5)
  const [challenge, setChallenge] = useState<SeafarerChallenge>('homesickness')
  const [note, setNote] = useState('')
  const [contractDay, setContractDay] = useState('')
  const [savingCheck, setSavingCheck] = useState(false)
  const [checkSaved, setCheckSaved] = useState(false)
  const [showBadge, setShowBadge] = useState(false)

  const [openStrategy, setOpenStrategy] = useState<string | null>('homesickness')
  const [openWave, setOpenWave] = useState(0)

  const [selectedDaily, setSelectedDaily] = useState<string[]>([])
  const [selectedSigns, setSelectedSigns] = useState<string[]>([])
  const [planSaved, setPlanSaved] = useState(false)
  const [savingPlan, setSavingPlan] = useState(false)

  async function saveCheckIn() {
    setSavingCheck(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('seafarer_checkins').insert({
      user_id: user?.id ?? null,
      mood, sleep_quality: sleep, connection_feeling: connection, isolation_level: isolation,
      current_challenge: challenge,
      notes: note || null,
      contract_day: contractDay ? Number(contractDay) : null,
    })
    setCheckSaved(true)
    setShowBadge(true)
    setTimeout(() => setShowBadge(false), 4000)
    setNote('')
    setSavingCheck(false)
  }

  function toggle(list: string[], setList: (v: string[]) => void, item: string) {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item])
  }

  async function savePlan() {
    setSavingPlan(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('self_care_plans').insert({
      user_id: user?.id ?? null,
      plan_name: 'My sea self-care plan',
      daily_practices: selectedDaily,
      warning_signs: selectedSigns,
      coping_strategies: ['Ride the wave technique', '5-4-3-2-1 grounding', 'Strategies from my challenge module'],
      support_contacts: [
        { name: 'ISWAN SeafarerHelp (24/7)', contact: '+44 20 7323 2737' },
        { name: 'Gabonewe Projects', contact: '+27 72 577 8419' },
      ],
    })
    setPlanSaved(true)
    setSavingPlan(false)
    setTimeout(() => setPlanSaved(false), 4000)
  }

  function checkInInterpretation() {
    if (!checkSaved) return null
    const parts: string[] = []
    if (mood <= 3) parts.push('your mood is heavy today — be gentle with yourself and consider the helplines if it has been many days like this')
    else if (mood >= 7) parts.push('your mood is in a good place — note what is working so you can repeat it')
    if (sleep <= 3) parts.push('sleep is struggling — protect your anchor sleep block and try box breathing before rest')
    if (connection <= 3) parts.push('connection feels thin — send one voice note today, even a short one')
    if (isolation >= 7) parts.push('isolation is high — pick one structured social moment from the strategy library below')
    if (parts.length === 0) parts.push('everything is holding steady — keep your anchors and check in on a crewmate today')
    return parts
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-slide-up">

      {/* Header */}
      <div style={{ background: 'linear-gradient(150deg, #0a2a1e 0%, #155743 120%)', borderRadius: '22px', padding: 'clamp(1.5rem, 4vw, 2.25rem)' }}>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#5DCAA5', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.625rem' }}>🧭 Emotional support strategies</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.7rem, 4.5vw, 2.5rem)', color: 'white', fontWeight: 600, lineHeight: 1.15, marginBottom: '0.75rem' }}>Steady mind, steady ship</h1>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', color: '#9FE1CB', lineHeight: 1.85, maxWidth: '640px', fontWeight: 300 }}>
          Emotional life at sea runs in cycles — contracts, watches, seasons of missing home. These tools help you track those cycles daily, work through the challenges that come with them, and build a self-care plan that fits in a duffel bag.
        </p>
      </div>

      {/* Daily check-in */}
      <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#1D9E75', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Daily ritual — 60 seconds</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '6px' }}>Seafarer check-in</h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Four honest numbers, once a day. Over weeks you&apos;ll see your patterns — and patterns are what you can actually manage.
        </p>
        <div style={{ display: 'grid', gap: '1.1rem' }}>
          {[
            { label: 'Mood today', value: mood, set: setMood, low: 'Heavy', high: 'Light' },
            { label: 'Sleep quality', value: sleep, set: setSleep, low: 'Broken', high: 'Deep' },
            { label: 'Feeling connected to people I love', value: connection, set: setConnection, low: 'Distant', high: 'Close' },
            { label: 'How isolated I feel', value: isolation, set: setIsolation, low: 'Supported', high: 'Alone' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <label style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 600, color: '#706b5f', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</label>
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 700, color: '#1D9E75' }}>{s.value}/10</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', color: '#c8c4b5', minWidth: 48, textAlign: 'right' }}>{s.low}</span>
                <input type="range" min={1} max={10} value={s.value} onChange={e => s.set(Number(e.target.value))} style={{ flex: 1, accentColor: '#1D9E75' }} />
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', color: '#c8c4b5', minWidth: 48 }}>{s.high}</span>
              </div>
            </div>
          ))}
          <div>
            <label className="label">What is hardest right now?</label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {challenges.map(c => (
                <button key={c.value} onClick={() => setChallenge(c.value)}
                  style={{ fontFamily: 'Jost, sans-serif', fontSize: '11.5px', fontWeight: challenge === c.value ? 600 : 400, padding: '7px 12px', borderRadius: '50px', cursor: 'pointer', border: challenge === c.value ? '1.5px solid #1D9E75' : '1px solid #e8e4dc', background: challenge === c.value ? '#f0f7f4' : 'white', color: challenge === c.value ? '#186b52' : '#706b5f' }}>
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '0.875rem' }} className="grid-2">
            <div>
              <label className="label">Contract day</label>
              <input value={contractDay} onChange={e => setContractDay(e.target.value.replace(/\D/g, '').slice(0, 3))} className="input" placeholder="e.g. 84" inputMode="numeric" />
            </div>
            <div>
              <label className="label">One line about today (optional)</label>
              <input value={note} onChange={e => setNote(e.target.value)} className="input" placeholder="Today I…" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={saveCheckIn} disabled={savingCheck} className="btn-primary" style={{ fontSize: '13.5px' }}>{savingCheck ? 'Saving…' : 'Log today\'s check-in'}</button>
            {showBadge && <span className="badge badge-completed animate-fade">✓ Logged</span>}
          </div>
          {checkInInterpretation() && (
            <div className="animate-fade" style={{ background: '#f0f7f4', border: '1px solid #b3dbcd', borderRadius: '14px', padding: '1rem 1.1rem' }}>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, color: '#186b52', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Today&apos;s gentle guidance</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {checkInInterpretation()!.map((p, i) => (
                  <li key={i} style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#186b52', lineHeight: 1.65, display: 'flex', gap: '8px' }}><span>•</span><span>{p}</span></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Strategy library */}
      <div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '4px' }}>Strategy library</h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.7, marginBottom: '1rem' }}>
          Practical, ship-tested approaches for each challenge. Open the one you chose in your check-in — or read them all before you need them.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {(Object.keys(strategies) as Exclude<SeafarerChallenge, 'none'>[]).map(key => {
            const s = strategies[key]
            const open = openStrategy === key
            const meta = challenges.find(c => c.value === key)
            return (
              <div key={key} style={{ border: `1.5px solid ${open ? '#1D9E75' : '#e8e4dc'}`, borderRadius: '16px', background: open ? '#f8faf9' : 'white', overflow: 'hidden', transition: 'all 0.2s' }}>
                <button onClick={() => setOpenStrategy(open ? null : key)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem 1.1rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontSize: '1.3rem' }}>{meta?.icon}</span>
                  <span style={{ flex: 1, fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, color: '#1a1a18' }}>{s.title}</span>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', color: '#1D9E75' }}>{open ? '−' : '+'}</span>
                </button>
                {open && (
                  <div style={{ padding: '0 1.1rem 1.1rem', display: 'grid', gap: '0.625rem' }}>
                    {s.items.filter(it => it.name).map((it, i) => (
                      <div key={i} style={{ background: 'white', border: '1px solid #e8e4dc', borderRadius: '14px', padding: '0.85rem 1rem', display: 'flex', gap: '10px' }}>
                        <span style={{ fontSize: '1.15rem', flexShrink: 0 }}>{it.icon}</span>
                        <div>
                          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 600, color: '#1a1a18', marginBottom: '2px' }}>{it.name}</p>
                          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12.5px', color: '#5c574d', lineHeight: 1.65 }}>{it.how}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Ride the wave */}
      <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', background: 'linear-gradient(135deg, #f5f3ff 0%, #fdfcfa 100%)' }}>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#6d28d9', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Emotional regulation</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '6px' }}>Ride the wave 🌊</h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Strong emotions work like swell: they build, they crest, they fall. Fighting the wave exhausts you; riding it brings you through. Step through each move.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {waveSteps.map((w, i) => {
            const open = openWave === i
            return (
              <div key={w.title} style={{ border: `1px solid ${open ? '#c4b5fd' : '#e8e4dc'}`, borderRadius: '14px', background: 'white', overflow: 'hidden' }}>
                <button onClick={() => setOpenWave(open ? -1 : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '0.85rem 1rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 600, color: '#4c1d95' }}>{w.title}</span>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '15px', color: '#6d28d9' }}>{open ? '−' : '+'}</span>
                </button>
                {open && <p style={{ padding: '0 1rem 1rem', fontFamily: 'Jost, sans-serif', fontSize: '12.5px', color: '#5c574d', lineHeight: 1.7 }}>{w.desc}</p>}
              </div>
            )
          })}
        </div>
        <div className="flex flex-wrap gap-3" style={{ marginTop: '1.25rem' }}>
          <Link href="/dashboard/exercises" className="btn-secondary" style={{ fontSize: '12.5px', borderColor: '#6d28d9', color: '#6d28d9' }}>Pair with breathing exercises →</Link>
        </div>
      </div>

      {/* Self-care plan builder */}
      <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#1D9E75', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Carry it with you</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '6px' }}>Build my self-care plan</h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          Pick your daily anchors and the warning signs that mean you need to slow down. Save it — then when a rough patch comes, you don&apos;t have to think of a plan, only open one.
        </p>
        <label className="label">My daily anchors — choose 3 to 5</label>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {dailyPractices.map(p => {
            const active = selectedDaily.includes(p)
            return (
              <button key={p} onClick={() => toggle(selectedDaily, setSelectedDaily, p)}
                style={{ fontFamily: 'Jost, sans-serif', fontSize: '11.5px', fontWeight: active ? 600 : 400, padding: '7px 12px', borderRadius: '50px', cursor: 'pointer', border: active ? '1.5px solid #1D9E75' : '1px solid #e8e4dc', background: active ? '#f0f7f4' : 'white', color: active ? '#186b52' : '#706b5f' }}>
                {active ? '✓ ' : ''}{p}
              </button>
            )
          })}
        </div>
        <label className="label">My warning signs — the ones I actually show</label>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {warningSigns.map(p => {
            const active = selectedSigns.includes(p)
            return (
              <button key={p} onClick={() => toggle(selectedSigns, setSelectedSigns, p)}
                style={{ fontFamily: 'Jost, sans-serif', fontSize: '11.5px', fontWeight: active ? 600 : 400, padding: '7px 12px', borderRadius: '50px', cursor: 'pointer', border: active ? '1.5px solid #d4813a' : '1px solid #e8e4dc', background: active ? '#fdf8f3' : 'white', color: active ? '#92400e' : '#706b5f' }}>
                {active ? '⚠️ ' : ''}{p}
              </button>
            )
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={savePlan} disabled={savingPlan || selectedDaily.length === 0} className="btn-primary" style={{ fontSize: '13.5px' }}>
            {savingPlan ? 'Saving…' : `Save my plan${selectedDaily.length ? ` (${selectedDaily.length} anchors)` : ''}`}
          </button>
          {planSaved && <span className="badge badge-completed animate-fade">✓ Plan saved — your support contacts included</span>}
        </div>
      </div>

      {/* Peer support */}
      <div style={{ background: '#fafaf8', border: '1px solid #e8e4dc', borderRadius: '20px', padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '0.625rem' }}>Look out for your crewmates</h2>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          At sea, a crewmate often notices before family ever could. Here&apos;s what to watch for — and how to open a conversation without making it heavier.
        </p>
        <div className="grid-2">
          <div>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.625rem' }}>Signs worth a check-in</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {peerSigns.map(p => (
                <div key={p.sign} style={{ background: 'white', border: '1px solid #e8e4dc', borderRadius: '12px', padding: '0.7rem 0.9rem' }}>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12.5px', fontWeight: 600, color: '#1a1a18' }}>{p.sign}</p>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#706b5f', lineHeight: 1.55 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, color: '#186b52', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.625rem' }}>Openers that work</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                '"You\'ve been quiet this week. Everything okay on your side?"',
                '"I noticed you skipped lunch again. Want to grab something from the galley together?"',
                '"No pressure to talk — just know I\'m around if you want company on deck."',
                '"That was a rough incident. How are you holding up, honestly?"',
                '"I\'m not here to fix anything. I just didn\'t want you carrying it alone."',
              ].map((s, i) => (
                <div key={i} style={{ background: 'white', border: '1px solid #b3dbcd', borderRadius: '12px', padding: '0.7rem 0.9rem' }}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '13.5px', color: '#186b52', fontStyle: 'italic', lineHeight: 1.6 }}>&ldquo;{s.replace(/"/g, '')}&rdquo;</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#706b5f', lineHeight: 1.65, marginTop: '0.875rem' }}>
              If a crewmate mentions wanting to disappear or not waking up — take it seriously, stay with them, and raise it with the master or use a 24/7 helpline. Safety outranks discretion.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
