import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Heading } from '../lib/interface'
import { slugify } from '../lib/helpers'

interface TableOfContentsProps {
  headings: Heading[]
  currentLang: string
}

export default function TableOfContents({
  headings,
  currentLang,
}: TableOfContentsProps) {
  const filteredData = headings.filter(
    (heading) => Object.keys(heading).length !== 0
  )

  const itemHeight = 40
  const maxHeight = 600
  const calculatedHeight = Math.min(filteredData.length * itemHeight, maxHeight)

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          {currentLang === 'en' ? 'Table of Contents' : 'Tabela de Conteúdos'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea
          style={{ height: `${calculatedHeight}px` }}
          className="w-full rounded-md border p-4"
        >
          <ol className="space-y-2">
            {filteredData?.map((heading) => (
              <li key={heading._key}>
                <a
                  href={`#${slugify(heading.children[0].text)}`}
                  className="text-blue-600 hover:underline"
                >
                  {heading.children[0].text}
                </a>
              </li>
            ))}
          </ol>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
