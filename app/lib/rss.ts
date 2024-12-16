import { post } from '@/app/lib/interface'
import { client } from '@/app/lib/sanity'
import RSS from 'rss'

export async function generateRssFeed() {
  const feed = new RSS({
    title: 'Rian N. Dos Santos Blog',
    description: 'Rian Negreiros Dos Santos blog e portfólio',
    feed_url: `${process.env.BASE_URL}/api/rss`,
    site_url: `${process.env.BASE_URL}`,
    language: 'pt-BR',
  })

  const posts =
    await client.fetch(`*[_type == 'post'] | order(firstPublishedDate desc) {
    title,
    slug,
    firstPublishedDate,
    content
    }`)

  posts.forEach((post: post) => {
    feed.item({
      title: post.title,
      description: post.content,
      url: `${process.env.BASE_URL}/posts/${post.slug.current}`,
      date: post.firstPublishedDate,
    })
  })

  return feed.xml({ indent: true })
}
