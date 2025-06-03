import { queries } from '@/app/lib/services/sanity.queries'
import { cache } from 'react'
import PostsListClient from './PostsListClient'
import { fetchSanityData } from '@/app/lib/services/sanity'
import { Post } from '@/app/lib/types/sanity'

const getData = cache(
  async (
    pageNum: number = 0,
    postsPerPage: number = 10,
    searchQuery?: string
  ) => {
    const start = pageNum * postsPerPage
    const end = start + postsPerPage
    const queryResult = queries.posts.list(start, end, searchQuery)
    return await fetchSanityData<Post[]>(queryResult)
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

  if (data.length === 10) {
    getData(pageNum + 1, 10, searchQuery)
  }

  return <PostsListClient data={data} searchQuery={searchQuery} />
}
