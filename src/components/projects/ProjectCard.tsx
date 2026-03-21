import { useState } from 'react'
import { ProjectDialog } from './ProjectDialog'
import type { SanityProject } from '@/lib/types'
import { optimizedImageUrl } from '@/lib/services/sanity'

interface ProjectCardModal {
  data: SanityProject[]
}

export default function ProjectCard({ data }: ProjectCardModal) {
  const [selected, setSelected] = useState<SanityProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: SanityProject) => {
    setSelected(project)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  return (
    <section className="w-full">
      <div className="animate-fade-in mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {data.map((item, index) => (
          <div
            key={`${item._id}_${index}`}
            className="group animate-slide-up"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both',
            }}
          >
            <div className="relative aspect-video overflow-hidden rounded-xl shadow-md transition-shadow duration-300 hover:shadow-xl">
              <img
                loading="lazy"
                src={optimizedImageUrl(item.image, 600)}
                alt={`Projeto entitulado ${item.title} apresentando ${item.description}`}
                className="h-full w-full cursor-zoom-in object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                width={600}
                height={338}
                onClick={() => openModal(item)}
              />
            </div>

            <div className="mt-4 space-y-3">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2"
              >
                <h2 className="group-hover/link:text-primary text-lg font-semibold transition-colors">
                  {item.title}
                </h2>
                <svg
                  className="h-4 w-4 opacity-0 transition-opacity group-hover/link:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>

              <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tagItem: string) => (
                  <span
                    className="bg-primary/10 text-primary ring-primary/20 inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium ring-1 ring-inset"
                    key={tagItem}
                  >
                    {tagItem}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <ProjectDialog
          project={selected}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </section>
  )
}
