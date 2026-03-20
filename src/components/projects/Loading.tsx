import { ProjectCardSkeleton } from './ProjectCardSkeleton'

export default function Loading() {
  return (
    <section className="w-full">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} index={index} />
        ))}
      </div>
    </section>
  )
}
