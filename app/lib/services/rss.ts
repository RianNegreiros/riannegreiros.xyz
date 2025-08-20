import { Post } from '@/app/lib/types'
import { client, urlFor } from '@/app/lib/services/sanity'
import { PortableTextBlock } from '@portabletext/types'
import { toHTML } from '@portabletext/to-html'
import RSS from 'rss'
import { SITE_CONFIG } from '@/lib/constants'

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

export async function generateRssFeed() {
  const feed = new RSS({
    title: SITE_CONFIG.title,
    description: `${SITE_CONFIG.title} blog e portfólio`,
    feed_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/rss`,
    site_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    language: 'pt-BR',
  })

  const posts = await client.fetch(
    `*[_type == 'post'] | order(firstPublishedDate desc)`
  )

  posts.forEach((post: Post) => {
    const contentHTML = convertPortableTextToHTML(post.content)
    feed.item({
      guid: post._id,
      title: post.title,
      description: contentHTML,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug.current}`,
      date: post.firstPublishedDate,
    })
  })

  return feed.xml({ indent: true })
}
