import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          sanity: ['@sanity/client', '@sanity/image-url'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tooltip']
        }
      }
    },
    chunkSizeWarningLimit: 500,
    minify: 'esbuild',
    cssMinify: 'lightningcss'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@sanity/client', '@sanity/image-url'],
    exclude: ['lucide-react']
  },
  server: {
    hmr: {
      overlay: false
    }
  }
})
