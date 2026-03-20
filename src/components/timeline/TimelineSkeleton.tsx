import {
  DateSkeleton,
  TitleSkeleton,
  TextSkeleton,
} from '@/components/ui/skeletons'
import { Skeleton } from '@/components/ui/skeleton'

export default function TimelineSkeleton() {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {Array.from({ length: 5 }).map((_, index) => (
        <li
          key={index}
          className="animate-slide-up relative my-8 ms-6"
          style={{
            animationDelay: `${index * 0.1}s`,
            animationFillMode: 'both',
          }}
        >
          <Skeleton className="ring-background absolute top-0 -left-9 h-6 w-6 rounded-full ring-8" />
          <div className="bg-card block rounded-lg p-4">
            <div className="mb-2 flex items-center justify-between">
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
