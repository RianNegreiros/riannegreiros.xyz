import { MetadataRoute } from 'next'
import { post } from './lib/interface'
import { client } from './lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  async function getData() {
    const query = `*[_type == "post"] | order(firstPublishedDate desc)`

    const data = await client.fetch(query)

    return data
  }

  const posts: post[] = await getData()

  const postUrls = posts.map((post) => ({
    url: `https://www.riannegreiros.dev/${post.slug.current}`,
    lastModified: new Date(post.firstPublishedDate),
  }))

  return [
    {
      url: `https://www.riannegreiros.dev/`,
      lastModified: new Date(),
    },
    ...postUrls,
  ]
}