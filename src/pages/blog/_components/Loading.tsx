import { MotionLi, MotionUl } from '@/components/MotionComponents'
import { DateSkeleton, TitleSkeleton, TextSkeleton } from '@/components/ui/skeletons'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto mt-5" role="status" aria-live="polite">
      <MotionUl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <MotionLi
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="pb-6"
          >
            <div className="space-y-2">
              <DateSkeleton />
              <TitleSkeleton />
              <TextSkeleton count={2} />
            </div>
          </MotionLi>
        ))}
      </MotionUl>
      <div className="mt-8 flex justify-center">
        <Skeleton className="w-64 h-10" />
      </div>
    </div>
  )
}
