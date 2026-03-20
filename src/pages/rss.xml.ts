import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '091jywj8',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-03-19',
})

export async function GET(context: APIContext) {
  const posts = await client.fetch(`
    *[_type == 'post' && defined(slug.current) && defined(firstPublishedDate)]
    | order(firstPublishedDate desc) {
      title, "slug": slug.current, overview, firstPublishedDate
    }
  `)

  return rss({
    title: 'Rian Negreiros — Blog',
    description: 'Artigos sobre engenharia de software.',
    site: context.site!.href,
    items: posts.map((post: any) => ({
      title: post.title,
      pubDate: new Date(post.firstPublishedDate),
      description: post.overview ?? '',
      link: `/blog/${post.slug}`,
    })),
  })
}
