import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/api/sitemap',
          '/api/rss'
        ],
        disallow: [
          '/projects',
          '/api/',
          '/health',
          '/hooks/',
          '/components/',
          '/swagger/',
          '/prompt/',
          '/github.com/',
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sitemap`,
  }
}
