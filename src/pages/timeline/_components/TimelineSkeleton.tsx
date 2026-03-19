import { DateSkeleton, TitleSkeleton, TextSkeleton } from '@/components/ui/skeletons'
import { Skeleton } from '@/components/ui/skeleton'

export default function TimelineSkeleton() {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {Array.from({ length: 5 }).map((_, index) => (
        <li
          key={index}
          className="my-8 ms-6 relative animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}>
          <Skeleton className="absolute w-6 h-6 rounded-full -left-9 top-0 ring-8 ring-background" />
          <div className="block p-4 bg-card rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <TitleSkeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <DateSkeleton className="mb-2" />
            <TextSkeleton count={2} />
          </div>
        </li>
      ))}
    </ol>
  )
}
