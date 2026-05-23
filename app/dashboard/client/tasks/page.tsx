'use client'
import { useState } from 'react'

type TaskCategory = 'accountability' | 'closure' | 'communication' | 'self_care' | 'couples' | 'boundary' | 'healing' | 'spiritual' | 'gratitude'

const taskTemplates: Record<TaskCategory, { title: string; desc: string }[]> = {
  accountability: [
    { title: 'Write an accountability letter', desc: 'Write honestly about your role in a conflict — no justifications, just ownership.' },
    { title: 'Identify one pattern to break', desc: 'Name a repeating behaviour and commit to one concrete change this week.' },
    { title: 'Make a repair attempt', desc: 'Reach out to someone you\'ve hurt with sincere acknowledgement — no conditions.' },
    { title: 'Complete a shadow inventory', desc: 'List 3 qualities you criticise in others that may reflect something in yourself.' },
  ],
  closure: [
    { title: 'Write an unsent letter', desc: 'Say everything you\'ve never been able to say — you choose if it gets sent.' },
    { title: 'Create a goodbye ritual', desc: 'Design a meaningful ritual to mark the end of a chapter in your life.' },
    { title: 'Grieve what was never named', desc: 'Journal about a loss — a relationship, a version of yourself — you haven\'t fully honoured.' },
  ],
  communication: [
    { title: 'Practice "I feel" statements', desc: 'In your next conflict, replace blame with "I feel __ when __ because __."' },
    { title: 'Ask one vulnerable question', desc: 'Ask your partner, friend, or family member something you\'ve been afraid to ask.' },
    { title: 'Active listening exercise', desc: 'In your next conversation, listen to understand — not to respond. Note what you learn.' },
  ],
  self_care: [
    { title: 'Rest without guilt', desc: 'Give yourself one hour this week of genuine rest — no productivity required.' },
    { title: 'Body scan practice', desc: 'Spend 10 minutes noticing where you hold tension in your body. Breathe into it.' },
    { title: 'Nourish your nervous system', desc: 'Identify one daily practice that calms your system — and commit to 7 days.' },
  ],
  couples: [
    { title: 'The appreciation ritual', desc: 'Each day for 7 days, share one specific thing you appreciate about your partner.' },
    { title: 'Conflict mapping together', desc: 'Together, map your last conflict: triggers, reactions, needs. No blame — just understanding.' },
    { title: 'Shared vision exercise', desc: 'Independently write your vision for the relationship in 1 year — then compare and discuss.' },
    { title: 'The love languages audit', desc: 'Both partners answer: "I feel most loved when..." and "I often give love by..." Then share.' },
  ],
  boundary: [
    { title: 'Identify a boundary you\'ve been avoiding', desc: 'Name one relationship where you need to set a boundary. Write what it is.' },
    { title: 'Practice saying no', desc: 'This week, say no to one request that doesn\'t align with your needs — without over-explaining.' },
    { title: 'Define your non-negotiables', desc: 'Write the 5 things you will no longer compromise on in relationships or work.' },
  ],
  healing: [
    { title: 'Reparenting exercise', desc: 'Write a letter from your adult self to your younger self who needed protection.' },
    { title: 'Identify your core wounds', desc: 'Reflect on which of these resonates: abandonment, rejection, humiliation, betrayal, injustice.' },
    { title: 'Track your triggers this week', desc: 'When you feel triggered, note: what happened, what you felt, what you needed.' },
  ],
  spiritual: [
    { title: 'Morning intention setting', desc: 'Each morning, set one intention for how you want to show up — spiritually and emotionally.' },
    { title: 'Gratitude meditation', desc: 'Spend 10 minutes in quiet gratitude — for breath, for growth, for what is still here.' },
    { title: 'Connect to your values', desc: 'List your top 5 values. Reflect on whether your actions are aligned with them this week.' },
  ],
  gratitude: [
    { title: '7-day gratitude practice', desc: 'Each evening, write 3 specific things you\'re grateful for — no repeats across the week.' },
    { title: 'Thank someone meaningfully', desc: 'Write a sincere thank-you — in person, letter, or message — to someone who shaped you.' },
    { title: 'Gratitude for the hard things', desc: 'Reflect on one painful experience and find one thing it gave you.' },
  ],
}

const categoryColors: Record<TaskCategory, string> = {
  accountability: 'bg-red-50 text-red-700 border-red-200',
  closure: 'bg-purple-50 text-purple-700 border-purple-200',
  communication: 'bg-blue-50 text-blue-700 border-blue-200',
  self_care: 'bg-sage-50 text-sage-700 border-sage-200',
  couples: 'bg-pink-50 text-pink-700 border-pink-200',
  boundary: 'bg-orange-50 text-orange-700 border-orange-200',
  healing: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  spiritual: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  gratitude: 'bg-teal-50 text-teal-700 border-teal-200',
}

interface LocalTask {
  id: string
  title: string
  desc: string
  category: TaskCategory
  status: 'pending' | 'in_progress' | 'completed'
  reflection: string
  addedAt: string
}

export default function TasksPage() {
  const [activeCategory, setActiveCategory] = useState<TaskCategory>('accountability')
  const [myTasks, setMyTasks] = useState<LocalTask[]>([])
  const [reflections, setReflections] = useState<Record<string, string>>({})

  function addTask(template: { title: string; desc: string }) {
    const task: LocalTask = {
      id: crypto.randomUUID(),
      title: template.title,
      desc: template.desc,
      category: activeCategory,
      status: 'pending',
      reflection: '',
      addedAt: new Date().toISOString(),
    }
    setMyTasks(prev => [task, ...prev])
  }

  function updateStatus(id: string, status: LocalTask['status']) {
    setMyTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
  }

  function saveReflection(id: string) {
    setMyTasks(prev => prev.map(t => t.id === id ? { ...t, reflection: reflections[id] || '' } : t))
  }

  const pending = myTasks.filter(t => t.status !== 'completed')
  const completed = myTasks.filter(t => t.status === 'completed')

  return (
    <div className="space-y-8 animate-slide-up">
      <div>
        <h1 className="font-display text-3xl text-sand-900 mb-1">Accountability Tasks</h1>
        <p className="text-sand-400 text-sm">Therapeutic exercises to do alone, with a partner, or with your practitioner.</p>
      </div>

      {/* My active tasks */}
      {pending.length > 0 && (
        <div className="card p-5">
          <h2 className="font-semibold text-sand-900 mb-4">My active tasks ({pending.length})</h2>
          <div className="space-y-4">
            {pending.map(task => (
              <div key={task.id} className="border border-sand-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`badge text-xs border ${categoryColors[task.category]}`}>{task.category.replace('_', ' ')}</span>
                      <span className={`badge text-xs ${task.status === 'in_progress' ? 'badge-pending' : 'badge-sand'}`}>{task.status.replace('_', ' ')}</span>
                    </div>
                    <p className="font-medium text-sand-900 text-sm">{task.title}</p>
                    <p className="text-xs text-sand-400 mt-0.5">{task.desc}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => updateStatus(task.id, 'in_progress')} className="text-xs btn-secondary py-1 px-2">In progress</button>
                    <button onClick={() => updateStatus(task.id, 'completed')} className="text-xs btn-primary py-1 px-2">Done ✓</button>
                  </div>
                </div>
                <div className="mt-3">
                  <textarea
                    className="textarea text-xs min-h-[60px]"
                    placeholder="Add your reflection on this task…"
                    value={reflections[task.id] || ''}
                    onChange={e => setReflections(prev => ({ ...prev, [task.id]: e.target.value }))}
                  />
                  <button onClick={() => saveReflection(task.id)} className="text-xs text-sage-600 mt-1 hover:underline">Save reflection</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Task library */}
      <div>
        <h2 className="font-semibold text-sand-900 mb-3">Task library — add to your journey</h2>
        <div className="flex gap-2 flex-wrap mb-5">
          {(Object.keys(taskTemplates) as TaskCategory[]).map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all capitalize ${activeCategory === cat ? `${categoryColors[cat]} font-semibold` : 'bg-white text-sand-500 border-sand-200 hover:border-sand-300'}`}>
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {taskTemplates[activeCategory].map(template => (
            <div key={template.title} className="card-hover p-5 flex flex-col gap-3">
              <div>
                <p className="font-medium text-sand-900 text-sm mb-1">{template.title}</p>
                <p className="text-xs text-sand-400 leading-relaxed">{template.desc}</p>
              </div>
              <button onClick={() => addTask(template)} className="btn-secondary text-xs py-1.5 self-start">
                + Add to my tasks
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Completed */}
      {completed.length > 0 && (
        <div className="card p-5">
          <h2 className="font-semibold text-sand-900 mb-4">Completed ({completed.length})</h2>
          <div className="space-y-2">
            {completed.map(task => (
              <div key={task.id} className="flex items-center gap-3 py-2 border-b border-sand-100 last:border-0">
                <span className="text-sage-500">✓</span>
                <div className="flex-1">
                  <p className="text-sm text-sand-600 line-through">{task.title}</p>
                  {task.reflection && <p className="text-xs text-sand-400 mt-0.5">{task.reflection}</p>}
                </div>
                <span className={`badge text-xs border ${categoryColors[task.category]}`}>{task.category.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
