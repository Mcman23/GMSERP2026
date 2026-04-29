
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// Lokal dev və Vercel konfiqurasiyası (base44 plugin-i cloud-a bağlı olduğundan çıxarıldı)
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});