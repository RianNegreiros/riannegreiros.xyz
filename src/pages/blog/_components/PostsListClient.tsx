import type { Post } from '@/lib/types'
import BlogPagination from './BlogPagination'
import PostItem from './PostItem'
import EmptyState from './EmptyState'

interface PostsListClientProps {
  data: Post[]
  searchQuery?: string
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function PostsListClient({ data, searchQuery, currentPage, totalPages, onPageChange }: PostsListClientProps) {
  if (!data?.length) {
    return <EmptyState searchQuery={searchQuery} />
  }

  return (
    <div className="space-y-8">
      <ul className="space-y-4 animate-fade-in">
        {data.map((post, index) => (
          <PostItem key={post._id} post={post} index={index} />
        ))}
      </ul>

      <BlogPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  )
}
