import { Skeleton } from '@/components/ui/skeleton'
import {
  DateSkeleton,
  TitleSkeleton,
  TextSkeleton,
} from '@/components/ui/skeletons'

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
          <li
            key={index}
            className="animate-slide-up pb-6"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both',
            }}
          >
            <div className="mb-2">
              <DateSkeleton />
              <TitleSkeleton className="mt-1 h-6" />
            </div>
            <TextSkeleton count={2} />
          </li>
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
