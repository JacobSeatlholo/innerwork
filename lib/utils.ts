import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-ZA', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export function formatTime(date: string | Date) {
  return new Date(date).toLocaleTimeString('en-ZA', {
    hour: '2-digit', minute: '2-digit'
  })
}

export function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}
