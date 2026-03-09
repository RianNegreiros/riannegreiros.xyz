import { MotionDiv, MotionUl } from '@/components/MotionComponents'
import { Skeleton } from '@/components/ui/skeleton'
import { BlogPostSkeleton } from './BlogPostSkeleton'

interface BlogSkeletonProps {
  withPagination?: boolean
}

export default function BlogSkeleton({
  withPagination = true,
}: BlogSkeletonProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto mt-5"
      role="status"
      aria-live="polite"
      aria-label="Loading posts">
      <MotionUl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <BlogPostSkeleton key={index} index={index} />
        ))}
      </MotionUl>

      {withPagination && (
        <div className="mt-8 flex justify-center">
          <Skeleton className="w-64 h-10" />
        </div>
      )}
    </MotionDiv>
  )
}
