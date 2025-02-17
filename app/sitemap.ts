import { MetadataRoute } from 'next'
import { post } from './lib/interface'
import { client } from './lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  async function getData() {
    const query = `*[_type == "post"] | order(firstPublishedDate desc) {
      "slug": slug.current,
      firstPublishedDate
    }`

    const data = await client.fetch(query)

    return data
  }

  const posts: post[] = await getData()

  const postUrls = posts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.firstPublishedDate),
  }))

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/resume`,
    },
    ...postUrls,
  ]
}