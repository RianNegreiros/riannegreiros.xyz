import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/projects',
    },
    sitemap: 'https://www.riannegreiros.dev/sitemap.xml',
  }
}
