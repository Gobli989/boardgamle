import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    rollupOptions: {
      treeshake: "recommended",
      output: {

        manualChunks: {
          reactSelect: ["react-select"],
          motion: ["motion"],
        }
      }
    }
  }
})
