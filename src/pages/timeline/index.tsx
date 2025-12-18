import { useSEO } from '@/hooks/useSEO'
import Timeline from './_components/Timeline'

export default function TimelinePage() {
  useSEO({
    title: 'Rian Negreiros Dos Santos',
    description:
      'Engenheiro de Software. Explore minha trajetória, projetos e insights técnicos.',
    url: window.location.origin,
  })

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Timeline />
    </div>
  )
}
