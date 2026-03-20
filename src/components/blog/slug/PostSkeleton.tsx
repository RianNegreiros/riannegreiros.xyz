import {
  TitleSkeleton,
  DateSkeleton,
  ImageSkeleton,
  TextSkeleton,
} from '@/components/ui/skeletons'
import { Skeleton } from '@/components/ui/skeleton'

export default function PostSkeleton() {
  return (
    <div
      className="container mx-auto px-4 py-8 sm:py-12"
      role="status"
      aria-live="polite"
      aria-label="Loading post"
    >
      <div className="animate-slide-up lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 xl:grid-cols-[1fr_320px]">
        <article className="w-full min-w-0">
          <header className="mb-12">
            <TitleSkeleton className="mb-4 h-10 sm:h-14" />
            <DateSkeleton className="w-40" />
            <ImageSkeleton className="mt-8 aspect-video rounded-xl" />
          </header>

          <div className="space-y-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-slide-up"
                style={{
                  animationDelay: `${index * 0.08}s`,
                  animationFillMode: 'both',
                }}
              >
                <TextSkeleton count={3} />
              </div>
            ))}
          </div>
        </article>

        <aside className="mt-12 lg:mt-0">
          <div className="sticky top-20">
            <div className="hidden space-y-3 lg:block">
              <Skeleton className="mb-4 h-5 w-32" />
              <TextSkeleton count={6} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
