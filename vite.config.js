import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    watch: {}, // Habilita watch
    rollupOptions: {
      input: 'css/style.css', // Força entrada CSS
      output: {
        assetFileNames: 'style.css' // Nome fixo
      }
    }
  }
})