import { client } from '@/app/lib/sanity'
import { NextResponse } from 'next/server'

async function getPosts() {
  const query = `*[_type == "post"] | order(firstPublishedDate desc) {
    "slug": slug.current,
    firstPublishedDate
  }`

  return await client.fetch(query)
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'
  const posts = await getPosts()

  const urls = [
    `${baseUrl}/`,
    `${baseUrl}/about`,
    `${baseUrl}/blog`,
    ...posts.map(
      (post: { slug: string; firstPublishedDate: string }) =>
        `${baseUrl}/posts/${post.slug}`
    ),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
          (url) => `
          <url>
            <loc>${url}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
          </url>`
        )
        .join('')}
    </urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
