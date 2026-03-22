import { slugify } from '@/lib'
import type { SanityHeading } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { ListIcon } from 'lucide-react'

interface TableOfContentsProps {
  headings: SanityHeading[]
  className?: string
}

const INDENT: Record<string, string> = {
  h2: 'ml-0',
  h3: 'ml-3',
  h4: 'ml-6',
}

export default function TableOfContents({
  headings,
  className,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  const filtered = headings.filter((h) => Object.keys(h).length !== 0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0.1 },
    )

    const elements = filtered
      .map((h) => document.getElementById(slugify(h.text)))
      .filter(Boolean) as HTMLElement[]

    elements.forEach((el) => observer.observe(el))
    return () => elements.forEach((el) => observer.unobserve(el))
  }, [filtered])

  if (filtered.length === 0) return null

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    headingText: string,
  ) => {
    e.preventDefault()
    const element = document.getElementById(slugify(headingText))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', `#${slugify(headingText)}`)
    }
  }

  return (
    <nav
      className={cn(
        'bg-card/50 rounded-lg border p-6 shadow-sm backdrop-blur-sm',
        className,
      )}
      aria-label="Tabela de Conteúdos"
    >
      <h4 className="text-foreground mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
        <ListIcon className="h-4 w-4" />
        Tabela de Conteúdos
      </h4>
      <ul className="space-y-2 text-sm">
        {filtered.map((heading, index) => {
          const headingId = slugify(heading.text)
          const isActive = activeId === headingId
          const isH2 = heading.level === 'h2'

          return (
            <li
              key={`${heading.text}-${index}`}
              className={cn(
                'relative transition-all duration-200',
                INDENT[heading.level] ?? 'ml-9',
              )}
            >
              <div
                className={cn(
                  'bg-primary absolute top-1 -left-3 h-4 w-0.5 rounded-full transition-opacity duration-200',
                  isActive ? 'opacity-100' : 'opacity-0',
                )}
              />
              <a
                href={`#${headingId}`}
                onClick={(e) => handleClick(e, heading.text)}
                className={cn(
                  'hover:bg-muted/50 -mx-2 block rounded-md px-2 py-1 leading-relaxed transition-all duration-200',
                  isActive && isH2 && 'text-primary bg-primary/5 font-semibold',
                  isActive && !isH2 && 'text-primary bg-primary/5 font-medium',
                  !isActive &&
                    isH2 &&
                    'text-foreground hover:text-primary font-medium',
                  !isActive &&
                    !isH2 &&
                    'text-muted-foreground hover:text-foreground font-normal',
                )}
              >
                <span className="block truncate" title={heading.text}>
                  {heading.text}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
