'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const clientNav = [
  { href: '/dashboard/client', label: 'My Space', icon: '🌿' },
  { href: '/dashboard/client/journal', label: 'Journal', icon: '📓' },
  { href: '/dashboard/client/tasks', label: 'My Tasks', icon: '✅' },
  { href: '/dashboard/client/assessment', label: 'Assessments', icon: '🧭' },
  { href: '/dashboard/client/closure', label: 'Closure Letters', icon: '💌' },
  { href: '/dashboard/couples/space', label: 'Couples Space', icon: '👥' },
  { href: '/dashboard/couples/tasks', label: 'Partner Tasks', icon: '🤝' },
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
  const isPractitioner = pathname.includes('/practitioner')

  const navItems = isPractitioner ? practitionerNav : clientNav

  return (
    <div className="min-h-screen bg-sand-50 flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-60 bg-white border-r border-sand-200 flex flex-col transition-transform duration-200",
        "lg:translate-x-0 lg:static lg:flex",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-5 border-b border-sand-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sage-600 flex items-center justify-center text-white font-display font-bold text-sm">G</div>
            <div>
              <div className="text-sm font-semibold text-sand-900 leading-none">InnerWork</div>
              <div className="text-xs text-sand-400 leading-none">by Gabonewe</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-xs text-sand-400 uppercase tracking-widest font-medium px-3 mb-3">
            {isPractitioner ? 'Practitioner' : 'My Journey'}
          </p>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className={cn(
              pathname === item.href ? 'nav-item-active' : 'nav-item'
            )}>
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          {!isPractitioner && (
            <>
              <div className="pt-4 pb-2">
                <p className="text-xs text-sand-400 uppercase tracking-widest font-medium px-3 mb-3">Sessions</p>
                <Link href="/dashboard/bookings" className={cn(pathname === '/dashboard/bookings' ? 'nav-item-active' : 'nav-item')}>
                  <span>📅</span><span>My Bookings</span>
                </Link>
              </div>
              <div className="pt-2">
                <p className="text-xs text-sand-400 uppercase tracking-widest font-medium px-3 mb-3">Switch view</p>
                <Link href="/dashboard/practitioner" className="nav-item">
                  <span>🔄</span><span>Practitioner view</span>
                </Link>
              </div>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-sand-100">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 text-xs font-semibold">U</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-sand-900 truncate">My Account</p>
              <p className="text-xs text-sand-400">{isPractitioner ? 'Practitioner' : 'Client'}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-sand-200 px-6 h-14 flex items-center justify-between sticky top-0 z-20">
          <button className="lg:hidden p-2 text-sand-500 hover:text-sand-900" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <Link href="/dashboard/bookings" className="btn-primary text-sm py-1.5 px-4">
              + Book session
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
