import { MotionDiv } from '@/app/components/MotionComponents'

export default function Loading() {
  return (
    <div className="m-5 max-w-4xl mx-auto grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 grid-cols-1">
      {[...Array(6)].map((_, index) => (
        <MotionDiv
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <div className="w-full aspect-w-16 aspect-h-12 bg-gray-200 dark:bg-gray-700 animate-pulse" />

          <div className="p-4 space-y-4">
            <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </MotionDiv>
      ))}
    </div>
  )
}
