import { DateSkeleton, TitleSkeleton, TextSkeleton } from '@/components/ui/skeletons'

export function BlogPostSkeleton({ index }: { index: number }) {
  return (
    <li
      className="pb-6 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}>
      <div className="mb-2">
        <DateSkeleton />
        <TitleSkeleton className="h-6 mt-1" />
      </div>
      <TextSkeleton count={2} />
    </li>
  )
}
