import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { fetchSanityData, queries, type SanityPost } from '@/lib'

export async function GET(context: APIContext) {
  const posts = await fetchSanityData<any>(queries.rss)

  return rss({
    title: 'Rian Negreiros — Blog',
    description: 'Artigos sobre engenharia de software.',
    site: context.site!.href,

    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData: [
      '<language>pt-BR</language>',
      `<atom:link href="${new URL('/rss.xml', context.site).href}" rel="self" type="application/rss+xml" />`,
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    ].join(''),

    items: posts.map((post: SanityPost) => ({
      title: post.title,
      description: post.overview,
      link: `/blog/${post.slug}/`,
      pubDate: post.firstPublishedDate,
    })),
  })
}
