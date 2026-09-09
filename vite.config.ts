import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/smart-iphone/',
  plugins: [react()],
  build: {
    cssMinify: 'lightningcss',
    target: 'es2020',
  },
})

