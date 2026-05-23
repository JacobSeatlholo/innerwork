'use client'
import Link from 'next/link'

export default function CouplesTasksPage() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="font-display text-3xl text-sand-900 mb-1">Partner Tasks</h1>
        <p className="text-sand-400 text-sm">Therapeutic exercises to complete together — at your own pace.</p>
      </div>
      <div className="card p-6 text-center py-12">
        <p className="text-3xl mb-3">🤝</p>
        <p className="text-sand-600 font-medium mb-2">Connect with your partner first</p>
        <p className="text-sand-400 text-sm mb-4">Once connected, your shared tasks will appear here.</p>
        <Link href="/dashboard/couples/space" className="btn-primary text-sm inline-block">Go to Couples Space</Link>
      </div>
    </div>
  )
}
