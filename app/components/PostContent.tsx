/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useState } from 'react'
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
import LanguageToggle from './LanguageToggle'
import ShareMenu from './ShareMenu'
import { CopyButton } from './CopyButton'

interface PostContentProps {
  slug: string
  data: post
}

export default function PostContent({ slug, data }: PostContentProps) {
  const [currentLang, setCurrentLang] = useState<string>('pt')
  const { resolvedTheme } = useTheme()

  const postContent =
    currentLang === 'pt'
      ? data
      : {
          ...data,
          title: data.translations?.en.title || data.title,
          content: data.translations?.en.content || data.content,
        }

  const handleLanguageToggle = (language: string) => {
    setCurrentLang(language)
  }

  const shareParams = {
    slug,
    body:
      currentLang === 'en'
        ? `Check out this article: ${postContent.title}. Read more at: `
        : `Confira este artigo: ${postContent.title}. Leia mais em: `,
    title: postContent.title,
  }

  const PortableTextComponent = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          src={urlFor(value).url()}
          alt="Image"
          className="rounded-lg"
          width={800}
          height={400}
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
  }

  return (
    <div className="m-8 flex flex-col items-center max-w-full overflow-hidden">
      <h1 className="text-center">
        <span className="font-bold">
          {currentLang === 'en' ? 'Published' : 'Publicado'}
        </span>{' '}
        <span className="mr-4 text-base font-semibold tracking-wide text-gray-500 dark:text-gray-400">
          {new Date(postContent.firstPublishedDate).toLocaleString(
            currentLang === 'en' ? 'en-US' : 'pt-BR',
            {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: false,
              timeZoneName: 'short',
            }
          )}
        </span>
        {data.translations && Object.keys(data.translations).length > 0 && (
          <LanguageToggle
            language={currentLang}
            onToggle={handleLanguageToggle}
          />
        )}
        <span className="mt-2 block text-3xl leading-8 font-bold tracking-tight sm:text-4xl">
          {postContent.title}
        </span>
      </h1>

      <div className="mt-4 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary max-w-full overflow-x-auto">
        <PortableText
          value={postContent.content}
          components={PortableTextComponent}
        />
      </div>
      <ShareMenu params={shareParams} />
    </div>
  )
}
