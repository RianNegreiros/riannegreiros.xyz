import { createHighlighter, type Highlighter } from 'shiki'

let highlighter: Highlighter | null = null

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
  if (highlighter) return highlighter

  highlighter = await createHighlighter({
    themes: THEMES,
    langs: LANGUAGES,
  })

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
