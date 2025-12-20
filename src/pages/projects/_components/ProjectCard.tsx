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
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="m-5 max-w-4xl mx-auto grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 grid-cols-1">
        {data.map((item, index) => (
          <motion.div
            key={`${item._id}_${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group block">
            <div className="relative aspect-16/12 overflow-hidden rounded-2xl">
              <img
                loading="lazy"
                src={item.imageUrl}
                alt={`Projeto entitulado ${item.title} apresentando ${item.description}`}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-2xl cursor-zoom-in"
                onClick={() => openModal(item)}
              />
            </div>
            <div className="mt-4">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2">
                <h2 className="font-medium text-lg hover:underline">
                  {item.title}
                </h2>
              </a>
              <p className="mt-1 text-muted-foreground line-clamp-3">
                {item.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tagItem: string) => (
                  <span
                    className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary ring-2 ring-inset ring-primary/20"
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
