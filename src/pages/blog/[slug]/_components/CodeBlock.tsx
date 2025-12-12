import { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
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
  const [isDark] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  return (
    <div style={{ position: 'relative' }} aria-label="Code block">
      <CopyButton value={value.code} className="absolute right-0 top-0" />
      <SyntaxHighlighter
        language={value.language}
        style={isDark ? dracula : atomOneLight}
        showLineNumbers
        customStyle={{
          borderRadius: '0.5rem',
        }}
      >
        {value.code}
      </SyntaxHighlighter>
    </div>
  )
}
