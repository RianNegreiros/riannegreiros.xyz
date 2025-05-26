import { client } from '@/app/lib/sanity'
import { cache } from 'react'
import PostsListClient from './PostsListClient'

const getData = cache(
  async (
    pageNum: number = 0,
    postsPerPage: number = 10,
    searchQuery?: string
  ) => {
    const start = pageNum * postsPerPage
    const end = start + postsPerPage

    let query = `*[_type == 'post']`

    if (searchQuery) {
      query += `[title match "*${searchQuery}*" || overview match "*${searchQuery}*"]`
    }

    query += ` | order(firstPublishedDate desc) [${start}...${end}] {
    title,
    _id,
    overview,
    slug,
    firstPublishedDate
  }`

    return await client.fetch(query, {}, { next: { revalidate: 30 } })
  }
)

export default async function PostsList({
  pageNum,
  searchQuery,
}: {
  pageNum: number
  searchQuery?: string
}) {
  const data = await getData(pageNum, 10, searchQuery)
  return <PostsListClient data={data} searchQuery={searchQuery} />
}
