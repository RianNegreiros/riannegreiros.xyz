'use client'

import { cn } from '@/lib/utils'
import { Heading } from '@/app/lib/types/sanity'
import { slugify } from '@/app/lib/utils'

interface TableOfContentsProps {
  headings: Heading[]
  className?: string
}

export default function TableOfContents({
  headings,
  className,
}: TableOfContentsProps) {
  const filteredData = headings.filter(
    (heading) => Object.keys(heading).length !== 0
  )
  return (
    <nav
      className={cn('space-y-2', className)}
      aria-label="Tabela de Conteúdos"
    >
      <h4 className="font-semibold">Tabela de Conteúdos</h4>
      <ul className="space-y-2 text-sm">
        {filteredData.map((heading, index) => (
          <li
            key={`${heading.text}-${index}`}
            className={cn('', { 'ml-4': heading.level === 'h3' })}
          >
            <a
              href={`#${slugify(heading.text)}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
