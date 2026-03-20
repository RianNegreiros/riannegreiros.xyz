import { slugify } from '@/lib'
import type { Heading } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface MobileTableOfContentsProps {
  headings: Heading[]
  className?: string
}

export default function MobileTableOfContents({
  headings,
  className,
}: MobileTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const filteredData = headings.filter(
    (heading) => Object.keys(heading).length !== 0,
  )

  if (filteredData.length === 0) return null

  const handleClick = (headingText: string) => {
    const element = document.getElementById(slugify(headingText))
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
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
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          Tabela de Conteúdos
        </span>
        <svg
          className={cn('h-4 w-4 transition-transform duration-200', {
            'rotate-180': isOpen,
          })}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="mobile-toc"
          className="bg-card animate-in slide-in-from-top-2 mt-2 rounded-lg border p-4 shadow-sm duration-200"
        >
          <ul className="space-y-2 text-sm">
            {filteredData.map((heading, index) => (
              <li
                key={`${heading.text}-${index}`}
                className={cn('relative', {
                  'ml-0': heading.level === 'h2',
                  'ml-3': heading.level === 'h3',
                  'ml-6': heading.level === 'h4',
                  'ml-9': heading.level === 'h5' || heading.level === 'h6',
                })}
              >
                <button
                  onClick={() => handleClick(heading.text)}
                  className={cn(
                    'hover:bg-muted/50 -mx-2 block w-full rounded-md px-2 py-2 text-left leading-relaxed transition-colors duration-200',
                    {
                      'text-foreground font-medium': heading.level === 'h2',
                      'text-muted-foreground font-normal':
                        heading.level !== 'h2',
                    },
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
