import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { SupabaseDB } from '@/lib/dbAdapter.js'

// Bütün sistem Supabase üzərindən işləyəcək
globalThis.__B44_DB__ = SupabaseDB;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)