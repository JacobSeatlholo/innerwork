import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InnerWork by Gabonewe | Emotional Clarity & Relational Healing',
  description: 'SA\'s leading trauma-informed wellness platform. Tools for accountability, closure, and relational healing by Gabonewe Projects.',
  keywords: ['therapy', 'wellness', 'accountability', 'couples therapy', 'emotional health', 'Gabonewe', 'trauma-informed'],
  openGraph: {
    title: 'InnerWork by Gabonewe',
    description: 'A sanctuary for emotional clarity and relational healing.',
    type: 'website',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Jost', system-ui, sans-serif", background: '#ffffff', color: '#1a1a18', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  )
}
