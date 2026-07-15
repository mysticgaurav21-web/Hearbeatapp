import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' = relative paths — repo ka naam kuch bhi ho, GitHub Pages pe chalega
export default defineConfig({
  plugins: [react()],
  base: './',
})
