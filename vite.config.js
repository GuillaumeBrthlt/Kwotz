import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias:{
      '@theme' : path.resolve(__dirname, './src/assets/theme'),
      '@components': path.resolve(__dirname, '/src/components'),
      '@pages': path.resolve(__dirname, '/src/pages'),
      '@contexts': path.resolve(__dirname, '/src/contexts'),
      '@stores': path.resolve(__dirname, '/src/stores'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  plugins: [
    react(),
  ]
})

