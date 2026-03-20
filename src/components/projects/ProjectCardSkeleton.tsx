import { Skeleton } from '@/components/ui/skeleton'

export function ProjectCardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="group animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
    >
      <Skeleton className="aspect-video w-full rounded-xl" />
      <div className="mt-4 space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
