import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { toHTML } from '@portabletext/to-html'
import { fetchSanityData, queries, type SanityPost } from '@/lib'
import { urlFor } from '@/lib/services/sanity'
import type { PortableTextBlock } from '@portabletext/types'

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const src = urlFor(value).width(800).format('webp').quality(80).url()
      const caption = value.caption
        ? `<figcaption>${value.caption}</figcaption>`
        : ''
      return `<figure><img src="${src}" alt="${value.alt ?? ''}" loading="lazy" />${caption}</figure>`
    },
    code: ({ value }: any) => {
      const lang = value.language ? ` class="language-${value.language}"` : ''
      return `<pre><code${lang}>${value.code ?? ''}</code></pre>`
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const ext = value.href?.startsWith('http')
        ? ' target="_blank" rel="noopener noreferrer"'
        : ''
      return `<a href="${value.href ?? '#'}"${ext}>${children}</a>`
    },
  },
}

export async function GET(context: APIContext) {
  const posts = await fetchSanityData<any>(queries.rss)
  const siteUrl = context.site!.href

  return rss({
    title: 'Rian Negreiros — Blog',
    description: 'Artigos sobre engenharia de software.',
    site: siteUrl,

    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      content: 'http://purl.org/rss/1.0/modules/content/',
    },
    customData: [
      '<language>pt-BR</language>',
      `<atom:link href="${new URL('/rss.xml', context.site).href}" rel="self" type="application/rss+xml" />`,
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    ].join(''),

    items: posts.map(
      (post: SanityPost & { content?: PortableTextBlock[]; image?: any }) => {
        const contentHtml = post.content?.length
          ? toHTML(post.content, { components: portableTextComponents })
          : ''

        const coverImg = post.image?.asset?.url
          ? `<img src="${urlFor(post.image).width(800).format('webp').quality(80).url()}" alt="${post.title}" style="max-width:100%;height:auto;" />\n`
          : ''

        const fullContent = coverImg + contentHtml

        return {
          title: post.title,
          description: post.overview,
          link: new URL(`/blog/${post.slug}`, siteUrl).href,
          pubDate: post.firstPublishedDate,
          customData: fullContent
            ? `<content:encoded><![CDATA[${fullContent}]]></content:encoded>`
            : '',
        }
      },
    ),
  })
}
