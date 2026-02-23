import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cieukfozcrsizkwzrgws.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZXVrZm96Y3JzaXprd3pyZ3dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDY0MTIsImV4cCI6MjA4NTI4MjQxMn0.JDOzZLK8LyrqtOltOT0SV2CYgwRwYrDPGzdKgWUZ32Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
