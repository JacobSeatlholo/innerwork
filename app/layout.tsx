import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gabonewe Projects | Emotional Clarity & Relational Healing',
  description: "SA's leading trauma-informed corporate wellness facilitator. Tools for accountability, closure, and relational healing. Practice: 0987034 · SACSSP: 10-20383",
  keywords: ['Gabonewe Projects', 'therapy', 'wellness', 'corporate wellness', 'trauma-informed', 'South Africa', 'emotional health', 'accountability'],
  openGraph: {
    title: 'Gabonewe Projects | Emotional Clarity & Relational Healing',
    description: "SA's leading trauma-informed wellness platform.",
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
      <body>
        {children}
      </body>
    </html>
  )
}
