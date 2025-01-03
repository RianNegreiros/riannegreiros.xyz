import { ProjectsCard } from '../lib/interface'
import { client } from '../lib/sanity'
import ProjectCard from '../components/ProjectCard'
import { Metadata } from 'next'

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

  const data = await client.fetch(query, {}, { next: { revalidate: 30 } })

  return data
}

export const metadata: Metadata = {
  title: 'Projetos',
}

export default async function ProjectsPage() {
  const data: ProjectsCard[] = await getData()

  return <ProjectCard data={data} />
}
