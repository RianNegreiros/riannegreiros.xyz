import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProjectDialog } from './ProjectDialog'
import type { ProjectsCard } from '@/lib/types'

interface ProjectCardModal {
  data: ProjectsCard[]
}

export default function ProjectCard({ data }: ProjectCardModal) {
  const [selected, setSelected] = useState<ProjectsCard | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: ProjectsCard) => {
    setSelected(project)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {data.map((item, index) => (
          <motion.div
            key={`${item._id}_${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group">
            <div className="relative aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                loading="lazy"
                src={item.imageUrl}
                alt={`Projeto entitulado ${item.title} apresentando ${item.description}`}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out cursor-zoom-in"
                onClick={() => openModal(item)}
              />
            </div>

            <div className="mt-4 space-y-3">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 group/link">
                <h2 className="font-semibold text-lg group-hover/link:text-primary transition-colors">
                  {item.title}
                </h2>
                <svg
                  className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
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
                    className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                    key={tagItem}>
                    {tagItem}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

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
