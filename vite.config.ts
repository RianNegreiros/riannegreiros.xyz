import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          sanity: ['@sanity/client', '@sanity/image-url'],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-toggle',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-visually-hidden',
          ],
        },
      },
    },
    cssCodeSplit: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@sanity/client', '@sanity/image-url'],
    exclude: ['lucide-react'],
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
})
