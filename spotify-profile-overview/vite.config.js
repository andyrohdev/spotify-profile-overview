import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'

export default defineConfig({
  base: '/spotify-profile-overview/',  // This should match your GitHub repo name
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      }
    },
    outDir: 'dist',
  },
  // Hook to generate the 404.html and .nojekyll files after building
  buildEnd() {
    const indexHtmlContent = readFileSync(resolve(__dirname, 'dist', 'index.html'), 'utf-8')
    writeFileSync(resolve(__dirname, 'dist', '404.html'), indexHtmlContent)
    writeFileSync(resolve(__dirname, 'dist', '.nojekyll'), '')
  }
  
})
