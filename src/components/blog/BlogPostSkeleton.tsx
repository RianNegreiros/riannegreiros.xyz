import {
  DateSkeleton,
  TitleSkeleton,
  TextSkeleton,
} from '@/components/ui/skeletons'

export function BlogPostSkeleton({ index }: { index: number }) {
  return (
    <li
      className="animate-slide-up pb-6"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
    >
      <div className="mb-2">
        <DateSkeleton />
        <TitleSkeleton className="mt-1 h-6" />
      </div>
      <TextSkeleton count={2} />
    </li>
  )
}
