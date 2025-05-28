'use client'

import { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import Loading from './Loading'
import { fetchSanityData } from '@/app/lib/services/sanity'
import { queries } from '@/app/lib/services/sanity.queries'
import { Project } from '@/app/lib/types/sanity'

async function getData() {
  const query = queries.projects.list
  return await fetchSanityData<Project[]>(query)
}

export default function ProjectsList() {
  const [data, setData] = useState<Project[]>([])
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
    return <Loading />
  }

  return <ProjectCard data={data} />
}
