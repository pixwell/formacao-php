import { defineConfig } from 'vite'

/** Configuração para Vite + PHP em ambiente Docker - Estrutura Personalizada */
export default defineConfig({
  server: {
    watch: {
      usePolling: true // Força o Vite a verificar mudanças periodicamente (essencial no Docker)
    },
    host: '0.0.0.0',     // Permite acesso de qualquer IP (necessário para Docker)
    port: 5173,          // Porta onde o servidor de desenvolvimento vai rodar
    strictPort: true,    // Impede que o Vite tente usar outra porta se a 5173 estiver ocupada
    hmr: {
      clientPort: 5173   // Define a porta para Hot Module Replacement (crítico no Docker)
    }
  },
  root: '.',             // Raiz do projeto é a pasta atual (onde está index.php)
  publicDir: false,      // Desabilita a pasta pública padrão, já que não temos /public
  build: {
    outDir: 'dist',
    emptyOutDir: false,    // Não limpa a raiz
    rollupOptions: {
      input: {
        css: 'css/dev/style.dev.css',
        js: 'js/dev/custom.dev.js'
      },
      output: {
        assetFileNames: 'css/style.css',
        entryFileNames: 'js/custom.js'
      }
    }
  },
  optimizeDeps: {
    entries: ['./**/*.php', './views/**/*.php'] // Inclui todos os arquivos PHP no watch
  }
})