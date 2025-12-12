import { MotionLi } from "@/components/MotionComponents"

export default function TimelineSkeleton() {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {[...Array(5)].map((_, index) => (
        <MotionLi
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="mb-10 ms-6"
        >
          {/* Timeline dot skeleton */}
          <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full -start-3 animate-pulse" />
          
          {/* Content skeleton */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            {/* Date skeleton */}
            <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
            
            {/* Title skeleton */}
            <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />
            
            {/* Description skeleton */}
            <div className="space-y-2 mb-4">
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-4/5 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            
            {/* Tags skeleton */}
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </MotionLi>
      ))}
    </ol>
  )
}
