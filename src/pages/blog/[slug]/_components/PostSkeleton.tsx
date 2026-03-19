import { TitleSkeleton, DateSkeleton, ImageSkeleton, TextSkeleton } from '@/components/ui/skeletons'
import { Skeleton } from '@/components/ui/skeleton'

export default function PostSkeleton() {
  return (
    <div
      className="container mx-auto px-4 py-8 sm:py-12"
      role="status"
      aria-live="polite"
      aria-label="Loading post">
      <div
        className="lg:grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] lg:gap-12 animate-slide-up">
        <article className="w-full min-w-0">
          <header className="mb-12">
            <TitleSkeleton className="h-10 sm:h-14 mb-4" />
            <DateSkeleton className="w-40" />
            <ImageSkeleton className="mt-8 rounded-xl aspect-video" />
          </header>

          <div className="space-y-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'both' }}>
                <TextSkeleton count={3} />
              </div>
            ))}
          </div>
        </article>

        <aside className="mt-12 lg:mt-0">
          <div className="sticky top-20">
            <div className="hidden lg:block space-y-3">
              <Skeleton className="h-5 w-32 mb-4" />
              <TextSkeleton count={6} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
