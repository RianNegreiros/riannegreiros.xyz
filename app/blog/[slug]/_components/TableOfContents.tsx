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
    <nav className={cn('space-y-2', className)}>
      <h4 className="font-semibold">Tabela de Conteúdos</h4>
      <ul className="space-y-2 text-sm">
        {filteredData.map((heading) => (
          <li
            key={heading._key}
            className={cn('', { 'ml-4': heading.style === 'h3' })}
          >
            <a
              href={`#${slugify(heading.children[0].text)}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {heading.children[0].text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
