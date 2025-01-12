'use client'

import { ProjectsCard } from '../lib/interface'
import { client } from '../lib/sanity'
import ProjectCard from '../components/ProjectCard'
import { useEffect, useState } from 'react'
import ProjectSkeletonLoader from '../components/ProjectSkeletonLoader'

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

export default function ProjectsPage() {
  const [data, setData] = useState<ProjectsCard[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const projects = await getData()
      setData(projects)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>{isLoading ? <ProjectSkeletonLoader /> : <ProjectCard data={data} />}</>
  )
}
