import { slugify } from '@/lib'
import type { SanityHeading } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ListIcon, ChevronDownIcon } from 'lucide-react'

interface MobileTableOfContentsProps {
  headings: SanityHeading[]
  className?: string
}

const INDENT: Record<string, string> = {
  h2: 'ml-0',
  h3: 'ml-3',
  h4: 'ml-6',
}

export default function MobileTableOfContents({
  headings,
  className,
}: MobileTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const filtered = headings.filter((h) => Object.keys(h).length !== 0)
  if (filtered.length === 0) return null

  const handleClick = (headingText: string) => {
    const element = document.getElementById(slugify(headingText))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsOpen(false)
      window.history.replaceState(null, '', `#${slugify(headingText)}`)
    }
  }

  return (
    <div className={cn('mb-6 lg:hidden', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-card hover:bg-muted/50 flex w-full items-center justify-between rounded-lg border p-4 shadow-sm transition-colors"
        aria-expanded={isOpen}
        aria-controls="mobile-toc"
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          <ListIcon className="h-4 w-4" />
          Tabela de Conteúdos
        </span>
        <ChevronDownIcon
          className={cn('h-4 w-4 transition-transform duration-200', {
            'rotate-180': isOpen,
          })}
        />
      </button>

      {isOpen && (
        <div
          id="mobile-toc"
          className="bg-card animate-in slide-in-from-top-2 mt-2 rounded-lg border p-4 shadow-sm duration-200"
        >
          <ul className="space-y-2 text-sm">
            {filtered.map((heading, index) => (
              <li
                key={`${heading.text}-${index}`}
                className={cn('relative', INDENT[heading.level] ?? 'ml-9')}
              >
                <button
                  onClick={() => handleClick(heading.text)}
                  className={cn(
                    'hover:bg-muted/50 -mx-2 block w-full rounded-md px-2 py-2 text-left leading-relaxed transition-colors duration-200',
                    heading.level === 'h2'
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground font-normal',
                  )}
                >
                  <span className="block truncate" title={heading.text}>
                    {heading.text}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
