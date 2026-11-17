import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base is './' so the build works whether served from a domain root or a
// subpath (e.g. GitHub Pages project pages).
export default defineConfig({
  base: './',
  plugins: [react()],
  // Honour an externally-assigned port (lets multiple preview servers coexist).
  server: process.env.PORT ? { port: Number(process.env.PORT), strictPort: false } : undefined,
})
