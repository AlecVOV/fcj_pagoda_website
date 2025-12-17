import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  // Get your credentials from .env file
  const config = useRuntimeConfig()
  
  // Create the Supabase client (connection)
  const supabase = createClient(
    config.public.supabaseUrl,    // Your Supabase project URL
    config.public.supabaseKey     // Your anon key
  )

  // Make it available as $supabase throughout your app
  return {
    provide: {
      supabase  // Now you can use $supabase anywhere!
    }
  }
})