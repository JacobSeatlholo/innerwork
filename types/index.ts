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

// ── Maritime / Seafarer Psychosocial Support ──
export type SeafarerChallenge =
  | 'homesickness' | 'isolation' | 'fatigue' | 'crew_conflict'
  | 'work_pressure' | 'family_worry' | 'connectivity' | 'none'

export type SeafarerRole = 'deck_crew' | 'engine_crew' | 'officer' | 'catering' | 'shore_management' | 'family_member' | 'other'

export interface SeafarerCheckIn {
  id: string
  user_id: string
  mood: number                     // 1-10
  sleep_quality: number            // 1-10
  connection_feeling: number       // 1-10 — felt connection to loved ones ashore
  isolation_level: number          // 1-10 — higher means more isolated
  current_challenge: SeafarerChallenge
  notes?: string
  contract_day?: number            // day number into current contract
  logged_at: string
}

export type IncidentType =
  | 'accident_injury' | 'piracy_security' | 'man_overboard' | 'collision_grounding'
  | 'cargo_enclosed_space' | 'loss_of_colleague' | 'abandonment' | 'medical_emergency'
  | 'near_miss' | 'other'

export interface IncidentLog {
  id: string
  user_id: string
  incident_type: IncidentType
  description: string
  occurred_on?: string
  immediate_response?: string      // what helped in the moment
  current_coping: number           // 1-10 — how well coping now
  shared_with_practitioner: boolean
  created_at: string
}

export interface MemorialTribute {
  id: string
  user_id: string
  person_name: string
  vessel_name?: string
  relationship: 'crewmate' | 'family' | 'friend' | 'colleague' | 'other'
  birth_year?: number
  passing_year?: number
  message: string                  // tribute text
  visible_to_crew: boolean         // show on shared memorial wall vs private
  created_at: string
}

export type GriefLetterType = 'unfinished_conversation' | 'goodbye' | 'gratitude' | 'anniversary' | 'continuing_bonds'

export interface GriefLetter {
  id: string
  user_id: string
  memorial_id?: string
  title: string
  content: string
  letter_type: GriefLetterType
  is_private: boolean
  created_at: string
}

export type ScreenBand = 'healthy' | 'stressed' | 'struggling' | 'urgent'

export interface WellbeingScreen {
  id: string
  user_id: string
  responses: Record<string, number>
  score: number
  band: ScreenBand
  recommended_actions: string[]
  completed_at: string
}

export interface SelfCarePlan {
  id: string
  user_id: string
  plan_name: string
  daily_practices: string[]
  weekly_practices: string[]
  warning_signs: string[]
  coping_strategies: string[]
  support_contacts: { name: string; contact: string }[]
  created_at: string
  updated_at: string
}
