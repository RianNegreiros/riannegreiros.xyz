import { Skeleton } from '@/components/ui/skeleton'
import { BlogPostSkeleton } from './BlogPostSkeleton'

interface BlogSkeletonProps {
  withPagination?: boolean
}

export default function BlogSkeleton({ withPagination = true }: BlogSkeletonProps) {
  return (
    <div
      className="max-w-4xl mx-auto mt-5 animate-fade-in"
      role="status"
      aria-live="polite"
      aria-label="Loading posts">
      <ul className="space-y-4 animate-fade-in">
        {Array.from({ length: 10 }).map((_, index) => (
          <BlogPostSkeleton key={index} index={index} />
        ))}
      </ul>

      {withPagination && (
        <div className="mt-8 flex justify-center">
          <Skeleton className="w-64 h-10" />
        </div>
      )}
    </div>
  )
}
