import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Log to help you debug (Check your browser console)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are missing! Check your .env file and restart your terminal.");
}

export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || ''
);