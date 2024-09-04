import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      layouts: '/src/layouts',
      pages: '/src/pages',
      components: '/src/components',
      assets: '/src/assets',
      constants: '/src/constants',
    },
  }
})
