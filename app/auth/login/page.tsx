'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LanguageSelector, useTranslation } from '@/components/Translator'

const DEMO_USERS = [
  { email: 'demo@innerwork.co.za', password: 'InnerWork2026', role: 'client', name: 'Demo Client' },
  { email: 'therapist@gabonewe.co.za', password: 'Gabonewe2026', role: 'practitioner', name: 'Gabonewe Practitioner' },
]

export default function LoginPage() {
  const router = useRouter()
  const { lang, setLang, t } = useTranslation()
  const [mode, setMode] = useState<'password' | 'magic'>('password')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 700))
    if (mode === 'magic') {
      setError('Magic link sent! (Demo: switch to password mode and use demo credentials below)')
      setLoading(false); return
    }
    const user = DEMO_USERS.find(u => u.email === email && u.password === password)
    if (user) {
      router.push(user.role === 'practitioner' ? '/dashboard/practitioner' : '/dashboard/client')
    } else {
      setError('Invalid credentials. Click a demo credential below to auto-fill.')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #0a2a1e 0%, #0d3d2b 55%, #155743 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'Jost, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,158,117,0.15) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '5%', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(93,202,165,0.08) 0%, transparent 70%)' }} />

      {/* Language selector top right */}
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10 }}>
        <LanguageSelector lang={lang} setLang={setLang} />
      </div>

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        {/* Logo + brand */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
              <Image src="/gabonewe-logo.svg" alt="Gabonewe Projects" width={160} height={160} style={{ objectFit: 'contain' }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 700, color: 'white', letterSpacing: '0.04em' }}>Gabonewe Projects</div>
              <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', color: '#5DCAA5', letterSpacing: '0.18em', fontWeight: 600, marginTop: '3px' }}>INNERWORK PLATFORM</div>
            </div>
          </Link>
          <p style={{ color: '#9FE1CB', fontSize: '15px', marginTop: '1.25rem', fontWeight: 300 }}>{t('welcome')}. {t('tagline')}.</p>
        </div>

        <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
          {/* Mode tabs */}
          <div style={{ display: 'flex', background: '#f5f3ef', borderRadius: '12px', padding: '4px', marginBottom: '1.75rem', gap: '4px' }}>
            {(['password', 'magic'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: '10px', borderRadius: '9px', border: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 600, background: mode === m ? 'white' : 'transparent', color: mode === m ? '#1a1a18' : '#8e887a', boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}>
                {m === 'password' ? '🔑 Password' : '✨ Magic link'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label className="label">Email address</label>
              <input className="input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            {mode === 'password' && (
              <div>
                <label className="label">Password</label>
                <input className="input" type="password" placeholder="••••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            )}
            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#991b1b', lineHeight: 1.5 }}>{error}</div>
            )}
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '15px', borderRadius: '14px' }}>
              {loading ? 'Signing in…' : mode === 'password' ? `${t('sign_in')}` : 'Send magic link'}
            </button>
          </form>

          {/* Demo credentials */}
          <div style={{ marginTop: '1.5rem', background: '#f0f7f4', border: '1px solid #b3dbcd', borderRadius: '16px', padding: '1rem 1.25rem' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#186b52', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>🔓 {t('demo_access')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: '👤 Client', email: 'demo@innerwork.co.za', pw: 'InnerWork2026' },
                { label: '🏥 Practitioner', email: 'therapist@gabonewe.co.za', pw: 'Gabonewe2026' },
              ].map(cred => (
                <button key={cred.email} onClick={() => { setEmail(cred.email); setPassword(cred.pw) }}
                  style={{ textAlign: 'left', background: 'white', border: '1px solid #b3dbcd', borderRadius: '10px', padding: '10px 14px', cursor: 'pointer', fontFamily: 'Jost, sans-serif', color: '#186b52', transition: 'all 0.15s' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>{cred.label}:</span>
                  <span style={{ fontSize: '11px', color: '#4da586', marginLeft: '4px' }}>{cred.email}</span>
                  <span style={{ fontSize: '11px', color: '#afa99a' }}> · {cred.pw}</span>
                </button>
              ))}
            </div>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', color: '#4da586', marginTop: '8px' }}>Click to auto-fill, then sign in.</p>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#9FE1CB', fontSize: '14px', marginTop: '1.5rem', fontFamily: 'Jost, sans-serif' }}>
          New here?{' '}
          <Link href="/auth/signup" style={{ color: '#5DCAA5', fontWeight: 600, textDecoration: 'underline' }}>Create account</Link>
        </p>
      </div>
    </div>
  )
}
