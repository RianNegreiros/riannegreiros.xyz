import { useEffect, useState } from 'react'
import { highlight } from '@/lib/shiki'
import { CopyButton } from './CopyButton'

interface CodeBlockProps {
  value: {
    code: string
    language: string
  }
}

function getResolvedTheme(): 'dark' | 'light' {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export default function CodeBlock({ value }: CodeBlockProps) {
  const [html, setHtml] = useState<string>('')
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>(() =>
    getResolvedTheme(),
  )

  useEffect(() => {
    highlight(
      value.code,
      value.language,
      currentTheme === 'dark' ? 'github-dark' : 'github-light',
    )
      .then(setHtml)
      .catch(console.error)
  }, [value.code, value.language, currentTheme])

  useEffect(() => {
    const updateTheme = () => setCurrentTheme(getResolvedTheme())

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  if (!html) {
    return (
      <pre className="bg-muted relative m-2 overflow-x-auto rounded-lg p-4 font-mono text-sm">
        <code>{value.code}</code>
      </pre>
    )
  }

  return (
    <div className="relative m-2" aria-label="Code block">
      <CopyButton value={value.code} className="absolute top-2 right-2 z-10" />
      <div
        className="overflow-hidden rounded-lg text-sm [&>pre]:m-0 [&>pre]:overflow-x-auto [&>pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
