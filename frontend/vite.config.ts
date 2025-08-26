import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['http://localhost:5000']
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
