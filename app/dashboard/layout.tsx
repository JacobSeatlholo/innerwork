'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const clientNav = [
  { href: '/dashboard/client', label: 'My Space', icon: '🌿' },
  { href: '/dashboard/client/journal', label: 'Journal', icon: '📓' },
  { href: '/dashboard/client/tasks', label: 'My Tasks', icon: '✅' },
  { href: '/dashboard/exercises', label: 'Home Exercises', icon: '🌬️' },
  { href: '/dashboard/client/assessment', label: 'Assessment', icon: '🧭' },
  { href: '/dashboard/client/closure', label: 'Closure Letters', icon: '💌' },
  { href: '/dashboard/couples/space', label: 'Couples Space', icon: '👥' },
  { href: '/dashboard/bookings', label: 'Book a Session', icon: '📅' },
]

const practitionerNav = [
  { href: '/dashboard/practitioner', label: 'Overview', icon: '📊' },
  { href: '/dashboard/practitioner/bookings', label: 'Bookings', icon: '📅' },
  { href: '/dashboard/practitioner/clients', label: 'Clients', icon: '👤' },
  { href: '/dashboard/practitioner/notes', label: 'Session Notes', icon: '📋' },
  { href: '/dashboard/practitioner/analytics', label: 'Analytics', icon: '📈' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isPractitioner = pathname?.includes('/practitioner')
  const navItems = isPractitioner ? practitionerNav : clientNav

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf8', display: 'flex', fontFamily: 'Jost, system-ui, sans-serif' }}>

      {/* Overlay */}
      {open && (
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(10,42,30,0.45)', backdropFilter: 'blur(4px)' }} />
      )}

      {/* Sidebar */}
      <aside className={`dash-sidebar${open ? ' open' : ''}`} style={{ flexShrink: 0 }}>
        <div style={{ padding: '1rem 1.1rem', borderBottom: '1px solid #f0ede8' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <Image src="/gabonewe-logo.svg" alt="Gabonewe" className="logo-img-sidebar" width={44} height={44} />
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', fontWeight: 700, color: '#1a1a18', lineHeight: 1.1 }}>Gabonewe</div>
              <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '9px', color: '#9FE1CB', fontWeight: 600, letterSpacing: '0.14em', marginTop: '2px' }}>INNERWORK</div>
            </div>
          </Link>
        </div>

        <nav style={{ flex: 1, padding: '0.875rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#c8c4b5', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '4px 12px 6px' }}>
            {isPractitioner ? 'Practitioner' : 'My Journey'}
          </p>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '12px', fontFamily: 'Jost, sans-serif', fontSize: '13.5px', fontWeight: pathname === item.href ? 600 : 400, color: pathname === item.href ? '#186b52' : '#706b5f', background: pathname === item.href ? '#f0f7f4' : 'transparent', textDecoration: 'none', transition: 'all 0.15s', borderLeft: pathname === item.href ? '3px solid #1D9E75' : '3px solid transparent' }}>
              <span style={{ fontSize: '15px', flexShrink: 0 }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          {!isPractitioner && (
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #f0ede8' }}>
              <Link href="/dashboard/practitioner" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '12px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#afa99a', textDecoration: 'none', transition: 'all 0.15s' }}>
                <span>🔄</span><span>Practitioner view</span>
              </Link>
            </div>
          )}
        </nav>

        <div style={{ padding: '0.875rem', borderTop: '1px solid #f0ede8' }}>
          <div style={{ background: '#f0f7f4', borderRadius: '12px', padding: '10px 12px' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, color: '#186b52', marginBottom: '3px' }}>Gabonewe Projects</p>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', color: '#4da586', lineHeight: 1.6 }}>+27 72 577 8419<br />SACSSP: 10-20383</p>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="dash-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, marginLeft: '240px' }}>

        {/* Topbar */}
        <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e8e4dc', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.25rem', gap: '1rem' }}>
          {/* Mobile hamburger */}
          <button onClick={() => setOpen(s => !s)} className="menu-btn" style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#706b5f', padding: '4px 8px', lineHeight: 1, flexShrink: 0 }}>☰</button>

          {/* Mobile brand */}
          <Link href="/" className="menu-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flex: 1 }}>
            <Image src="/gabonewe-logo.svg" alt="Gabonewe" width={32} height={32} style={{ objectFit: 'contain' }} />
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', fontWeight: 700, color: '#1a1a18' }}>Gabonewe</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <Link href="/dashboard/bookings" className="btn-primary" style={{ fontSize: '12px', padding: '8px 16px', whiteSpace: 'nowrap' }}>+ Book</Link>
            <Link href="/auth/login" style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#afa99a', textDecoration: 'none', padding: '8px 12px', borderRadius: '50px', border: '1px solid #e8e4dc', whiteSpace: 'nowrap' }}>Sign out</Link>
          </div>
        </header>

        {/* Page content */}
        <main className="dash-main-inner" style={{ flex: 1, padding: '1.75rem 1.5rem', maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .dash-sidebar { transform: translateX(0) !important; position: sticky !important; top: 0 !important; height: 100vh !important; }
          .dash-main { margin-left: 0 !important; }
          .menu-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .dash-main { margin-left: 0 !important; }
          .dash-main-inner { padding: 1rem !important; }
        }
      `}</style>
    </div>
  )
}
