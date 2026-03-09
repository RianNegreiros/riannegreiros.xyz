import { ProjectCardSkeleton } from './ProjectCardSkeleton'

export default function Loading() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} index={index} />
        ))}
      </div>
    </section>
  )
}
