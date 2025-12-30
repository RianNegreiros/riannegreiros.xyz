/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/services/sanity'
import type { Post } from '@/lib/types'
import { slugify } from '@/lib'
import CodeBlock from './CodeBlock'
import ShareButton from './ShareButton'

type PostContentProps = {
  post: Post
}

const createPortableTextComponents = () => ({
  types: {
    image: ({ value }: any) => (
      <figure className="my-8 group">
        <img
          loading="lazy"
          src={urlFor(value).url()}
          alt={value.alt || 'Image'}
          className="w-full rounded-xl shadow-md transition-shadow duration-300 group-hover:shadow-xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {value.caption && (
          <figcaption className="text-sm text-muted-foreground text-center mt-3 italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    code: ({ value }: any) => <CodeBlock value={value} />,
  },
  block: {
    normal: ({ children }: any) => (
      <p className="mb-6 leading-relaxed text-foreground/90">{children}</p>
    ),
    h1: ({ children, value }: any) => {
      const text =
        value.children?.map((child: any) => child.text || '').join('') || ''
      return (
        <h1
          id={slugify(text)}
          className="scroll-mt-24 text-4xl font-bold mb-6 mt-12 first:mt-0">
          {children}
        </h1>
      )
    },
    h2: ({ children, value }: any) => {
      const text =
        value.children?.map((child: any) => child.text || '').join('') || ''
      return (
        <h2
          id={slugify(text)}
          className="scroll-mt-24 text-3xl font-semibold mb-5 mt-10 first:mt-0 border-b border-border/50 pb-3">
          {children}
        </h2>
      )
    },
    h3: ({ children, value }: any) => {
      const text =
        value.children?.map((child: any) => child.text || '').join('') || ''
      return (
        <h3
          id={slugify(text)}
          className="scroll-mt-24 text-2xl font-semibold mb-4 mt-8 first:mt-0">
          {children}
        </h3>
      )
    },
    h4: ({ children, value }: any) => {
      const text =
        value.children?.map((child: any) => child.text || '').join('') || ''
      return (
        <h4
          id={slugify(text)}
          className="scroll-mt-24 text-xl font-medium mb-3 mt-6 first:mt-0">
          {children}
        </h4>
      )
    },
    h5: ({ children, value }: any) => {
      const text =
        value.children?.map((child: any) => child.text || '').join('') || ''
      return (
        <h5
          id={slugify(text)}
          className="scroll-mt-24 text-lg font-medium mb-3 mt-5 first:mt-0">
          {children}
        </h5>
      )
    },
    h6: ({ children, value }: any) => {
      const text =
        value.children?.map((child: any) => child.text || '').join('') || ''
      return (
        <h6
          id={slugify(text)}
          className="scroll-mt-24 text-base font-medium mb-2 mt-4 first:mt-0 text-muted-foreground">
          {children}
        </h6>
      )
    },
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary/60 pl-6 my-8 italic text-muted-foreground bg-muted/40 py-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2 ml-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 ml-4">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-muted/70 border border-border/50 px-2 py-0.5 rounded-md text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        className="text-primary hover:text-primary/80 underline decoration-primary/30 underline-offset-4 transition-colors duration-200"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={
          value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined
        }>
        {children}
      </a>
    ),
  },
})

export default function PostContent({ post }: PostContentProps) {
  return (
    <>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <PortableText
          value={post.content}
          components={createPortableTextComponents()}
        />
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Gostou deste artigo? Compartilhe!
          </p>
          <ShareButton
            slug={post.slug}
            title={post.title}
            description={post.overview}
          />
        </div>
      </div>
    </>
  )
}
