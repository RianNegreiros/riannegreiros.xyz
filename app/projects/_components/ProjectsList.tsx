'use client'

import { useState, useEffect, useTransition } from 'react'
import { ProjectsCard } from '@/app/lib/interface'
import { client } from '@/app/lib/sanity'
import ProjectCard from './ProjectCard'
import ProjectsListSkeleton from './ProjectsListSkeleton'

async function getData() {
  const query = `*[_type == 'project'] | order(_createdAt desc) {
    title,
    _id,
    link,
    description,
    tags,
    "imageUrl": image.asset->url,
    "blurImage": image.asset->metadata.lqip
  }`
  return await client.fetch(query, {}, { next: { revalidate: 30 } })
}

export default function ProjectsList() {
  const [data, setData] = useState<ProjectsCard[]>([])
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      const fetchData = async () => {
        const fetchedData = await getData()
        setData(fetchedData)
      }
      fetchData()
    })
  }, [])

  if (isPending || !data) {
    return <ProjectsListSkeleton />
  }

  return <ProjectCard data={data} />
}
