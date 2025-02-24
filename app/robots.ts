import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/posts', '/resume'],
        disallow: [
          '/api/v*',
          '/about',
          '/blog',
          '/health',
          '/components/',
          '/hooks/',
          '/post/',
          '/swagger/',
          '/github.com/',
          '/*.json$',
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sitemap`,
  }
}
