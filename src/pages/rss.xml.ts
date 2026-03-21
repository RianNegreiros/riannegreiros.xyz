import { fetchSanityData, queries } from '@/lib'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const posts = await fetchSanityData<any>(queries.rss)

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
