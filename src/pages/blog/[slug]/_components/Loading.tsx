import { TitleSkeleton, DateSkeleton, ImageSkeleton, TextSkeleton } from '@/components/ui/skeletons'

export default function Loading() {
  return (
    <div
      className="container mx-auto px-4 py-8 animate-pulse"
      role="status"
      aria-live="polite"
    >
      <article className="max-w-4xl mx-auto">
        <TitleSkeleton className="h-12 mb-4" />
        <DateSkeleton className="w-1/2 mb-8" />
        <ImageSkeleton className="aspect-[2/1] mb-8" />

        <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-8">
          <div className="space-y-4">
            <TextSkeleton count={8} />
          </div>
          <aside className="mt-8 lg:mt-0">
            <div className="sticky top-4">
              <div className="hidden lg:block space-y-2">
                <TextSkeleton count={5} />
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  )
}
