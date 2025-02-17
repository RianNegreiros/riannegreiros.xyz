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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const posts = await getPosts()

  const urls = [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/posts`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/resume`, lastModified: new Date().toISOString() },
    ...posts.map((post: { slug: string; firstPublishedDate: string }) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.firstPublishedDate).toISOString(),
    })),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
      .map(
        ({ url, lastModified }) => `
          <url>
            <loc>${url}</loc>
            <lastmod>${lastModified}</lastmod>
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
