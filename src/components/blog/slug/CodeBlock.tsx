import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const theme = getResolvedTheme()

    const highlight = (t: 'dark' | 'light') =>
      import('shiki').then(({ codeToHtml }) =>
        codeToHtml(value.code, {
          lang: value.language || 'plaintext',
          theme: t === 'dark' ? 'github-dark' : 'github-light',
        }).then(setHtml),
      )

    highlight(theme)

    const observer = new MutationObserver(() => highlight(getResolvedTheme()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [value.code, value.language])

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
