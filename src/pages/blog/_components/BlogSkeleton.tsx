import { MotionDiv } from "@/components/MotionComponents"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogSkeleton() {
  return (
    <div className="max-w-4xl mx-auto mt-5">
      <div className="mb-6">
        <Skeleton className="h-10 w-full max-w-md" />
      </div>
      
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="pb-6"
          >
            <div className="mb-2">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-7 w-3/4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  )
}
