import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

import netlify from '@astrojs/netlify'

export default defineConfig({
  site: 'https://riannegreiros.com.br',
  output: 'server',
  trailingSlash: 'ignore',

  integrations: [react()],

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
    build: {
      chunkSizeWarningLimit: 1000,
      target: 'es2022',
    },
    esbuild: {
      target: 'es2022',
    },
  },

  adapter: netlify(),
})
