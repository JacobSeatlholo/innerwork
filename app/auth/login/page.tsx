'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [mode, setMode] = useState<'password' | 'magic'>('password')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/dashboard/client')
    setLoading(false)
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard/client` }
    })
    if (error) setError(error.message)
    else setMessage('Check your email for a sign-in link.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-950 to-sage-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-sage-600 flex items-center justify-center text-white font-display font-bold text-lg">G</div>
          </Link>
          <h1 className="font-display text-2xl text-white mb-1">Welcome back</h1>
          <p className="text-sage-400 text-sm">Continue your inner work</p>
        </div>

        <div className="card p-6">
          <div className="flex gap-2 mb-6 bg-sand-100 p-1 rounded-lg">
            <button onClick={() => setMode('password')} className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'password' ? 'bg-white shadow-sm text-sand-900' : 'text-sand-500'}`}>Password</button>
            <button onClick={() => setMode('magic')} className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all ${mode === 'magic' ? 'bg-white shadow-sm text-sand-900' : 'text-sand-500'}`}>Magic link</button>
          </div>

          <form onSubmit={mode === 'password' ? handlePasswordLogin : handleMagicLink} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            {mode === 'password' && (
              <div>
                <label className="label">Password</label>
                <input type="password" className="input" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            )}
            {error && <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            {message && <p className="text-sage-700 text-sm bg-sage-50 px-3 py-2 rounded-lg border border-sage-200">{message}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Please wait…' : mode === 'password' ? 'Sign in' : 'Send magic link'}
            </button>
          </form>
        </div>

        <p className="text-center text-sage-400 text-sm mt-6">
          New to InnerWork?{' '}
          <Link href="/auth/signup" className="text-sage-300 hover:text-white underline transition-colors">Create account</Link>
        </p>
      </div>
    </div>
  )
}
