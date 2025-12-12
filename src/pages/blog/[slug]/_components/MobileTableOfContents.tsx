'use client'

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
    (heading) => Object.keys(heading).length !== 0
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
    <div className={cn('lg:hidden mb-6', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 bg-card border rounded-lg shadow-sm hover:bg-muted/50 transition-colors"
        aria-expanded={isOpen}
        aria-controls="mobile-toc"
      >
        <span className="font-medium text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Tabela de Conteúdos
        </span>
        <svg
          className={cn('w-4 h-4 transition-transform duration-200', {
            'rotate-180': isOpen,
          })}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          id="mobile-toc"
          className="mt-2 p-4 bg-card border rounded-lg shadow-sm animate-in slide-in-from-top-2 duration-200"
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
                    'block w-full text-left py-2 px-2 -mx-2 rounded-md transition-colors duration-200 leading-relaxed hover:bg-muted/50',
                    {
                      'font-medium text-foreground': heading.level === 'h2',
                      'font-normal text-muted-foreground': heading.level !== 'h2',
                    }
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
