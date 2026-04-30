import { SupabaseDB } from './lib/dbAdapter.js';

// Bu fayl bütün komponentlərdən əvvəl yüklənməlidir
globalThis.__B44_DB__ = SupabaseDB;
console.log("[GMS] Supabase initialized.");
