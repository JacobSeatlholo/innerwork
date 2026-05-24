'use client'
import { useState } from 'react'

const categories = [
  { id: 'breathe', label: 'Breathwork', emoji: '🌬️', color: '#4da586', bg: '#f0f7f4', border: '#b3dbcd' },
  { id: 'ground', label: 'Grounding', emoji: '🌱', color: '#186b52', bg: '#ecfdf5', border: '#6ee7b7' },
  { id: 'journal', label: 'Journaling', emoji: '📓', color: '#7c3aed', bg: '#f5f3ff', border: '#c4b5fd' },
  { id: 'body', label: 'Body & Movement', emoji: '🧘', color: '#b45309', bg: '#fffbeb', border: '#fcd34d' },
  { id: 'emotion', label: 'Emotional Release', emoji: '💧', color: '#1d4ed8', bg: '#eff6ff', border: '#93c5fd' },
  { id: 'connect', label: 'Connection', emoji: '🤝', color: '#be185d', bg: '#fdf2f8', border: '#f9a8d4' },
  { id: 'affirmation', label: 'Affirmations', emoji: '✨', color: '#92400e', bg: '#fdf8f3', border: '#fcd34d' },
  { id: 'mindful', label: 'Mindfulness', emoji: '🌙', color: '#0f172a', bg: '#f8fafc', border: '#cbd5e1' },
]

const exercises = [
  {
    id: 'box-breath',
    category: 'breathe',
    title: 'Box Breathing',
    subtitle: 'Calm your nervous system in 4 minutes',
    duration: '4 min',
    level: 'Beginner',
    emoji: '🟦',
    description: 'Used by Navy SEALs and therapists alike. Regulates the autonomic nervous system and reduces anxiety within minutes.',
    steps: [
      { label: 'Inhale', duration: 4, instruction: 'Breathe in slowly through your nose', color: '#1D9E75' },
      { label: 'Hold', duration: 4, instruction: 'Hold gently — no strain', color: '#7c3aed' },
      { label: 'Exhale', duration: 4, instruction: 'Release slowly through your mouth', color: '#1d4ed8' },
      { label: 'Hold', duration: 4, instruction: 'Rest in the empty space', color: '#be185d' },
    ],
    rounds: 4,
    science: 'Activates the parasympathetic nervous system, reducing cortisol and promoting calm.',
  },
  {
    id: '478-breath',
    category: 'breathe',
    title: '4-7-8 Breathing',
    subtitle: 'For sleep, panic, and emotional flooding',
    duration: '3 min',
    level: 'Beginner',
    emoji: '😮‍💨',
    description: 'Dr. Andrew Weil\'s technique for calming the mind quickly. Especially powerful before sleep or during panic.',
    steps: [
      { label: 'Inhale', duration: 4, instruction: 'Quiet inhale through nose', color: '#1D9E75' },
      { label: 'Hold', duration: 7, instruction: 'Hold the breath fully', color: '#7c3aed' },
      { label: 'Exhale', duration: 8, instruction: 'Long exhale through mouth — make a whoosh sound', color: '#1d4ed8' },
    ],
    rounds: 4,
    science: 'Stimulates the vagus nerve, triggering the relaxation response within 90 seconds.',
  },
  {
    id: '54321',
    category: 'ground',
    title: '5-4-3-2-1 Grounding',
    subtitle: 'Come back to the present moment',
    duration: '5 min',
    level: 'Beginner',
    emoji: '👁️',
    description: 'A sensory awareness technique that interrupts anxiety, dissociation, or emotional flooding by anchoring you to the present.',
    steps: [
      { label: '5 Things you can SEE', duration: 0, instruction: 'Look around. Name 5 things you can see right now. Really notice them.', color: '#1D9E75' },
      { label: '4 Things you can TOUCH', duration: 0, instruction: 'Feel the texture, temperature, weight of 4 objects near you.', color: '#7c3aed' },
      { label: '3 Things you can HEAR', duration: 0, instruction: 'Close your eyes. What 3 sounds can you identify?', color: '#b45309' },
      { label: '2 Things you can SMELL', duration: 0, instruction: 'Notice 2 scents — even subtle ones in the air.', color: '#1d4ed8' },
      { label: '1 Thing you can TASTE', duration: 0, instruction: 'Notice what\'s in your mouth right now. Just observe.', color: '#be185d' },
    ],
    rounds: 1,
    science: 'Redirects the brain\'s threat response by activating the sensory cortex — pulling you out of rumination.',
  },
  {
    id: 'body-scan',
    category: 'body',
    title: 'Body Scan',
    subtitle: 'Release where you hold tension',
    duration: '8 min',
    level: 'Intermediate',
    emoji: '🧘',
    description: 'A somatic awareness practice that helps you notice where emotions live in the body — and begin to release them.',
    steps: [
      { label: 'Settle', duration: 0, instruction: 'Sit or lie down. Close your eyes. Take 3 slow breaths.', color: '#1D9E75' },
      { label: 'Head & Face', duration: 0, instruction: 'Notice your jaw — is it clenched? Your forehead — furrowed? Soften deliberately.', color: '#7c3aed' },
      { label: 'Neck & Shoulders', duration: 0, instruction: 'This is where stress lives. Notice any holding. Breathe into it — don\'t force it to release.', color: '#b45309' },
      { label: 'Chest & Heart', duration: 0, instruction: 'Notice what lives here today. Tightness? Openness? Just observe with compassion.', color: '#be185d' },
      { label: 'Stomach & Gut', duration: 0, instruction: 'Your second brain. What is it holding? Anxiety often lives here as tension or nausea.', color: '#1d4ed8' },
      { label: 'Hands & Arms', duration: 0, instruction: 'Notice if your hands are clenched. Open them slowly. Feel the release.', color: '#1D9E75' },
      { label: 'Legs & Feet', duration: 0, instruction: 'Feel your weight — the ground beneath you. You are held. You are safe.', color: '#7c3aed' },
      { label: 'Return', duration: 0, instruction: 'Take a full breath in. Open your eyes slowly. Notice how you feel right now.', color: '#186b52' },
    ],
    rounds: 1,
    science: 'Trauma is stored somatically. Body scanning builds the capacity to tolerate sensation without dissociation.',
  },
  {
    id: 'mirror-work',
    category: 'affirmation',
    title: 'Mirror Work',
    subtitle: 'Rebuild your relationship with yourself',
    duration: '5 min',
    level: 'Vulnerable',
    emoji: '🪞',
    description: 'Pioneered by Louise Hay. Looking yourself in the eye and speaking kindly is one of the most powerful — and challenging — self-worth practices.',
    steps: [
      { label: 'Stand before a mirror', duration: 0, instruction: 'Find a private space. Stand or sit in front of a mirror. Take one breath.', color: '#1D9E75' },
      { label: 'Make eye contact', duration: 0, instruction: 'Look into your own eyes — not at your appearance. Just your eyes. Stay there.', color: '#7c3aed' },
      { label: 'Say your name', duration: 0, instruction: 'Say: "[Your name], I see you." Notice how that lands.', color: '#b45309' },
      { label: 'Speak kindly', duration: 0, instruction: 'Say: "I am doing my best. I deserve care. I am allowed to heal."', color: '#be185d' },
      { label: 'Stay with discomfort', duration: 0, instruction: 'If this feels ridiculous or painful — that\'s the work. Stay. Breathe.', color: '#1d4ed8' },
      { label: 'Close with gratitude', duration: 0, instruction: 'Say: "Thank you for still being here." Mean it.', color: '#186b52' },
    ],
    rounds: 1,
    science: 'Activates self-referential processing in the medial prefrontal cortex — rewiring negative self-perception over time.',
  },
  {
    id: 'anger-release',
    category: 'emotion',
    title: 'Physical Anger Release',
    subtitle: 'Move the charge out of your body safely',
    duration: '10 min',
    level: 'Intermediate',
    emoji: '🔥',
    description: 'Anger is energy. Suppressing it doesn\'t make it disappear — it gets stored in the body. This exercise moves it through safely.',
    steps: [
      { label: 'Set the container', duration: 0, instruction: 'Find a private space. Put on music if it helps. Tell yourself: this is safe and intentional.', color: '#dc2626' },
      { label: 'Name what you\'re angry about', duration: 0, instruction: 'Say it out loud, even quietly. "I am angry because..." Don\'t judge it.', color: '#b45309' },
      { label: 'Shake it out', duration: 0, instruction: 'Stand and shake your hands, arms, legs. Like shaking water off. Do this for 60 seconds.', color: '#1D9E75' },
      { label: 'Stomp or punch a pillow', duration: 0, instruction: 'Stomp your feet rhythmically, or punch a pillow hard. Make sound if you can — groan, growl, shout.', color: '#dc2626' },
      { label: 'Breathe it down', duration: 0, instruction: 'Stop. Put hands on knees. Take 5 long exhales. Longer out than in.', color: '#1d4ed8' },
      { label: 'Ground yourself', duration: 0, instruction: 'Sit down. Feel the floor. Drink water. Notice: your body processed something real just now.', color: '#186b52' },
    ],
    rounds: 1,
    science: 'Peter Levine\'s somatic experiencing: trauma and anger create incomplete survival responses. Physical completion discharges the stored charge.',
  },
  {
    id: 'letter-burn',
    category: 'emotion',
    title: 'The Unsent Letter Ritual',
    subtitle: 'Say everything. Send nothing (unless you choose to).',
    duration: '20 min',
    level: 'Deep',
    emoji: '💌',
    description: 'Write the letter you\'ve never been able to send. No editing, no softening, no explaining. Pure truth. Then decide what to do with it.',
    steps: [
      { label: 'Create space', duration: 0, instruction: 'Pen and paper preferred. Phone off. Private space. Light a candle if it helps.', color: '#7c3aed' },
      { label: 'Begin with: "What I\'ve never said..."', duration: 0, instruction: 'Write to the person, the version of yourself, or the situation. Let it be raw.', color: '#be185d' },
      { label: 'Write without stopping', duration: 0, instruction: 'Don\'t edit. Don\'t explain. Don\'t justify. Write for at least 10 minutes straight.', color: '#1d4ed8' },
      { label: 'Include what you needed', duration: 0, instruction: 'End with: "What I needed from you — and didn\'t get — was..." This is crucial.', color: '#b45309' },
      { label: 'Read it back to yourself', duration: 0, instruction: 'Out loud if possible. Witness your own truth.', color: '#1D9E75' },
      { label: 'Choose', duration: 0, instruction: 'Keep it, burn it, share it with your therapist, or — if it\'s safe and right — send it. Your choice.', color: '#186b52' },
    ],
    rounds: 1,
    science: 'James Pennebaker\'s research shows expressive writing reduces cortisol, improves immune function, and decreases rumination.',
  },
  {
    id: 'inner-child',
    category: 'journal',
    title: 'Inner Child Letter',
    subtitle: 'Give your younger self what they needed',
    duration: '15 min',
    level: 'Deep',
    emoji: '🧒',
    description: 'Many of our relational patterns were formed in childhood. This exercise builds a bridge between your adult wisdom and your younger wounds.',
    steps: [
      { label: 'Close your eyes', duration: 0, instruction: 'Think of yourself at a difficult age — 6, 8, 12. See them clearly. What did they look like? What were they carrying?', color: '#7c3aed' },
      { label: 'Write "Dear [your name at that age]..."', duration: 0, instruction: 'Begin the letter. Let your adult self speak to your younger self with the tenderness they deserved.', color: '#be185d' },
      { label: 'Acknowledge what was hard', duration: 0, instruction: 'Don\'t skip over the pain. Name it: "What happened to you was real, and it wasn\'t your fault."', color: '#1d4ed8' },
      { label: 'Offer what was missing', duration: 0, instruction: '"What I want you to know is that you were always enough. You deserved safety. You deserved love."', color: '#1D9E75' },
      { label: 'Make a promise', duration: 0, instruction: '"I, your adult self, will protect you by... I will give you what you needed by..."', color: '#b45309' },
      { label: 'Close with love', duration: 0, instruction: 'End the letter warmly. Sign it. Sit with what came up.', color: '#186b52' },
    ],
    rounds: 1,
    science: 'Schema therapy and IFS both show that reparenting the inner child rebuilds the foundation of self-worth and relational security.',
  },
  {
    id: 'gratitude-depth',
    category: 'affirmation',
    title: 'Deep Gratitude Practice',
    subtitle: 'Beyond "I\'m grateful for..." — into embodied appreciation',
    duration: '10 min',
    level: 'Beginner',
    emoji: '🌸',
    description: 'Surface gratitude lists don\'t rewire the brain. This practice goes deeper — into the felt sense of appreciation in the body.',
    steps: [
      { label: 'Sit quietly', duration: 0, instruction: 'Close your eyes. Take 3 breaths. Let the day settle.', color: '#1D9E75' },
      { label: 'Think of one person', duration: 0, instruction: 'Someone who showed up for you — recently or long ago. Don\'t rush. Let them come.', color: '#be185d' },
      { label: 'Feel it in your chest', duration: 0, instruction: 'Notice the warmth or softening that comes when you think of them. Stay with that physical feeling.', color: '#b45309' },
      { label: 'Say what they gave you', duration: 0, instruction: 'Speak out loud or write: "Because of you, I learned... / You gave me..."', color: '#7c3aed' },
      { label: 'Extend it to yourself', duration: 0, instruction: 'Now: "What did I do this week that deserves acknowledgement?" Sit with that too.', color: '#1d4ed8' },
      { label: 'Breathe it in', duration: 0, instruction: 'Take one slow breath and let the feeling expand. This is what neuroplasticity feels like.', color: '#186b52' },
    ],
    rounds: 1,
    science: 'Rick Hanson: the brain is Velcro for negative and Teflon for positive. Extended positive feeling (12+ seconds) creates lasting neural change.',
  },
  {
    id: 'tension-release',
    category: 'body',
    title: 'Progressive Muscle Relaxation',
    subtitle: 'Release stored tension systematically',
    duration: '12 min',
    level: 'Beginner',
    emoji: '💪',
    description: 'Tense and release each muscle group to teach your nervous system the difference between tension and safety.',
    steps: [
      { label: 'Lie down', duration: 0, instruction: 'Find a comfortable position. Close your eyes. Take 3 deep breaths.', color: '#1D9E75' },
      { label: 'Hands & Arms', duration: 0, instruction: 'Clench both fists tightly for 5 seconds. Feel the tension. Then release completely. Notice the difference.', color: '#7c3aed' },
      { label: 'Face', duration: 0, instruction: 'Scrunch your entire face — eyes, nose, mouth — for 5 seconds. Release. Feel the warmth spread.', color: '#b45309' },
      { label: 'Shoulders', duration: 0, instruction: 'Raise shoulders to your ears. Hold 5 seconds. Drop. This is where anxiety lives.', color: '#be185d' },
      { label: 'Stomach', duration: 0, instruction: 'Pull your stomach in tight. Hold. Release. Breathe into the belly fully now.', color: '#1d4ed8' },
      { label: 'Legs & Feet', duration: 0, instruction: 'Flex both feet, tighten legs. Hold 5 seconds. Release. Feel your body melt into the surface.', color: '#1D9E75' },
      { label: 'Full body scan', duration: 0, instruction: 'Lie still. Notice the difference between now and when you started. Your nervous system just learned safety.', color: '#186b52' },
    ],
    rounds: 1,
    science: 'Edmund Jacobson\'s technique: reduces cortisol, lowers blood pressure, and teaches the nervous system to recognise and release tension patterns.',
  },
]

const levelColors: Record<string, { bg: string; text: string }> = {
  'Beginner': { bg: '#f0f7f4', text: '#186b52' },
  'Intermediate': { bg: '#fffbeb', text: '#92400e' },
  'Deep': { bg: '#f5f3ff', text: '#6d28d9' },
  'Vulnerable': { bg: '#fdf2f8', text: '#9d174d' },
}

function BreathingExercise({ exercise, onClose }: { exercise: typeof exercises[0]; onClose: () => void }) {
  const [phase, setPhase] = useState(0)
  const [round, setRound] = useState(1)
  const [count, setCount] = useState(exercise.steps[0].duration || 0)
  const [active, setActive] = useState(false)
  const [done, setDone] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  function start() {
    setActive(true)
    if (exercise.steps[0].duration > 0) {
      countdown(0, 1)
    }
  }

  function countdown(stepIdx: number, roundNum: number) {
    const step = exercise.steps[stepIdx]
    if (!step.duration) {
      setActive(false)
      return
    }
    let c = step.duration
    setCount(c)
    setStepIndex(stepIdx)
    const interval = setInterval(() => {
      c--
      setCount(c)
      if (c <= 0) {
        clearInterval(interval)
        const nextStep = stepIdx + 1
        if (nextStep < exercise.steps.length) {
          setTimeout(() => countdown(nextStep, roundNum), 400)
        } else if (roundNum < exercise.rounds) {
          setRound(roundNum + 1)
          setTimeout(() => countdown(0, roundNum + 1), 600)
        } else {
          setDone(true)
          setActive(false)
        }
      }
    }, 1000)
  }

  const currentStep = exercise.steps[stepIndex]

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,42,30,0.92)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', maxWidth: '440px', width: '100%', textAlign: 'center' }}>
        <button onClick={onClose} style={{ float: 'right', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#afa99a' }}>✕</button>
        <div style={{ clear: 'both' }} />

        {done ? (
          <div>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✨</div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Well done.</h2>
            <p style={{ color: '#8e887a', fontSize: '14px', lineHeight: 1.6, marginBottom: '1.5rem' }}>You just completed {exercise.rounds} round{exercise.rounds > 1 ? 's' : ''} of {exercise.title}. Your nervous system is grateful.</p>
            <button onClick={onClose} className="btn-primary" style={{ width: '100%' }}>Return to exercises</button>
          </div>
        ) : (
          <div>
            <p style={{ color: '#afa99a', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Round {round} of {exercise.rounds}</p>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', marginBottom: '0.25rem' }}>{exercise.title}</h2>

            <div style={{
              width: '160px', height: '160px', borderRadius: '50%', margin: '1.5rem auto',
              background: `radial-gradient(circle, ${currentStep?.color}22 0%, ${currentStep?.color}44 100%)`,
              border: `3px solid ${currentStep?.color}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.5s ease',
              animation: active ? 'breathe 1s ease-in-out infinite' : 'none',
            }}>
              {active && currentStep?.duration > 0 ? (
                <>
                  <span style={{ fontSize: '2.5rem', fontWeight: '600', color: currentStep?.color }}>{count}</span>
                  <span style={{ fontSize: '12px', color: currentStep?.color, fontWeight: '500' }}>{currentStep?.label}</span>
                </>
              ) : (
                <span style={{ fontSize: '2rem' }}>{exercise.emoji}</span>
              )}
            </div>

            {active && currentStep && (
              <p style={{ color: '#706b5f', fontSize: '14px', lineHeight: 1.6, marginBottom: '1.5rem', minHeight: '42px' }}>
                {currentStep.instruction}
              </p>
            )}

            {!active && !done && (
              <>
                <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                  {exercise.steps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f5f3ef' }}>
                      <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: step.color + '22', border: `1.5px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', color: step.color, flexShrink: 0 }}>{step.duration || '→'}</span>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: '500', color: '#4c4841' }}>{step.label}</p>
                        <p style={{ fontSize: '11px', color: '#afa99a' }}>{step.instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={start} className="btn-primary" style={{ width: '100%', padding: '14px' }}>
                  Begin exercise →
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ExercisesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeExercise, setActiveExercise] = useState<typeof exercises[0] | null>(null)

  const filtered = activeCategory === 'all' ? exercises : exercises.filter(e => e.category === activeCategory)
  const cat = categories.find(c => c.id === activeCategory)

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }} className="animate-slide-up">
      {activeExercise && <BreathingExercise exercise={activeExercise} onClose={() => setActiveExercise(null)} />}

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0a2a1e 0%, #0d3d2b 60%, #1a5c40 100%)', borderRadius: '20px', padding: '2rem', marginBottom: '2rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(29,158,117,0.1)' }} />
        <p style={{ color: '#9FE1CB', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Home Wellness Practice</p>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>Healing Exercises</h1>
        <p style={{ color: '#9FE1CB', fontSize: '14px', lineHeight: 1.6, maxWidth: '500px' }}>
          Clinically informed practices you can do anywhere — for your nervous system, your emotions, and your inner world.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          {[{n:'10', l:'Exercises'},{n:'5', l:'Categories'},{n:'3-20', l:'Minutes each'},{n:'Free', l:'Always'}].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#5DCAA5' }}>{s.n}</div>
              <div style={{ fontSize: '11px', color: '#9FE1CB' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <button onClick={() => setActiveCategory('all')}
          style={{ padding: '8px 16px', borderRadius: '20px', border: `1.5px solid ${activeCategory === 'all' ? '#1D9E75' : '#dddad0'}`, background: activeCategory === 'all' ? '#1D9E75' : 'white', color: activeCategory === 'all' ? 'white' : '#8e887a', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s' }}>
          All exercises
        </button>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            style={{ padding: '8px 16px', borderRadius: '20px', border: `1.5px solid ${activeCategory === cat.id ? cat.color : '#dddad0'}`, background: activeCategory === cat.id ? cat.bg : 'white', color: activeCategory === cat.id ? cat.color : '#8e887a', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s' }}>
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Exercise grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {filtered.map(ex => {
          const exCat = categories.find(c => c.id === ex.category)!
          const level = levelColors[ex.level] || levelColors['Beginner']
          return (
            <div key={ex.id}
              onClick={() => setActiveExercise(ex)}
              style={{ background: 'white', borderRadius: '16px', border: '1px solid #eceae3', padding: '1.25rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.borderColor = exCat.border }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = '#eceae3' }}
            >
              {/* Top bar colour */}
              <div style={{ height: '4px', borderRadius: '2px', background: exCat.color, marginBottom: '1rem', opacity: 0.6 }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '2rem' }}>{ex.emoji}</span>
                <div style={{ display: 'flex', gap: '6px', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '10px', fontWeight: '500', padding: '3px 8px', borderRadius: '12px', background: level.bg, color: level.text }}>{ex.level}</span>
                  <span style={{ fontSize: '10px', color: '#afa99a' }}>⏱ {ex.duration}</span>
                </div>
              </div>

              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: '#4c4841', marginBottom: '4px', lineHeight: 1.3 }}>{ex.title}</h3>
              <p style={{ fontSize: '12px', color: exCat.color, fontWeight: '500', marginBottom: '8px' }}>{ex.subtitle}</p>
              <p style={{ fontSize: '12px', color: '#8e887a', lineHeight: 1.6, marginBottom: '1rem' }}>{ex.description.slice(0, 100)}…</p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '20px', background: exCat.bg, color: exCat.color, border: `1px solid ${exCat.border}` }}>
                  {exCat.emoji} {exCat.label}
                </span>
                <span style={{ fontSize: '12px', color: '#1D9E75', fontWeight: '500' }}>{ex.steps.length} steps →</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Science note */}
      <div style={{ marginTop: '2rem', background: '#fdf8f3', borderRadius: '16px', padding: '1.25rem', border: '1px solid #ecc088' }}>
        <p style={{ fontSize: '12px', color: '#92400e', lineHeight: 1.7 }}>
          <strong>A note on these practices:</strong> These exercises are clinically informed but not a substitute for professional therapy. 
          If you find an exercise activates strong emotions, slow down — that is normal. Work with your Gabonewe practitioner to go deeper. 
          The goal is titration, not flooding.
        </p>
      </div>
    </div>
  )
}
