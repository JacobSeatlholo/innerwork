'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'client' | 'practitioner'>('client')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setMessage('Account creation coming soon. Entering demo mode…')
    setTimeout(() => router.push(role === 'practitioner' ? '/dashboard/practitioner' : '/dashboard/client'), 1200)
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a2a1e, #0d3d2b)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 1rem 3rem', fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '1.5rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#1D9E75', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: '20px' }}>G</div>
          </Link>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.75rem', color: 'white', marginBottom: '0.25rem' }}>Begin your InnerWork</h1>
          <p style={{ color: '#9FE1CB', fontSize: '14px' }}>Create your therapeutic space</p>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '1.75rem' }}>
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="label">I am joining as</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['client', 'practitioner'] as const).map(r => (
                  <button key={r} type="button" onClick={() => setRole(r)}
                    style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${role === r ? '#1D9E75' : '#dddad0'}`, background: role === r ? '#1D9E75' : 'white', color: role === r ? 'white' : '#8e887a', fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit' }}>
                    {r === 'client' ? 'Client / Couple' : 'Practitioner'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">Full name</label>
              <input className="input" type="text" placeholder="Your full name" value={fullName} onChange={e => setFullName(e.target.value)} required />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input" type="password" placeholder="Minimum 8 characters" value={password} onChange={e => setPassword(e.target.value)} minLength={8} required />
            </div>
            {message && (
              <div style={{ background: '#f0f7f4', border: '1px solid #b3dbcd', borderRadius: '10px', padding: '12px', fontSize: '13px', color: '#186b52' }}>{message}</div>
            )}
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '13px', fontSize: '15px' }}>
              {loading ? 'Creating your space…' : 'Create account'}
            </button>
          </form>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#fffbeb', borderRadius: '10px', border: '1px solid #fcd34d' }}>
            <p style={{ fontSize: '12px', color: '#92400e', lineHeight: 1.6, margin: 0 }}>
              <strong>Demo mode active.</strong> Explore freely — full auth comes when the database is connected.
              <Link href="/dashboard/client" style={{ color: '#1D9E75', fontWeight: 600, display: 'block', marginTop: '6px' }}>→ Skip to demo dashboard</Link>
            </p>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#9FE1CB', fontSize: '14px', marginTop: '1.5rem' }}>
          Already have an account?{' '}
          <Link href="/auth/login" style={{ color: '#5DCAA5', textDecoration: 'underline' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
