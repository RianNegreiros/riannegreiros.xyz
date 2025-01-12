import { Skeleton } from '@/components/ui/skeleton'

export default function ProjectSkeletonLoader() {
  return (
    <div className="m-5 max-w-4xl mx-auto grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 grid-cols-1">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[...Array(3)].map((_, j) => (
              <Skeleton key={j} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
