import { MotionDiv } from "@/components/MotionComponents"

export default function PostSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Title skeleton */}
        <div className="w-3/4 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
        
        {/* Date skeleton */}
        <div className="w-48 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8" />
        
        {/* Image skeleton */}
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-8" />
        
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          {/* Content skeleton */}
          <div className="space-y-4">
            {[...Array(8)].map((_, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="w-4/5 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </MotionDiv>
            ))}
          </div>
          
          {/* Table of contents skeleton */}
          <aside className="mt-8 lg:mt-0">
            <div className="sticky top-4">
              <div className="rounded-lg border bg-card/50 backdrop-blur-sm p-6 shadow-sm">
                <div className="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </MotionDiv>
    </div>
  )
}
