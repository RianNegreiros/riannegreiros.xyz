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
  const postsNum = await getTotalPosts()
  const maxPage = Math.ceil(postsNum / 10)

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <PostsList searchParams={searchParams} />
      <PaginationNav maxPage={maxPage} />
    </div>
  )
}
