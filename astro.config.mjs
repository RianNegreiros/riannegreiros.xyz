import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://riannegreiros.com.br',
  output: 'server',
  trailingSlash: 'never',

  integrations: [
    react(),
  ],

  build: {
    assets: '_assets',
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { '@': '/src' },
      dedupe: ['react', 'react-dom', 'react-dom/server'],
    },
    optimizeDeps: {
      include: ['react-dom/client'],
    },
  },
  adapter: vercel(),
  webAnalytics: {
    enabled: true,
  },
})
