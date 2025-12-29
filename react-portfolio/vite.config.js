import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Escuta em todos os endereços IP (0.0.0.0)
    port: 5173,
    strictPort: true, // Garante que use sempre essa porta
  }
})
