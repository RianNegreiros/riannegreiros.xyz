'use client'

import { useState, useEffect } from 'react'
import { ProjectsCard } from '@/app/lib/interface'
import { client } from '@/app/lib/sanity'
import ProjectCard from './ProjectCard'
import ProjectsListSkeleton from './Loading'

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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const fetchedData = await getData()
      setData(fetchedData)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading || !data) {
    return <ProjectsListSkeleton />
  }

  return <ProjectCard data={data} />
}
