import { createHighlighter, type Highlighter } from 'shiki'

declare global {
  var __shikiHighlighter: Highlighter | undefined
}

const THEMES = ['github-dark', 'github-light']
const LANGUAGES = [
  'javascript',
  'typescript',
  'jsx',
  'tsx',
  'java',
  'css',
  'html',
  'json',
  'bash',
  'sql',
  'plaintext',
  'csharp',
  'yaml',
]

export async function getHighlighter(): Promise<Highlighter> {
  if (globalThis.__shikiHighlighter) return globalThis.__shikiHighlighter

  const highlighter = await createHighlighter({
    themes: THEMES,
    langs: LANGUAGES,
  })

  globalThis.__shikiHighlighter = highlighter
  return highlighter
}

export async function highlight(
  code: string,
  language: string,
  theme: 'github-dark' | 'github-light',
): Promise<string> {
  const highlighterInstance = await getHighlighter()
  return highlighterInstance.codeToHtml(code, {
    lang: (language || 'plaintext') as any,
    theme,
  })
}
