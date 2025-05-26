import { client } from '@/app/lib/sanity'
import { NextResponse } from 'next/server'

async function getPosts() {
  const query = `*[_type == "post"] | order(firstPublishedDate desc) {
    "slug": slug.current,
    firstPublishedDate,
    "updatedAt": _updatedAt
  }`
  return await client.fetch(query)
}

async function getProjects() {
  const query = `*[_type == "project"] | order(_createdAt desc) {
    "slug": slug.current,
    "updatedAt": _updatedAt
  }`
  return await client.fetch(query)
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const posts = await getPosts()
  const projects = await getProjects()

  const urls = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      changeFreq: 'daily',
      priority: '1.0',
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFreq: 'daily',
      priority: '0.9',
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: '0.9',
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: '0.8',
    },
    ...posts.map(
      (post: {
        slug: string
        firstPublishedDate: string
        updatedAt: string
      }) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(
          post.updatedAt || post.firstPublishedDate
        ).toISOString(),
        changeFreq: 'monthly',
        priority: '0.7',
      })
    ),
    ...projects.map((project: { slug: string; updatedAt: string }) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt).toISOString(),
      changeFreq: 'monthly',
      priority: '0.7',
    })),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${urls
      .map(
        ({ url, lastModified, changeFreq, priority }) => `
          <url>
            <loc>${url}</loc>
            <lastmod>${lastModified}</lastmod>
            <changefreq>${changeFreq}</changefreq>
            <priority>${priority}</priority>
          </url>`
      )
      .join('')}
    </urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
