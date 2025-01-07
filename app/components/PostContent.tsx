'use client'

import { PortableText } from '@portabletext/react'
import { urlFor } from '../lib/sanity'
import Image from 'next/image'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { useTheme } from 'next-themes'
import {
  dracula,
  atomOneLight,
} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { post } from '../lib/interface'
import ShareButton from './ShareButton'
import { CopyButton } from './CopyButton'
import TableOfContents from './TableOfContents'
import { slugify } from '../lib/helpers'

interface PostContentProps {
  slug: string
  data: post
}

export default function PostContent({ slug, data }: PostContentProps) {
  const { resolvedTheme } = useTheme()

  const shareParams = {
    slug,
    body: `Confira este artigo: ${data.title}. Leia mais em:`,
    title: data.title,
  }

  const PortableTextComponent = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          src={urlFor(value).url()}
          alt="Image"
          className="rounded-lg w-full h-auto"
          width={0}
          height={0}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={value.blurImage}
        />
      ),
      code: ({ value }: { value: any }) => (
        <div style={{ position: 'relative' }}>
          <CopyButton value={value.code} className="absolute right-0 top-0" />
          <SyntaxHighlighter
            language={value.language}
            style={resolvedTheme === 'dark' ? dracula : atomOneLight}
            showLineNumbers
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      ),
    },
    block: {
      h2: ({ value }: { value: any }) => (
        <h2 id={slugify(value.children[0].text)}>{value.children[0].text}</h2>
      ),
      h3: ({ value }: { value: any }) => (
        <h3 id={slugify(value.children[0].text)}>{value.children[0].text}</h3>
      ),
      h4: ({ value }: { value: any }) => (
        <h4 id={slugify(value.children[0].text)}>{value.children[0].text}</h4>
      ),
      h5: ({ value }: { value: any }) => (
        <h5 id={slugify(value.children[0].text)}>{value.children[0].text}</h5>
      ),
      h6: ({ value }: { value: any }) => (
        <h6 id={slugify(value.children[0].text)}>{value.children[0].text}</h6>
      ),
    },
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }

    return `Publicado ${date.toLocaleDateString('pt-BR', options)}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        <p className="text-muted-foreground mb-8">
          {formatDate(data.firstPublishedDate)}
        </p>

        {data.image && (
          <Image
            src={urlFor(data.image).url()}
            alt="Blog post cover image"
            priority
            width={800}
            height={400}
            className="rounded-lg mb-8"
          />
        )}

        <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-8">
          <div className="prose prose-lg dark:prose-invert">
            <PortableText
              value={data.content}
              components={PortableTextComponent}
            />
          </div>
          <aside className="mt-8 lg:mt-0">
            <div className="sticky top-4">
              <TableOfContents
                className="hidden lg:block"
                headings={data.headings}
              />
            </div>
          </aside>
        </div>
      </article>

      <ShareButton params={shareParams} />
    </div>
  )
}
