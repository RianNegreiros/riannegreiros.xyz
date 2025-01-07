'use client'

import { ProjectsCard } from '../lib/interface'
import { useEffect, useState } from 'react'
import Modal from './Modal'
import Image from 'next/image'
import { urlFor } from '../lib/sanity'

interface ProjectCardModal {
  data: ProjectsCard[]
}

export default function ProjectCard({ data }: ProjectCardModal) {
  const [selected, setSelected] = useState<ProjectsCard | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelected(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setSelected])

  return (
    <section>
      <div className="mt-5 max-w-4xl mx-auto grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 grid-cols-1">
        {data.map((item) => (
          <div key={item._id} className="group block">
            <div className="relative aspect-w-16 aspect-h-12 overflow-hidden rounded-2xl">
              <Image
                src={urlFor(item.image).url()}
                alt={`Projeto entitulado ${item.title} apresentando ${item.description}`}
                fill
                priority
                sizes="100%"
                placeholder="blur"
                blurDataURL={item.blurImage}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-2xl cursor-zoom-in"
                onClick={() => {
                  setSelected(item)
                }}
              />
            </div>
            <div className="mt-4">
              <a href={item.link} target="_blank">
                <h2 className="font-medium text-lg hover:underline">
                  {item.title}
                </h2>
              </a>
              <p className="mt-1 text-muted-foreground line-clamp-3">
                {item.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tagItem, index) => (
                  <span
                    className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary ring-2 ring-inset ring-primary/20"
                    key={index}
                  >
                    {tagItem}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selected && <Modal selected={selected} setSelected={setSelected} />}
    </section>
  )
}
