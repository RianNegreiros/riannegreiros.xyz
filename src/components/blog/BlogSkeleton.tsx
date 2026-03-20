import { Skeleton } from '@/components/ui/skeleton'
import { BlogPostSkeleton } from './BlogPostSkeleton'

interface BlogSkeletonProps {
  withPagination?: boolean
}

export default function BlogSkeleton({
  withPagination = true,
}: BlogSkeletonProps) {
  return (
    <div
      className="animate-fade-in mx-auto mt-5 max-w-4xl"
      role="status"
      aria-live="polite"
      aria-label="Loading posts"
    >
      <ul className="animate-fade-in space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <BlogPostSkeleton key={index} index={index} />
        ))}
      </ul>

      {withPagination && (
        <div className="mt-8 flex justify-center">
          <Skeleton className="h-10 w-64" />
        </div>
      )}
    </div>
  )
}
