// Supabase client — connect when ready
// Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel env vars

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    // Return a mock client when Supabase isn't configured yet
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ error: { message: 'Database not configured yet. Coming soon.' } }),
        signInWithOtp: async () => ({ error: { message: 'Database not configured yet. Coming soon.' } }),
        signUp: async () => ({ error: { message: 'Database not configured yet. Coming soon.' } }),
      },
      from: () => ({
        insert: async () => ({ error: null }),
        select: async () => ({ data: [], error: null }),
        update: async () => ({ error: null }),
        delete: async () => ({ error: null }),
      }),
    } as any
  }

  const { createBrowserClient } = require('@supabase/ssr')
  return createBrowserClient(url, key)
}
