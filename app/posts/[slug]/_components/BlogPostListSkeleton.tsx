import { MotionLi, MotionUl } from '@/app/components/MotionComponents'

export default function BlogPostListSkeleton() {
  return (
    <div className="max-w-4xl mx-auto mt-5">
      <MotionUl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        {[...Array(10)].map((_, index) => (
          <MotionLi
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="pb-6"
          >
            <div className="mb-2">
              <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="w-3/4 h-6 mt-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-2/3 h-4 mt-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </MotionLi>
        ))}
      </MotionUl>
      <div className="mt-8 flex justify-center">
        <div className="w-64 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    </div>
  )
}
