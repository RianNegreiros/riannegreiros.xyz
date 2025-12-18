import type { PortableTextBlock } from '@portabletext/types'
import { toHTML } from '@portabletext/to-html'
import { Feed } from 'feed'
import { SITE_CONFIG } from './constants'
import { fetchSanityData, urlFor } from './services'
interface RSSPost {
  _id: string
  title: string
  slug: { current: string }
  content: PortableTextBlock[]
  overview: string
  firstPublishedDate: string
  image: string
}

function convertPortableTextToHTML(content: PortableTextBlock[]): string {
  return toHTML(content, {
    components: {
      types: {
        image: ({ value }) =>
          `<img src="${urlFor(value).url()}" alt="${value.alt ?? 'Image'}" />`,
        code: ({ value }) => `<pre><code>${value.code}</code></pre>`,
      },
    },
  })
}

export async function generateRSSFeed(baseUrl: string) {
  const posts = await fetchSanityData<RSSPost[]>(
    `*[_type == 'post'] | order(firstPublishedDate desc)`,
  )

  const feed = new Feed({
    title: 'RSS feed do meu blog pessoal',
    description: 'This is my personal blog RSS feed',
    id: baseUrl,
    link: baseUrl,
    language: 'pt-BR',
    image: `${baseUrl}/og-image.jpg`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: '2025 Rian Negreiros Dos Santos. Todos os direitos reservado',
    author: {
      name: SITE_CONFIG.author,
      email: SITE_CONFIG.email,
      link: baseUrl,
    },
  })

  posts.forEach((post: RSSPost) => {
    const contentHTML = convertPortableTextToHTML(post.content)
    feed.addItem({
      title: post.title,
      id: post._id,
      link: `${baseUrl}/blog/${post.slug.current}`,
      description: post.overview,
      content: contentHTML,
      author: [
        {
          name: SITE_CONFIG.author,
          email: SITE_CONFIG.email,
          link: baseUrl,
        },
      ],
      date: post.firstPublishedDate
        ? new Date(post.firstPublishedDate)
        : new Date(),
      image: post.image ? urlFor(post.image).url() : undefined,
    })
  })

  return feed.rss2()
}
