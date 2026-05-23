export type Role = 'client' | 'practitioner' | 'admin'
export type SessionType = 'individual' | 'couples' | 'group' | 'crisis' | 'follow_up'
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
export type TaskCategory = 'accountability' | 'closure' | 'communication' | 'self_care' | 'couples' | 'boundary' | 'healing' | 'spiritual' | 'gratitude'
export type AssessmentType = 'attachment_style' | 'emotional_baseline' | 'relationship_health' | 'accountability_readiness' | 'closure_readiness'
export type AttachmentStyle = 'secure' | 'anxious' | 'avoidant' | 'fearful_avoidant'

export interface Profile {
  id: string
  full_name: string
  email: string
  role: Role
  avatar_url?: string
  phone?: string
  partner_id?: string
  couple_code?: string
  bio?: string
  attachment_style?: AttachmentStyle
  created_at: string
}

export interface Booking {
  id: string
  client_id: string
  practitioner_id: string
  session_type: SessionType
  status: BookingStatus
  scheduled_at: string
  duration_minutes: number
  location: 'in_person' | 'virtual' | 'hybrid'
  notes?: string
  session_notes?: string
  invoice_ref?: string
  amount_rands?: number
  paid: boolean
  follow_up_required: boolean
  created_at: string
  client?: Profile
}

export interface JournalEntry {
  id: string
  user_id: string
  title?: string
  content: string
  mood?: number
  mood_label?: string
  tags?: string[]
  prompt_used?: string
  is_private: boolean
  shared_with_practitioner: boolean
  created_at: string
}

export interface Task {
  id: string
  created_by: string
  assigned_to?: string
  couple_id?: string
  title: string
  description?: string
  category?: TaskCategory
  status: 'pending' | 'in_progress' | 'completed' | 'skipped'
  due_date?: string
  priority: 'low' | 'medium' | 'high'
  reflection?: string
  completed_at?: string
  created_at: string
}

export interface Assessment {
  id: string
  user_id: string
  type: AssessmentType
  responses: Record<string, any>
  score?: number
  result?: string
  insights?: string[]
  recommendations?: string[]
  completed_at: string
}

export interface ClosureDocument {
  id: string
  user_id: string
  recipient_name?: string
  document_type: string
  content: string
  is_sent: boolean
  sent_at?: string
  notes?: string
  created_at: string
}

export interface PractitionerNote {
  id: string
  practitioner_id: string
  client_id: string
  booking_id?: string
  note_type: 'session' | 'observation' | 'risk' | 'progress' | 'referral' | 'admin'
  content: string
  is_confidential: boolean
  tags?: string[]
  follow_up_date?: string
  created_at: string
  client?: Profile
}

export interface EmotionalLog {
  id: string
  user_id: string
  energy_level: number
  anxiety_level: number
  connection_feeling: number
  safety_feeling: number
  notes?: string
  triggers?: string[]
  logged_at: string
}
