import { client } from '@/app/lib/sanity'
import RSS from 'rss'

export async function generateRssFeed() {
  const feed = new RSS({
    title: 'Rian N. Dos Santos Blog',
    description: 'Rian Negreiros Dos Santos blog e portfólio',
    feed_url: 'https://riannegreiros.dev/rss.xml',
    site_url: 'https://riannegreiros.dev',
    language: 'pt-BR',
  })

  const posts =
    await client.fetch(`*[_type == "post"] | order(firstPublishedDate desc) {
    title,
    slug,
    firstPublishedDate,
    content
    }`)

  posts.forEach((post: any) => {
    feed.item({
      title: post.title,
      description: post.content,
      url: `https://riannegreiros.dev/post/${post.slug.current}`,
      date: post.firstPublishedDate,
    })
  })

  return feed.xml({ indent: true })
}
