'use client'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { useTheme } from 'next-themes'
import {
  dracula,
  atomOneLight,
} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { CopyButton } from './CopyButton'

interface CodeBlockProps {
  value: {
    code: string
    language: string
  }
}

export default function CodeBlock({ value }: CodeBlockProps) {
  const { resolvedTheme } = useTheme()

  return (
    <div style={{ position: 'relative' }} aria-label="Code block">
      <CopyButton value={value.code} className="absolute right-0 top-0" />
      <SyntaxHighlighter
        language={value.language}
        style={resolvedTheme === 'dark' ? dracula : atomOneLight}
        showLineNumbers
      >
        {value.code}
      </SyntaxHighlighter>
    </div>
  )
}
