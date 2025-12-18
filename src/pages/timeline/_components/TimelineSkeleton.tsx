import { MotionLi } from '@/components/MotionComponents'
import {
  DateSkeleton,
  TitleSkeleton,
  TextSkeleton,
  TagsSkeleton,
} from '@/components/ui/skeletons'
import { Skeleton } from '@/components/ui/skeleton'

export default function TimelineSkeleton() {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {Array.from({ length: 5 }).map((_, index) => (
        <MotionLi
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="mb-10 ms-6">
          <Skeleton className="absolute w-6 h-6 rounded-full -start-3" />

          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <DateSkeleton className="mb-2" />
            <TitleSkeleton className="mb-3" />
            <TextSkeleton count={3} className="mb-4" />
            <TagsSkeleton />
          </div>
        </MotionLi>
      ))}
    </ol>
  )
}
