import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/spotify-profile-overview/',  // This should match your GitHub repo name
  plugins: [react()],
})
