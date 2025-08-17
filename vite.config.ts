import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/rating-ui-react/',
  server: {
    strictPort: true,
  },
  plugins: [react()],
})
