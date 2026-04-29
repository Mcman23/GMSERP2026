import { createClient } from '@supabase/supabase-js';

// Bu məlumatlar .env faylından və ya Vercel Environment Variables bölməsindən oxunur
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'Bura_Supabase_URL_Yazilacaq';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'Bura_Supabase_Acar_Yazilacaq';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
