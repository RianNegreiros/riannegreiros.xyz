import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/projects',
          '/health',
          '/hooks/',
          '/components/',
          '/swagger/',
          '/prompt/',
          '/github.com/',
          '/post/',
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sitemap`,
  }
}
