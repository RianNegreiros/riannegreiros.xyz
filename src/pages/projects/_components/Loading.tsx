import { MotionDiv } from '@/components/MotionComponents'
import { CardSkeleton } from '@/components/ui/skeletons'

export default function Loading() {
  return (
    <div className="m-5 max-w-4xl mx-auto grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 grid-cols-1">
      {Array.from({ length: 6 }).map((_, index) => (
        <MotionDiv
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-4">
          <CardSkeleton />
        </MotionDiv>
      ))}
    </div>
  )
}
