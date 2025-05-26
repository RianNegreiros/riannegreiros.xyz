import PostsList from './_components/PostsList'
import PaginationNav from './_components/PaginationNav'
import SearchInput from './_components/SearchInput'
import { getTotalPosts } from '@/app/action'
import { Suspense } from 'react'
import Loading from './_components/Loading'

export default async function PostsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string
    search?: string
  }>
}) {
  const params = await searchParams
  const pageNum = Number(params?.page ?? 0)
  const postsPerPage = 10
  const postsNum = await getTotalPosts()
  const maxPage = Math.ceil(postsNum / postsPerPage)

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <SearchInput />
      <Suspense fallback={<Loading />}>
        <PostsList pageNum={pageNum} searchQuery={params?.search} />
      </Suspense>
      <PaginationNav maxPage={maxPage} />
    </div>
  )
}
