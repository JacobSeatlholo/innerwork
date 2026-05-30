'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [mode, setMode] = useState<'password' | 'magic'>('password')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Simulate — full auth activates when Supabase is connected
    await new Promise(r => setTimeout(r, 800))
    setMessage('Auth coming soon — the full platform is being set up. In the meantime, explore the demo below.')
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a2a1e, #0d3d2b)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '360px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '1.5rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#1D9E75', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: '20px' }}>G</div>
          </Link>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.75rem', color: 'white', marginBottom: '0.25rem' }}>Welcome back</h1>
          <p style={{ color: '#9FE1CB', fontSize: '14px' }}>Continue your inner work</p>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '1.75rem' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', background: '#f5f3ef', padding: '4px', borderRadius: '10px' }}>
            {(['password', 'magic'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: '8px', borderRadius: '7px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500, background: mode === m ? 'white' : 'transparent', color: mode === m ? '#1a1a18' : '#8e887a', boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s', fontFamily: 'inherit' }}>
                {m === 'password' ? 'Password' : 'Magic link'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            {mode === 'password' && (
              <div>
                <label className="label">Password</label>
                <input className="input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            )}
            {message && (
              <div style={{ background: '#f0f7f4', border: '1px solid #b3dbcd', borderRadius: '10px', padding: '12px', fontSize: '13px', color: '#186b52', lineHeight: 1.5 }}>{message}</div>
            )}
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '13px', fontSize: '15px' }}>
              {loading ? 'Please wait…' : mode === 'password' ? 'Sign in' : 'Send magic link'}
            </button>
          </form>

          <div style={{ marginTop: '1.25rem', padding: '1rem', background: '#fffbeb', borderRadius: '10px', border: '1px solid #fcd34d' }}>
            <p style={{ fontSize: '12px', color: '#92400e', lineHeight: 1.6, margin: 0 }}>
              <strong>Demo mode:</strong> Explore all tools freely. Full accounts activate soon. 
              <Link href="/dashboard/client" style={{ color: '#1D9E75', fontWeight: 600, display: 'block', marginTop: '6px' }}>→ Enter demo dashboard</Link>
            </p>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#9FE1CB', fontSize: '14px', marginTop: '1.5rem' }}>
          New here?{' '}
          <Link href="/auth/signup" style={{ color: '#5DCAA5', textDecoration: 'underline' }}>Create account</Link>
        </p>
      </div>
    </div>
  )
}
