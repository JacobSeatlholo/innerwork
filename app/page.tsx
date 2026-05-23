import Link from 'next/link'

const features = [
  { icon: '🌿', title: 'Accountability Tools', desc: 'Guided frameworks to own your patterns and commit to meaningful change.' },
  { icon: '💌', title: 'Closure Letters', desc: 'Write what was never said. Heal through words — to others, or to yourself.' },
  { icon: '👥', title: 'Couples Space', desc: 'Shared check-ins, conflict maps, and guided tasks for partners to grow together.' },
  { icon: '📓', title: 'Reflective Journaling', desc: 'Therapeutic prompts to help you understand your inner emotional landscape.' },
  { icon: '🧭', title: 'Attachment Assessment', desc: 'Understand how you connect, and why — with a personalised healing pathway.' },
  { icon: '📅', title: 'Session Booking', desc: 'Book face-to-face or virtual sessions with Gabonewe directly on the platform.' },
]

const pillars = [
  { num: '01', title: 'Understand', desc: 'Uncover the emotional patterns shaping your relationships and decisions.' },
  { num: '02', title: 'Reflect', desc: 'Journal, assess, and map your inner world with guided therapeutic tools.' },
  { num: '03', title: 'Act', desc: 'Complete accountability tasks, write closure letters, and build new patterns.' },
  { num: '04', title: 'Heal', desc: 'Track progress, share with your practitioner, and sustain lasting change.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-sand-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sage-600 flex items-center justify-center text-white text-sm font-display font-bold">G</div>
            <div>
              <div className="text-sm font-semibold text-sand-900 leading-none">InnerWork</div>
              <div className="text-xs text-sand-400 leading-none">by Gabonewe</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm text-sand-600 hover:text-sand-900 transition-colors px-4 py-2">Sign in</Link>
            <Link href="/auth/signup" className="btn-primary text-sm py-2">Get started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-sage-950 via-sage-900 to-sage-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 30% 50%, #1D9E75 0%, transparent 50%), radial-gradient(circle at 80% 20%, #5DCAA5 0%, transparent 40%)'}} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-sage-800/60 border border-sage-700 text-sage-300 text-xs font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-400 animate-pulse" />
            SA&apos;s Leading Trauma-Informed Wellness Platform
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white leading-tight mb-6 text-balance">
            People can only meet others<br />
            <span className="text-sage-400 italic">as deeply as they&apos;ve met themselves.</span>
          </h1>
          <p className="text-sage-200 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            InnerWork is your sanctuary for emotional clarity — a therapeutic platform for accountability, closure, 
            and relational healing, built with the clinical depth of Gabonewe Projects.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="btn-primary px-8 py-3 text-base">
              Begin your inner work →
            </Link>
            <Link href="/auth/login" className="text-sage-300 hover:text-white transition-colors text-sm px-4 py-3">
              Already a client? Sign in
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-xs text-sage-500">
            <span>SACSSP No: 10-20383</span>
            <span>•</span>
            <span>Practice: 0987034</span>
            <span>•</span>
            <span>Clinically informed</span>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 px-6 bg-sand-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sage-600 text-xs font-medium uppercase tracking-widest mb-3">The framework</p>
            <h2 className="font-display text-3xl text-sand-900">How InnerWork guides you</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div key={p.num} className="text-center">
                <div className="text-3xl font-display text-sage-200 mb-2">{p.num}</div>
                <h3 className="font-display text-lg text-sand-900 mb-2">{p.title}</h3>
                <p className="text-sm text-sand-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sage-600 text-xs font-medium uppercase tracking-widest mb-3">What&apos;s inside</p>
            <h2 className="font-display text-3xl text-sand-900">Everything you need to heal and grow</h2>
            <p className="text-sand-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Designed for individuals, couples, and the practitioners who support them.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-hover p-6">
                <div className="text-2xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-sand-900 mb-2">{f.title}</h3>
                <p className="text-sm text-sand-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 px-6 bg-sage-950 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-sage-600 font-display text-5xl mb-4">&ldquo;</div>
          <p className="font-display text-2xl md:text-3xl text-white leading-relaxed mb-6">
            Our mission is not just to talk about change —<br className="hidden md:block" />
            <span className="text-sage-400"> we equip you with the tools to make it happen.</span>
          </p>
          <p className="text-sage-500 text-sm">Gabonewe Projects — Trusted corporate wellness facilitator</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl text-sand-900 mb-4">Ready to begin?</h2>
          <p className="text-sand-500 text-sm leading-relaxed mb-8">
            Join individuals and couples who are doing the deep work —<br />
            building healthier relationships, one honest conversation at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="btn-primary px-8 py-3 text-base text-center">Create your account</Link>
            <a href="tel:+27725778419" className="btn-secondary px-8 py-3 text-base text-center">Call +27 72 577 8419</a>
          </div>
          <p className="text-xs text-sand-400 mt-6">
            therapy@app.businesshustle.co.za · Wheelchair accessible · Designed by BusinessHustle
          </p>
        </div>
      </section>
    </div>
  )
}
