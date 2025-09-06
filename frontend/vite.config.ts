import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['http://localhost:10000', 'https://inventory-manager-72e3.onrender.com']
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
