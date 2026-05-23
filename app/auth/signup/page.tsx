'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'client' | 'practitioner'>('client')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName, role } }
    })
    if (error) setError(error.message)
    else router.push(role === 'practitioner' ? '/dashboard/practitioner' : '/dashboard/client')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-950 to-sage-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-sage-600 flex items-center justify-center text-white font-display font-bold text-lg">G</div>
          </Link>
          <h1 className="font-display text-2xl text-white mb-1">Begin your InnerWork</h1>
          <p className="text-sage-400 text-sm">Create your therapeutic space</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="label">I am joining as</label>
              <div className="flex gap-2">
                <button type="button" onClick={() => setRole('client')} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${role === 'client' ? 'bg-sage-600 text-white border-sage-600' : 'bg-white text-sand-600 border-sand-200'}`}>Client / Couple</button>
                <button type="button" onClick={() => setRole('practitioner')} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${role === 'practitioner' ? 'bg-sage-600 text-white border-sage-600' : 'bg-white text-sand-600 border-sand-200'}`}>Practitioner</button>
              </div>
            </div>
            <div>
              <label className="label">Full name</label>
              <input type="text" className="input" placeholder="Your full name" value={fullName} onChange={e => setFullName(e.target.value)} required />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Minimum 8 characters" value={password} onChange={e => setPassword(e.target.value)} minLength={8} required />
            </div>
            {error && <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Creating your space…' : 'Create account'}
            </button>
          </form>
        </div>

        <p className="text-center text-sage-400 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-sage-300 hover:text-white underline transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
