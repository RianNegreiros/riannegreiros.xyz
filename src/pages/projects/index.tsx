import { useSEO } from '@/hooks/useSEO'
import ProjectsList from './_components/ProjectsList'

export default function ProjectsPage() {
  useSEO({
    title: 'Projects | Rian Negreiros',
    description:
      'Explore meus projetos de engenharia de software, contribuições para projetos e experimentos técnicos.',
    url: `${import.meta.env.VITE_BASE_URL}/projects`,
  })

  return (
    <div className="w-full">
      <ProjectsList />
    </div>
  )
}
