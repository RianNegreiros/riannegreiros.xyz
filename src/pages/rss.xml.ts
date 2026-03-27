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
        ? `<figcaption style="font-size: 0.9em; color: #666; margin-top: 0.5em; font-style: italic;">${value.caption}</figcaption>`
        : ''
      return `<figure style="margin: 1.5em 0; text-align: center;"><img src="${src}" alt="${value.alt ?? ''}" style="max-width: 100%; height: auto; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" loading="lazy" />${caption}</figure>`
    },
    code: ({ value }: any) => {
      const lang = value.language || ''
      const langClass = lang ? ` class="language-${lang}"` : ''
      return `<div style="background: #f5f5f5; border: 1px solid #e0e0e0; border-radius: 4px; padding: 1em; margin: 1em 0; overflow-x: auto;"><div style="font-size: 0.85em; color: #666; margin-bottom: 0.5em; font-weight: bold;">Code</div><pre style="margin: 0; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 0.9em; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word;"><code${langClass}>${value.code ?? ''}</code></pre></div>`
    },
    video: ({ value }: any) => {
      const videoUrl = value.asset?.url
      if (!videoUrl) return ''
      return `<div style="margin: 1.5em 0; text-align: center;"><video controls style="max-width: 100%; height: auto; border-radius: 4px;"><source src="${videoUrl}" type="video/mp4" />Your browser does not support the video tag.</video></div>`
    },
  },
  marks: {
    strong: ({ children }: any) =>
      `<strong style="font-weight: 600;">${children}</strong>`,
    em: ({ children }: any) =>
      `<em style="font-style: italic;">${children}</em>`,
    underline: ({ children }: any) =>
      `<u style="text-decoration: underline;">${children}</u>`,
    link: ({ children, value }: any) => {
      const ext = value.href?.startsWith('http')
        ? ' target="_blank" rel="noopener noreferrer"'
        : ''
      return `<a href="${value.href ?? '#'}"${ext} style="color: #0066cc; text-decoration: none;">${children}</a>`
    },
  },
  block: {
    normal: ({ children }: any) =>
      `<p style="margin: 1em 0; line-height: 1.7; font-size: 1em;">${children}</p>`,
    h1: ({ children }: any) =>
      `<h1 style="font-size: 1.8em; font-weight: 700; margin: 1.5em 0 0.5em; color: #222;">${children}</h1>`,
    h2: ({ children }: any) =>
      `<h2 style="font-size: 1.5em; font-weight: 600; margin: 1.4em 0 0.5em; color: #333;">${children}</h2>`,
    h3: ({ children }: any) =>
      `<h3 style="font-size: 1.3em; font-weight: 600; margin: 1.3em 0 0.5em; color: #444;">${children}</h3>`,
    h4: ({ children }: any) =>
      `<h4 style="font-size: 1.15em; font-weight: 600; margin: 1.2em 0 0.5em; color: #555;">${children}</h4>`,
    blockquote: ({ children }: any) =>
      `<blockquote style="border-left: 4px solid #0066cc; margin: 1.5em 0; padding: 0.5em 1em; background: #f9f9f9; color: #555; font-style: italic;">${children}</blockquote>`,
    list: ({ children, value }: any) => {
      const tag = value.ordered ? 'ol' : 'ul'
      const style = value.ordered
        ? 'padding-left: 2em; list-style-type: decimal;'
        : 'padding-left: 2em; list-style-type: disc;'
      return `<${tag} style="${style} margin: 1em 0;">${children}</${tag}>`
    },
    listItem: ({ children }: any) =>
      `<li style="margin: 0.5em 0; line-height: 1.6;">${children}</li>`,
  },
}

export async function GET(context: APIContext) {
  const posts = await fetchSanityData<any>(queries.rss)
  const siteUrl = context.site!.href

  return rss({
    title: 'Rian Negreiros Dos Santos — Blog',
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
          ? `<div style="margin-bottom: 1.5em; text-align: center;"><img src="${urlFor(post.image).width(800).format('webp').quality(80).url()}" alt="${post.title}" style="max-width: 100%; height: auto; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" /></div>`
          : ''

        const fullContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; max-width: 100%; margin: 0; padding: 0; color: #333; line-height: 1.7;">
  ${coverImg}
  <div style="font-size: 1em;">
    ${contentHtml}
  </div>
  <div style="margin-top: 2em; padding-top: 1em; border-top: 1px solid #e0e0e0; font-size: 0.9em; color: #666;">
    <p>Read the full article on <a href="${new URL(`/blog/${post.slug}`, siteUrl).href}" style="color: #0066cc; text-decoration: none; font-weight: 500;">my website</a>.</p>
  </div>
</div>`

        return {
          title: post.title,
          description: post.overview || post.title,
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
