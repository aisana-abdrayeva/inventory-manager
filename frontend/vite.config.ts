import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['https://inventory-manager-production-7ab5.up.railway.app', 'http://localhost:5000']
  }
})
