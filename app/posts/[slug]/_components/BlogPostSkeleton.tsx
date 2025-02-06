import { Skeleton } from "@/components/ui/skeleton"

export default function BlogPostSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <article className="max-w-4xl mx-auto">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />

        <Skeleton className="w-full aspect-[2/1] rounded-lg mb-8" />

        <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-8">
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <aside className="mt-8 lg:mt-0">
            <div className="sticky top-4">
              <div className="hidden lg:block space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  )
}
