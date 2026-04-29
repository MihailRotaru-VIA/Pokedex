import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change '/pokedex/' to match your GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/',
})