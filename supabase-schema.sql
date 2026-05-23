-- InnerWork by Gabonewe - Full Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'practitioner', 'admin')),
  avatar_url TEXT,
  phone TEXT,
  partner_id UUID REFERENCES profiles(id),
  couple_code TEXT UNIQUE,
  bio TEXT,
  attachment_style TEXT CHECK (attachment_style IN ('secure', 'anxious', 'avoidant', 'fearful_avoidant')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings
CREATE TABLE bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  practitioner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  session_type TEXT NOT NULL CHECK (session_type IN ('individual', 'couples', 'group', 'crisis', 'follow_up')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  location TEXT DEFAULT 'in_person' CHECK (location IN ('in_person', 'virtual', 'hybrid')),
  notes TEXT,
  session_notes TEXT,
  invoice_ref TEXT,
  amount_rands DECIMAL(10,2),
  paid BOOLEAN DEFAULT FALSE,
  follow_up_required BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Journal entries
CREATE TABLE journal_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  mood INTEGER CHECK (mood BETWEEN 1 AND 10),
  mood_label TEXT,
  tags TEXT[],
  prompt_used TEXT,
  is_private BOOLEAN DEFAULT TRUE,
  shared_with_practitioner BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Accountability tasks
CREATE TABLE tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  assigned_to UUID REFERENCES profiles(id),
  couple_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('accountability', 'closure', 'communication', 'self_care', 'couples', 'boundary', 'healing', 'spiritual', 'gratitude')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'skipped')),
  due_date TIMESTAMPTZ,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  reflection TEXT,
  completed_at TIMESTAMPTZ,
  session_ref UUID REFERENCES bookings(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assessments
CREATE TABLE assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('attachment_style', 'emotional_baseline', 'relationship_health', 'accountability_readiness', 'closure_readiness')),
  responses JSONB NOT NULL,
  score INTEGER,
  result TEXT,
  insights TEXT[],
  recommendations TEXT[],
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Closure letters / documents
CREATE TABLE closure_documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  recipient_name TEXT,
  document_type TEXT CHECK (document_type IN ('letter', 'affirmation', 'boundary_statement', 'forgiveness', 'goodbye', 'apology', 'gratitude_letter')),
  content TEXT NOT NULL,
  is_sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMPTZ,
  notes TEXT,
  session_ref UUID REFERENCES bookings(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Practitioner notes (private)
CREATE TABLE practitioner_notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  practitioner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES bookings(id),
  note_type TEXT DEFAULT 'session' CHECK (note_type IN ('session', 'observation', 'risk', 'progress', 'referral', 'admin')),
  content TEXT NOT NULL,
  is_confidential BOOLEAN DEFAULT TRUE,
  tags TEXT[],
  follow_up_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Couple check-ins
CREATE TABLE couple_checkins (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  partner_a_id UUID REFERENCES profiles(id) NOT NULL,
  partner_b_id UUID REFERENCES profiles(id) NOT NULL,
  couple_code TEXT NOT NULL,
  checkin_type TEXT CHECK (checkin_type IN ('daily', 'weekly', 'conflict', 'gratitude', 'intimacy', 'goals')),
  partner_a_response JSONB,
  partner_b_response JSONB,
  shared_insights TEXT,
  practitioner_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Emotional tracking
CREATE TABLE emotional_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 10),
  anxiety_level INTEGER CHECK (anxiety_level BETWEEN 1 AND 10),
  connection_feeling INTEGER CHECK (connection_feeling BETWEEN 1 AND 10),
  safety_feeling INTEGER CHECK (safety_feeling BETWEEN 1 AND 10),
  notes TEXT,
  triggers TEXT[],
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resources / homework assigned
CREATE TABLE assigned_resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  practitioner_id UUID REFERENCES profiles(id) NOT NULL,
  client_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  resource_type TEXT CHECK (resource_type IN ('exercise', 'reading', 'meditation', 'journaling', 'task', 'video')),
  url TEXT,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  booking_ref UUID REFERENCES bookings(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE closure_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE practitioner_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE couple_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE emotional_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE assigned_resources ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Practitioners can view client profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'practitioner')
);

-- Bookings policies
CREATE POLICY "Clients view own bookings" ON bookings FOR SELECT USING (client_id = auth.uid());
CREATE POLICY "Practitioners view all bookings" ON bookings FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('practitioner', 'admin'))
);
CREATE POLICY "Clients insert bookings" ON bookings FOR INSERT WITH CHECK (client_id = auth.uid());

-- Journal policies (private by default)
CREATE POLICY "Users manage own journals" ON journal_entries FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Practitioners view shared journals" ON journal_entries FOR SELECT USING (
  shared_with_practitioner = TRUE AND
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'practitioner')
);

-- Tasks policies
CREATE POLICY "Users manage own tasks" ON tasks FOR ALL USING (
  created_by = auth.uid() OR assigned_to = auth.uid()
);

-- Assessments policies
CREATE POLICY "Users manage own assessments" ON assessments FOR ALL USING (user_id = auth.uid());

-- Closure docs policies
CREATE POLICY "Users manage own closure docs" ON closure_documents FOR ALL USING (user_id = auth.uid());

-- Practitioner notes - practitioner only
CREATE POLICY "Practitioner manages own notes" ON practitioner_notes FOR ALL USING (
  practitioner_id = auth.uid()
);

-- Emotional logs
CREATE POLICY "Users manage own emotional logs" ON emotional_logs FOR ALL USING (user_id = auth.uid());

-- Assigned resources
CREATE POLICY "Practitioners manage resources" ON assigned_resources FOR ALL USING (
  practitioner_id = auth.uid()
);
CREATE POLICY "Clients view assigned resources" ON assigned_resources FOR SELECT USING (
  client_id = auth.uid()
);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- Indexes for performance
CREATE INDEX idx_bookings_client ON bookings(client_id);
CREATE INDEX idx_bookings_practitioner ON bookings(practitioner_id);
CREATE INDEX idx_bookings_scheduled ON bookings(scheduled_at);
CREATE INDEX idx_journal_user ON journal_entries(user_id);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX idx_emotional_user ON emotional_logs(user_id, logged_at);
