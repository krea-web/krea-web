import { createClient } from '@supabase/supabase-js';

// Tenta di prendere le variabili dal file .env, altrimenti usa i valori di fallback per far funzionare Lovable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cieukfozcrsizkwzrgws.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZXVrZm96Y3JzaXprd3pyZ3dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDY0MTIsImV4cCI6MjA4NTI4MjQxMn0.JDOzZLK8LyrqtOltOT0SV2CYgwRwYrDPGzdKgWUZ32Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
