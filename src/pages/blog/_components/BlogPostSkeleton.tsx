import { MotionLi } from '@/components/MotionComponents'
import {
  DateSkeleton,
  TitleSkeleton,
  TextSkeleton,
} from '@/components/ui/skeletons'

export function BlogPostSkeleton({ index }: { index: number }) {
  return (
    <MotionLi
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="pb-6">
      <div className="mb-2">
        <DateSkeleton />
        <TitleSkeleton className="h-6 mt-1" />
      </div>
      <TextSkeleton count={2} />
    </MotionLi>
  )
}
