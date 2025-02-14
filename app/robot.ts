import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/posts',
      disallow: ['/', '/projects'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sitemap`,
  }
}
