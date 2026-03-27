import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

import netlify from '@astrojs/netlify';

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
    build: {
      chunkSizeWarningLimit: 1000,
    },
  },
    experimental: {
    svgo: {
      multipass: true,
      floatPrecision: 2,
      plugins: [
        'preset-default',
        'removeXMLNS',
        {
          name: "removeXlink",
          params: {
            includeLegacy: true
          }
        }
      ]
    }
  },
  adapter: netlify(),
})
