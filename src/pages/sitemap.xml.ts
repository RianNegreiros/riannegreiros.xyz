import type { APIContext } from 'astro'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '091jywj8',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-03-19',
})

const STATIC_ROUTES = ['/', '/blog', '/projects', '/resume']

export async function GET(context: APIContext) {
  const posts = await client.fetch(`
    *[_type == 'post' && defined(slug.current) && defined(firstPublishedDate)]
    | order(firstPublishedDate desc) {
      "slug": slug.current,
      firstPublishedDate,
      updatedAt
    }
  `)

  const baseUrl = context.site!.href.replace(/\/$/, '')
  const today = new Date().toISOString().split('T')[0]

  const staticUrls = STATIC_ROUTES.map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.7'}</priority>
  </url>`,
  ).join('')

  const blogUrls = posts
    .map(
      (post: {
        slug: string
        firstPublishedDate: string
        updatedAt?: string
      }) => {
        const lastmod = post.updatedAt ?? post.firstPublishedDate
        return `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(lastmod).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
      },
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${blogUrls}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
