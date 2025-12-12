'use client'

import { slugify } from '@/lib'
import type { Heading } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface TableOfContentsProps {
  headings: Heading[]
  className?: string
}

export default function TableOfContents({
  headings,
  className,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  const filteredData = headings.filter(
    (heading) => Object.keys(heading).length !== 0
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0.1,
      }
    )

    const headingElements = filteredData
      .map((heading) => document.getElementById(slugify(heading.text)))
      .filter(Boolean)

    headingElements.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => {
      headingElements.forEach((element) => {
        if (element) observer.unobserve(element)
      })
    }
  }, [filteredData])

  if (filteredData.length === 0) return null

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    headingText: string
  ) => {
    e.preventDefault()
    const element = document.getElementById(slugify(headingText))
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      // Update URL without triggering navigation
      window.history.replaceState(null, '', `#${slugify(headingText)}`)
    }
  }

  return (
    <nav
      className={cn(
        'rounded-lg border bg-card/50 backdrop-blur-sm p-6 shadow-sm',
        className
      )}
      aria-label="Tabela de Conteúdos"
    >
      <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
        <svg
          className="w-4 h-4"
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
      </h4>
      <ul className="space-y-2 text-sm">
        {filteredData.map((heading, index) => {
          const headingId = slugify(heading.text)
          const isActive = activeId === headingId

          return (
            <li
              key={`${heading.text}-${index}`}
              className={cn('relative transition-all duration-200', {
                'ml-0': heading.level === 'h2',
                'ml-3': heading.level === 'h3',
                'ml-6': heading.level === 'h4',
                'ml-9': heading.level === 'h5' || heading.level === 'h6',
              })}
            >
              {/* Active indicator */}
              <div
                className={cn(
                  'absolute -left-3 top-1 w-0.5 h-4 bg-primary rounded-full transition-opacity duration-200',
                  {
                    'opacity-100': isActive,
                    'opacity-0': !isActive,
                  }
                )}
              />

              <a
                href={`#${headingId}`}
                onClick={(e) => handleClick(e, heading.text)}
                className={cn(
                  'block py-1 px-2 -mx-2 rounded-md transition-all duration-200 leading-relaxed hover:bg-muted/50',
                  {
                    'font-semibold text-primary bg-primary/5':
                      isActive && heading.level === 'h2',
                    'font-medium text-primary bg-primary/5':
                      isActive && heading.level !== 'h2',
                    'font-medium text-foreground hover:text-primary':
                      !isActive && heading.level === 'h2',
                    'font-normal text-muted-foreground hover:text-foreground':
                      !isActive && heading.level !== 'h2',
                  }
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
