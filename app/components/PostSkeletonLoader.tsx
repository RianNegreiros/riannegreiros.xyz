import { Skeleton } from '@/components/ui/skeleton'

export default function PostSkeletonLoader() {
  return (
    <div className="space-y-4">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="pb-6">
          <Skeleton className="h-4 rounded w-1/4 mb-2"></Skeleton>
          <Skeleton className="h-6 rounded w-3/4 mb-2"></Skeleton>
          <Skeleton className="h-4 rounded w-full"></Skeleton>
          <Skeleton className="h-4 rounded w-2/3 mt-2"></Skeleton>
        </div>
      ))}
    </div>
  )
}
