import { post } from '@/app/lib/interface'
import { client, urlFor } from '@/app/lib/sanity'
import { PortableTextBlock } from '@portabletext/types'
import { toHTML } from '@portabletext/to-html'
import RSS from 'rss'

function convertPortableTextToHTML(content: PortableTextBlock[]): string {
  return toHTML(content, {
    components: {
      types: {
        image: ({ value }) =>
          `<img src="${urlFor(value).url()}" alt="${value.alt || 'Image'}" />`,
        code: ({ value }) => `<pre><code>${value.code}</code></pre>`,
      },
    },
  })
}

export async function generateRssFeed() {
  const feed = new RSS({
    title: 'Rian N. Dos Santos Blog',
    description: 'Rian Negreiros Dos Santos blog e portfólio',
    feed_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/rss`,
    site_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    language: 'pt-BR',
  })

  const posts = await client.fetch(
    `*[_type == 'post'] | order(firstPublishedDate desc)`
  )

  posts.forEach((post: post) => {
    const contentHTML = convertPortableTextToHTML(post.content)
    feed.item({
      guid: post._id,
      title: post.title,
      description: contentHTML,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.slug.current}`,
      date: post.firstPublishedDate,
    })
  })

  return feed.xml({ indent: true })
}
