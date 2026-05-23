'use client'

const sessionTypes = [
  { value: 'individual', label: 'Individual session', icon: '🌿', desc: '60 min · Face-to-face or virtual', price: 'R 850' },
  { value: 'couples', label: 'Couples session', icon: '👥', desc: '90 min · Partners work together', price: 'R 1,200' },
  { value: 'crisis', label: 'Crisis session', icon: '🆘', desc: 'Same-day · Urgent support', price: 'Contact us' },
  { value: 'follow_up', label: 'Follow-up session', icon: '🔄', desc: '45 min · Check in & progress review', price: 'R 600' },
]

export default function ClientBookingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-slide-up">
      <div>
        <h1 className="font-display text-3xl text-sand-900 mb-1">Book a Session</h1>
        <p className="text-sand-400 text-sm">Schedule time with Gabonewe. All sessions are confidential and clinically informed.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sessionTypes.map(st => (
          <div key={st.value} className="card-hover p-5">
            <div className="text-2xl mb-3">{st.icon}</div>
            <h3 className="font-semibold text-sand-900 mb-1 text-sm">{st.label}</h3>
            <p className="text-xs text-sand-400 mb-3">{st.desc}</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sage-700 text-sm">{st.price}</span>
              <a href="tel:+27725778419" className="btn-primary text-xs py-1.5 px-3">Book now</a>
            </div>
          </div>
        ))}
      </div>
      <div className="card p-6 bg-sage-50 border-sage-200">
        <h2 className="font-semibold text-sage-800 mb-3">Contact Gabonewe directly</h2>
        <div className="space-y-2">
          <a href="tel:+27725778419" className="flex items-center gap-3 text-sm text-sage-700 hover:text-sage-900"><span>📞</span> +27 72 577 8419</a>
          <a href="mailto:therapy@app.businesshustle.co.za" className="flex items-center gap-3 text-sm text-sage-700 hover:text-sage-900"><span>📧</span> therapy@app.businesshustle.co.za</a>
        </div>
        <p className="text-xs text-sage-600 mt-4">SACSSP No: 10-20383 · Practice: 0987034 · Wheelchair accessible</p>
      </div>
    </div>
  )
}
