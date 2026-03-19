import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import { CopyButton } from './CopyButton'
import { useTheme } from '@/hooks/useTheme'

interface CodeBlockProps {
  value: {
    code: string
    language: string
  }
}

export default function CodeBlock({ value }: CodeBlockProps) {
  const { resolvedTheme } = useTheme()
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    codeToHtml(value.code, {
      lang: value.language || 'plaintext',
      theme: resolvedTheme === 'dark' ? 'github-dark' : 'github-light',
    }).then(setHtml)
  }, [value.code, value.language, resolvedTheme])

  if (!html) {
    return (
      <pre className="relative m-2 rounded-lg p-4 bg-muted font-mono text-sm overflow-x-auto">
        <code>{value.code}</code>
      </pre>
    )
  }

  return (
    <div className="relative m-2" aria-label="Code block">
      <CopyButton value={value.code} className="absolute right-2 top-2 z-10" />
      <div
        className="rounded-lg overflow-hidden text-sm [&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:m-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
