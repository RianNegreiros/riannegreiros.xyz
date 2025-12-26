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
    <div className="w-full max-w-4xl mx-auto">
      <Timeline />
    </div>
  )
}
