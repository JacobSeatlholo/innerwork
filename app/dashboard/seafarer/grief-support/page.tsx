'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { GriefLetterType } from '@/types'

type Tab = 'seafarer' | 'family'

const ritualCards = [
  { icon: '🔕', title: 'A minute of watch silence', desc: 'Agree with the officer of the watch on a minute of silence at a fixed time — end of the evening watch, or the minute your loved one passed. Mark it deliberately: stop, breathe, look at the sea, then carry on. Rituals give grief a container.' },
  { icon: '🌊', title: 'A ceremony at the rail', desc: 'With the master\'s permission and where safe and lawful: lower a flower or biodegradable wreath at a chosen latitude/longitude, or hold a short reading on deck with crew. For many seafarers, being marked at the sea is the only funeral they can attend.' },
  { icon: '✉️', title: 'Write what you could not say', desc: 'Use the grief letter tool below. Unfinished conversations are the sharpest part of distant grief — writing closes nothing, but it opens everything you needed to say.' },
  { icon: '📞', title: 'Plan the connection, not just the call', desc: 'Schedule the call with family before the funeral or memorial, not instead of it. Ask them to describe the service; light a candle in your cabin during it. Shared ritual across distance is a real bond, not a substitute one.' },
  { icon: '🕯️', title: 'Anniversary watches', desc: 'Birthdays, the anniversary of the passing, seafarers\' Day of the Seafarer (25 June). Put them in the calendar now — grief lands harder when it ambushes you mid-contract.' },
  { icon: '🤝', title: 'Tell your senior', desc: 'Tell your head of department or the master what you are carrying. Most companies can adjust duties for a period — but only if they know. Silence forces you to grieve at operational intensity.' },
]

const letterTypes: { value: GriefLetterType; label: string; hint: string }[] = [
  { value: 'unfinished_conversation', label: 'Unfinished conversation', hint: 'What would you tell them if the call had not dropped, if you had one more watch together?' },
  { value: 'goodbye', label: 'The goodbye', hint: 'The goodbye you never got to say in person. Say it here, exactly as you would have.' },
  { value: 'gratitude', label: 'Gratitude', hint: 'What they gave you, taught you, or changed in you. Gratitude turns ache into tribute.' },
  { value: 'anniversary', label: 'Anniversary / memorial', hint: 'For the hard dates. Write it now so the date does not find you empty-handed.' },
  { value: 'continuing_bonds', label: 'Continuing bonds', hint: 'Grief research is clear: you do not have to "let go" to heal. Write about how they remain with you.' },
]

const crewmateDo = [
  'Say their person\'s name. Silence tells the grieving crewmate their loss makes others uncomfortable.',
  '"I heard about your mom. I am so sorry. I am here if you want to talk — or to sit."',
  'Cover small things: a meal from the galley, one hour of their cleaning duty, a walk on deck.',
  'Check in on the hard dates too — the funeral day, the birthday. Those are the days no one else remembers.',
  'Keep them included in watch banter and meals without forcing cheer. Belonging soothes grief.',
]

const crewmateDont = [
  '"At least he died doing what he loved" — or any sentence that starts with "at least".',
  '"You need to be strong" — strength is not the same as silence.',
  'Pressuring them to talk before they are ready. Availability, not interrogation.',
  'Disappearing because you don\'t know what to say. Awkward presence beats polished absence.',
]

const familyIntervention = [
  { icon: '📨', title: 'Step 1 — Timely, honest, human notification', desc: 'If the worst has happened, families need verified information fast — from a named human being, not a chain of forwards. Companies should designate one consistent contact person, use plain language, and never let a family learn critical details from social media or rumour. Families: you are entitled to ask exactly who is informing you and how to reach them again.' },
  { icon: '🛂', title: 'Step 2 — Practical scaffolding', desc: 'Repatriation, documents, insurance, salary continuance, transport of belongings, funeral logistics across borders — grief becomes twice as heavy when it is administrative. Families should keep a single file with the vessel name, IMN, employer contacts, and union/welfare references. Crew managers: assign someone to walk the family through each document — one task at a time, never all at once.' },
  { icon: '🕯️', title: 'Step 3 — Grief support that fits the family', desc: 'Offer — do not prescribe — counselling, peer support groups, and chaplaincy. Some families want structured therapy in the first month; others need six months before they can speak about it. Both are normal. The intervention is making help visible, free of stigma, and easy to accept when they are ready.' },
  { icon: '🎈', title: 'Step 4 — Children and the whole household', desc: 'Children need age-appropriate truth: clear words ("died" rather than "we lost him"), reassurance about who will care for them, and permission to grieve in their own way — including playing and laughing. Keep school and home routines running; predictability is a stabiliser for grieving children.' },
  { icon: '📅', title: 'Step 5 — The long tail of grief', desc: 'The world moves on after the funeral; the family does not. Mark the first-month, six-month and anniversary points with a call or visit. Anniversary reactions can bring grief back in full force — pre-planned check-ins turn those dates from ambushes into memorials. Invite the family to ship memorials, remembrance days, and seafarer commemorative events where possible.' },
  { icon: '🤲', title: 'Step 6 — Community and continuing bonds', desc: 'Connect families with other maritime families who understand the life — the sea is a hard thing to explain to people ashore. Encourage rituals that keep the person present: naming a bench, a bursary, an annual sail, keeping their photo on the next vessel\'s bridge if the family wishes.' },
]

const familySelfCare = [
  { icon: '🌅', title: 'Let grief come in waves', desc: 'Grief is not a straight line of "stages". Good days after bad weeks are not betrayal — they are recovery. Ride the waves instead of judging them.' },
  { icon: '🥣', title: 'Protect the basics', desc: 'Sleep, food, water, a walk outside. Grief is physically exhausting; the body needs maintenance before the heart can do its work.' },
  { icon: '🗣️', title: 'Say their name at the table', desc: 'Families who keep talking about the person — stories, faults, jokes — tend to heal with stronger bonds than families where the name becomes taboo.' },
  { icon: '👥', title: 'Accept the crew\'s care', desc: 'Shipmates of your seafarer often want to help and don\'t know how. Let them: a visit, a call, help with the paperwork. Their care is part of his or her legacy.' },
  { icon: '🧾', title: 'One task at a time', desc: 'Admin after a death at sea can take months. Do the next task only. Ask your contact person to sequence it for you.' },
  { icon: '🆘', title: 'Know when to reach for help', desc: 'If grief brings thoughts of not wanting to be here, or months pass with no easing, contact a grief counsellor or the helplines on this platform immediately — that is a medical need, not a character failure.' },
]

const sampleTributes = [
  {
    id: 'sample-1', person_name: 'Chief Engineer Thabo M.', vessel_name: 'MV Meridian Star',
    relationship: 'crewmate', birth_year: 1968, passing_year: 2024,
    message: 'Thirty years at sea and he still came down to the engine room every morning humming. You taught me that a good engineer is a calm engineer. The main engine is running sweet, Chief. We watch over her the way you did.',
    visible_to_crew: true, created_at: new Date().toISOString(),
  },
  {
    id: 'sample-2', person_name: 'Maria D.', vessel_name: '',
    relationship: 'family', birth_year: 1941, passing_year: 2023,
    message: 'My mother waited for my calls every Sunday at 18:00, and never once complained when the connection dropped mid-sentence. This year I sailed past her hometown and she was with me the whole way. Obrigado for everything, Mãe.',
    visible_to_crew: true, created_at: new Date().toISOString(),
  },
]

export default function GriefSupportPage() {
  const [tab, setTab] = useState<Tab>('seafarer')
  const [tributes, setTributes] = useState<(typeof sampleTributes)[number][]>([])
  const [name, setName] = useState('')
  const [vessel, setVessel] = useState('')
  const [relationship, setRelationship] = useState('crewmate')
  const [birthYear, setBirthYear] = useState('')
  const [passingYear, setPassingYear] = useState('')
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(true)
  const [savingTribute, setSavingTribute] = useState(false)
  const [tributeSaved, setTributeSaved] = useState(false)

  const [letterType, setLetterType] = useState<GriefLetterType>('unfinished_conversation')
  const [letterTitle, setLetterTitle] = useState('')
  const [letterContent, setLetterContent] = useState('')
  const [savingLetter, setSavingLetter] = useState(false)
  const [letterSaved, setLetterSaved] = useState(false)

  useEffect(() => {
    async function loadTributes() {
      try {
        const supabase = createClient()
        const { data } = await supabase.from('memorial_tributes').select('*')
        if (data && data.length > 0) {
          setTributes(data)
          return
        }
      } catch {
        // Supabase not configured (mock client) or offline — fall through to samples
      }
      setTributes(sampleTributes)
    }
    loadTributes()
  }, [])

  async function saveTribute() {
    if (!name.trim() || !message.trim()) return
    setSavingTribute(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('memorial_tributes').insert({
      user_id: user?.id ?? null,
      person_name: name,
      vessel_name: vessel || null,
      relationship,
      birth_year: birthYear ? Number(birthYear) : null,
      passing_year: passingYear ? Number(passingYear) : null,
      message,
      visible_to_crew: visible,
    })
    setTributes(prev => [{
      id: `local-${Date.now()}`, person_name: name, vessel_name: vessel, relationship,
      birth_year: birthYear ? Number(birthYear) : 0, passing_year: passingYear ? Number(passingYear) : 0,
      message, visible_to_crew: visible, created_at: new Date().toISOString(),
    }, ...prev])
    setTributeSaved(true)
    setTimeout(() => setTributeSaved(false), 3500)
    setName(''); setVessel(''); setBirthYear(''); setPassingYear(''); setMessage('')
    setSavingTribute(false)
  }

  async function saveLetter() {
    if (!letterContent.trim()) return
    setSavingLetter(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('grief_letters').insert({
      user_id: user?.id ?? null,
      title: letterTitle || letterTypes.find(l => l.value === letterType)?.label,
      content: letterContent,
      letter_type: letterType,
      is_private: true,
    })
    setLetterSaved(true)
    setTimeout(() => setLetterSaved(false), 3500)
    setLetterTitle(''); setLetterContent('')
    setSavingLetter(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-slide-up">

      {/* Header */}
      <div style={{ background: 'linear-gradient(150deg, #1a1a18 0%, #29251f 70%, #4a3f2a 130%)', borderRadius: '22px', padding: 'clamp(1.5rem, 4vw, 2.25rem)' }}>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#d9b26a', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.625rem' }}>🕯️ Grief & family intervention</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.7rem, 4.5vw, 2.5rem)', color: 'white', fontWeight: 600, lineHeight: 1.15, marginBottom: '0.75rem' }}>Grief has no shore leave</h1>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', color: '#c9c2b2', lineHeight: 1.85, maxWidth: '640px', fontWeight: 300 }}>
          When a seafarer loses someone — or when a maritime family loses their seafarer — distance turns grief into a different kind of journey: no funeral to attend, no grave to visit, no shoulder within reach. This module supports both sides of that distance: seafarers grieving at sea, and the families ashore who carry loss.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {([['seafarer', '⚓ For seafarers grieving at sea'], ['family', '🏡 For grieving families ashore']] as [Tab, string][]).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: tab === id ? 600 : 400, padding: '10px 18px', borderRadius: '50px', cursor: 'pointer', transition: 'all 0.15s', border: tab === id ? '1.5px solid #1D9E75' : '1px solid #e8e4dc', background: tab === id ? '#f0f7f4' : 'white', color: tab === id ? '#186b52' : '#706b5f' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'seafarer' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-fade">

          {/* Why distant grief is different */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', borderLeft: '5px solid #d4813a' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '0.625rem' }}>Why grieving at sea cuts deeper</h2>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#5c574d', lineHeight: 1.85, marginBottom: '0.75rem' }}>
              Humans process loss through ritual — the funeral, the graveyard visit, the embrace of a neighbour. A seafarer usually gets none of these. The news arrives by satellite phone, mid-contract, between two watches. You stand your duties hours later because the ship does not stop for grief. There is no procession to join, no casserole on the doorstep, no grave to tend. Grief researchers call this <em>disenfranchised grief</em>: loss that has no recognised place to be expressed.
            </p>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#5c574d', lineHeight: 1.85 }}>
              The way through is not to suppress it — it is to build your own rituals at sea. Distance changes grief; it does not disqualify you from grieving fully. Everything below exists to help you do that.
            </p>
          </div>

          {/* Rituals from afar */}
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '0.875rem' }}>Rituals from afar — making grief a place at the table</h2>
            <div className="grid-3">
              {ritualCards.map(r => (
                <div key={r.title} className="feature-card" style={{ background: '#fdf8f3', border: '1.5px solid #fcd34d' }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.625rem' }}>{r.icon}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, color: '#1a1a18', marginBottom: '5px' }}>{r.title}</h3>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12.5px', color: '#5c574d', lineHeight: 1.7 }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Memorial wall */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#1D9E75', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Digital memorial wall</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '6px' }}>Remember them here</h2>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              A quiet corner of the internet for the people the maritime world lost. Add a tribute for a crewmate, a family member, anyone you carry with you. You may keep it private or share it so other seafarers can remember them too.
            </p>

            <div style={{ display: 'grid', gap: '0.875rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }} className="grid-2">
                <div>
                  <label className="label">Their name *</label>
                  <input value={name} onChange={e => setName(e.target.value)} className="input" placeholder="Who are you remembering?" />
                </div>
                <div>
                  <label className="label">Vessel / connection</label>
                  <input value={vessel} onChange={e => setVessel(e.target.value)} className="input" placeholder="MV …, or 'my mother'" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.875rem' }} className="grid-2">
                <div>
                  <label className="label">Relationship</label>
                  <select value={relationship} onChange={e => setRelationship(e.target.value)} className="input" style={{ appearance: 'none' }}>
                    <option value="crewmate">Crewmate</option>
                    <option value="family">Family</option>
                    <option value="friend">Friend</option>
                    <option value="colleague">Colleague</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="label">Born (year)</label>
                  <input value={birthYear} onChange={e => setBirthYear(e.target.value.replace(/\D/g, '').slice(0, 4))} className="input" placeholder="1958" inputMode="numeric" />
                </div>
                <div>
                  <label className="label">Passed (year)</label>
                  <input value={passingYear} onChange={e => setPassingYear(e.target.value.replace(/\D/g, '').slice(0, 4))} className="input" placeholder="2024" inputMode="numeric" />
                </div>
              </div>
              <div>
                <label className="label">Your tribute *</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} className="textarea" rows={4} placeholder="A memory, what they meant to you, something you want the sea to hold." />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={visible} onChange={e => setVisible(e.target.checked)} style={{ width: 16, height: 16, accentColor: '#1D9E75' }} />
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#5c574d' }}>Show this tribute on the shared memorial wall</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {tributeSaved && <span className="badge badge-completed animate-fade">✓ Tribute added</span>}
                  <button onClick={saveTribute} disabled={savingTribute || !name.trim() || !message.trim()} className="btn-primary" style={{ fontSize: '13px' }}>
                    {savingTribute ? 'Adding…' : 'Add to memorial wall'}
                  </button>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f0ede8', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {tributes.map(t => (
                <div key={t.id} className="animate-fade" style={{ background: 'linear-gradient(135deg, #fdf8f3 0%, #fdfcfa 100%)', border: '1px solid #f0e6d2', borderRadius: '16px', padding: '1.1rem 1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, color: '#1a1a18' }}>🕯️ {t.person_name}</p>
                      <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', color: '#92400e', fontWeight: 500, letterSpacing: '0.04em' }}>
                        {t.vessel_name ? `${t.vessel_name} · ` : ''}{t.relationship}{t.birth_year && t.passing_year ? ` · ${t.birth_year}–${t.passing_year}` : ''}
                      </p>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14.5px', color: '#3d3d3a', lineHeight: 1.7, fontStyle: 'italic' }}>&ldquo;{t.message}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>

          {/* Grief letters */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#1D9E75', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Letters across the water</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '6px' }}>Write the letter you cannot send</h2>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#706b5f', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Choose a starting point. There is no length requirement and no correct tone — only honesty. Letters stay private on your account.
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {letterTypes.map(l => (
                <button key={l.value} onClick={() => setLetterType(l.value)}
                  style={{ fontFamily: 'Jost, sans-serif', fontSize: '11.5px', fontWeight: letterType === l.value ? 600 : 400, padding: '7px 13px', borderRadius: '50px', cursor: 'pointer', border: letterType === l.value ? '1.5px solid #1D9E75' : '1px solid #e8e4dc', background: letterType === l.value ? '#f0f7f4' : 'white', color: letterType === l.value ? '#186b52' : '#706b5f' }}>
                  {l.label}
                </button>
              ))}
            </div>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12.5px', color: '#706b5f', fontStyle: 'italic', marginBottom: '1rem' }}>{letterTypes.find(l => l.value === letterType)?.hint}</p>
            <div style={{ display: 'grid', gap: '0.875rem' }}>
              <input value={letterTitle} onChange={e => setLetterTitle(e.target.value)} className="input" placeholder="Title (optional) — e.g. 'Dad, from 14°S'" />
              <textarea value={letterContent} onChange={e => setLetterContent(e.target.value)} className="textarea" rows={7} placeholder="Dear …" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={saveLetter} disabled={savingLetter || !letterContent.trim()} className="btn-primary" style={{ fontSize: '13px' }}>
                  {savingLetter ? 'Saving…' : 'Save this letter'}
                </button>
                {letterSaved && <span className="badge badge-completed animate-fade">✓ Letter saved</span>}
              </div>
            </div>
          </div>

          {/* Crewmate support */}
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="feature-card" style={{ background: '#f0fdf4', border: '1.5px solid #86efac' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, color: '#166534', marginBottom: '0.75rem' }}>✅ When a crewmate is grieving</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {crewmateDo.map((d, i) => (
                  <li key={i} style={{ fontFamily: 'Jost, sans-serif', fontSize: '12.5px', color: '#14532d', lineHeight: 1.65, display: 'flex', gap: '8px' }}><span>•</span><span>{d}</span></li>
                ))}
              </ul>
            </div>
            <div className="feature-card" style={{ background: '#fef2f2', border: '1.5px solid #fecaca' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, color: '#991b1b', marginBottom: '0.75rem' }}>🚫 What to avoid</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {crewmateDont.map((d, i) => (
                  <li key={i} style={{ fontFamily: 'Jost, sans-serif', fontSize: '12.5px', color: '#7f1d1d', lineHeight: 1.65, display: 'flex', gap: '8px' }}><span>•</span><span>{d}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/bookings" className="btn-primary" style={{ fontSize: '13px' }}>Book a grief counselling session</Link>
            <Link href="/dashboard/seafarer#helplines" className="btn-secondary" style={{ fontSize: '13px' }}>24/7 helplines</Link>
          </div>
        </div>
      )}

      {tab === 'family' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="animate-fade">

          {/* Intro */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', borderLeft: '5px solid #d4813a' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '0.625rem' }}>When a maritime family loses their seafarer</h2>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#5c574d', lineHeight: 1.85, marginBottom: '0.75rem' }}>
              A death connected to the sea — at work on board, or a seafarer lost ashore — hits families with a particular weight: the person belonged to both the family and the ship, and the sea feels like a far-away country where the loss happened without you. This intervention pathway is written for three hands at once: the <strong>family</strong> living the loss, the <strong>company and crew</strong> who can carry practical weight, and the <strong>practitioner</strong> coordinating support.
            </p>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13.5px', color: '#5c574d', lineHeight: 1.85 }}>
              Each step below names what should happen, who does it, and what families are entitled to ask for. Grief cannot be fixed — but the loneliness, confusion and paperwork around it can be lifted by people acting deliberately.
            </p>
          </div>

          {/* Intervention pathway */}
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '0.875rem' }}>The family intervention pathway</h2>
            <div style={{ display: 'grid', gap: '0.875rem' }}>
              {familyIntervention.map(f => (
                <div key={f.title} style={{ background: 'white', border: '1px solid #e8e4dc', borderLeft: '4px solid #d4813a', borderRadius: '16px', padding: '1.1rem 1.25rem', boxShadow: '0 2px 8px rgba(10,42,30,0.04)' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{f.icon}</span>
                    <div>
                      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 600, color: '#1a1a18', marginBottom: '5px' }}>{f.title}</h3>
                      <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#5c574d', lineHeight: 1.75 }}>{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Family emotional strategies */}
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 600, color: '#1a1a18', marginBottom: '0.875rem' }}>Emotional support strategies for the family</h2>
            <div className="grid-3">
              {familySelfCare.map(f => (
                <div key={f.title} className="feature-card" style={{ background: '#fdf8f3', border: '1.5px solid #fcd34d' }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.625rem' }}>{f.icon}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, color: '#1a1a18', marginBottom: '5px' }}>{f.title}</h3>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12.5px', color: '#5c574d', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Company checklist */}
          <div className="card" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', background: 'linear-gradient(135deg, #0a2a1e 0%, #0d3d2b 100%)', border: 'none' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#5DCAA5', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Duty of care</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Company & crew checklist after a loss</h2>
            <div className="grid-2">
              {[
                'Designate ONE named family liaison and share their direct contact details on day one',
                'Verify facts before briefing the family — and brief them before anything reaches the media',
                'Arrange travel, documents and interpretation support for the family where required',
                'Clarify salary continuance, insurance, pension and repatriation timelines in writing',
                'Offer crew on board a critical-incident debrief within 72 hours',
                'Support crew who want to attend the funeral or send tributes ashore',
                'Fund or arrange grief counselling for the family — offer again at 1, 6 and 12 months',
                'Invite the family to the vessel\'s memorial service and remembrance days',
                'Follow up personally at the anniversary — not only in the first weeks',
                'Record lessons learned with welfare partners so the next family is supported faster',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '0.75rem 1rem' }}>
                  <span style={{ color: '#5DCAA5', fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12.5px', color: '#e8f5f0', lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/seafarer#helplines" className="btn-primary" style={{ fontSize: '13px' }}>Find support lines for families</Link>
            <Link href="/dashboard/bookings" className="btn-secondary" style={{ fontSize: '13px' }}>Book family counselling</Link>
          </div>
        </div>
      )}
    </div>
  )
}
