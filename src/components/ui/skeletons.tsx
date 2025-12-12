import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface SkeletonProps {
  className?: string
  count?: number
}

export function TextSkeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className={cn("h-4", className)} />
      ))}
    </div>
  )
}

export function TitleSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-6 w-3/4", className)} />
}

export function DateSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-4 w-24", className)} />
}

export function ImageSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("w-full aspect-video", className)} />
}

export function TagsSkeleton({ count = 3, className }: SkeletonProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className={cn("h-6 w-16", className)} />
      ))}
    </div>
  )
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <ImageSkeleton />
      <div className="space-y-2">
        <TitleSkeleton />
        <TextSkeleton count={2} />
        <TagsSkeleton />
      </div>
    </div>
  )
}
