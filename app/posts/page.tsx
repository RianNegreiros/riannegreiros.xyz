import PostsList from './_components/PostsList'
import PaginationNav from './_components/PaginationNav'
import { getTotalPosts } from '@/app/action'

export default async function PostsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string
  }>
}) {
  const page = await searchParams
  const pageNum = Number(page?.page ?? 0)
  const postsPerPage = 10
  const postsNum = await getTotalPosts()
  const maxPage = Math.ceil(postsNum / postsPerPage)

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <PostsList pageNum={pageNum} />
      <PaginationNav maxPage={maxPage} />
    </div>
  )
}
