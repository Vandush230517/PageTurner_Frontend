import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      '/users': {
        target: 'https://nodejs302.dszcbaross.edu.hu:23002',
        changeOrigin: true
      },
      '/admin': {
        target: 'https://nodejs302.dszcbaross.edu.hu:23002',
        changeOrigin: true
      }
    }
  }
})
