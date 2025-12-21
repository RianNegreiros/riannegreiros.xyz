import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015, github } from 'react-syntax-highlighter/dist/esm/styles/hljs'
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

  return (
    <div className="relative" aria-label="Code block">
      <CopyButton value={value.code} className="absolute right-0 top-0" />
      <SyntaxHighlighter
        language={value.language}
        style={resolvedTheme === 'dark' ? vs2015 : github}
        showLineNumbers
        customStyle={{ borderRadius: '0.5rem' }}>
        {value.code}
      </SyntaxHighlighter>
    </div>
  )
}
