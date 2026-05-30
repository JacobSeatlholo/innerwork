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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isPractitioner = pathname?.includes('/practitioner')
  const navItems = isPractitioner ? practitionerNav : clientNav

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf8', display: 'flex', fontFamily: 'Jost, system-ui, sans-serif' }}>

      {/* Sidebar */}
      <aside style={{
        position: 'fixed', insetBlock: 0, left: 0, zIndex: 40,
        width: '240px', background: 'white', borderRight: '1px solid #e8e4dc',
        display: 'flex', flexDirection: 'column',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
      }}
      className="lg-sidebar">

        {/* Brand */}
        <div style={{ padding: '1.25rem 1.25rem', borderBottom: '1px solid #f0ede8' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #1D9E75, #0d3d2b)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(29,158,117,0.3)' }}>
              <Image src="/gabonewe-logo.svg" alt="Gabonewe" width={32} height={32} style={{ objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', fontWeight: 700, color: '#1a1a18', lineHeight: 1, letterSpacing: '0.04em' }}>GABONEWE</div>
              <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '9px', color: '#9FE1CB', fontWeight: 600, letterSpacing: '0.15em', marginTop: '2px' }}>INNERWORK</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#c8c4b5', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '4px 14px', marginBottom: '4px' }}>
            {isPractitioner ? 'Practitioner' : 'My Journey'}
          </p>
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '14px', fontFamily: 'Jost, sans-serif', fontSize: '14px', fontWeight: pathname === item.href ? 600 : 400, color: pathname === item.href ? '#186b52' : '#706b5f', background: pathname === item.href ? '#f0f7f4' : 'transparent', textDecoration: 'none', transition: 'all 0.15s', borderLeft: pathname === item.href ? '3px solid #1D9E75' : '3px solid transparent' }}>
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          {!isPractitioner && (
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', fontWeight: 700, color: '#c8c4b5', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '4px 14px', marginBottom: '4px' }}>Switch</p>
              <Link href="/dashboard/practitioner" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '14px', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#afa99a', textDecoration: 'none', transition: 'all 0.15s' }}>
                <span>🔄</span><span>Practitioner view</span>
              </Link>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div style={{ padding: '1rem', borderTop: '1px solid #f0ede8' }}>
          <div style={{ background: '#f0f7f4', borderRadius: '14px', padding: '12px 14px' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', fontWeight: 700, color: '#186b52', marginBottom: '4px' }}>Gabonewe Projects</p>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '10px', color: '#4da586', lineHeight: 1.5 }}>+27 72 577 8419<br />SACSSP: 10-20383</p>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(10,42,30,0.4)', backdropFilter: 'blur(4px)' }} />
      )}

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '240px', minWidth: 0 }}>
        {/* Topbar */}
        <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e8e4dc', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem' }}>
          <button onClick={() => setSidebarOpen(s => !s)} style={{ display: 'none', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#706b5f', padding: '4px' }} className="menu-btn">☰</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            <Link href="/dashboard/bookings" className="btn-primary" style={{ fontSize: '13px', padding: '8px 20px' }}>+ Book session</Link>
            <Link href="/auth/login" style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#afa99a', textDecoration: 'none', padding: '8px 14px', borderRadius: '50px', border: '1px solid #e8e4dc' }}>Sign out</Link>
          </div>
        </header>

        <main style={{ flex: 1, padding: '2rem', maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .lg-sidebar { transform: translateX(0) !important; position: sticky !important; top: 0 !important; height: 100vh !important; }
        }
        @media (max-width: 1023px) {
          .menu-btn { display: flex !important; }
          div[style*="marginLeft: 240px"] { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  )
}
