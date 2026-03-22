import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/services/sanity'
import type { SanityPost } from '@/lib/types'
import { slugify } from '@/lib'
import CodeBlock from './CodeBlock'
import ShareButton from './ShareButton'

type PostContentProps = {
  post: SanityPost
}

function makeHeading(
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  className: string,
) {
  const Tag = tag
  return function Heading({ children, value }: any) {
    const text = value.children?.map((c: any) => c.text || '').join('') || ''
    return (
      <Tag id={slugify(text)} className={className}>
        {children}
      </Tag>
    )
  }
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <figure className="group my-8">
        <img
          loading="lazy"
          src={urlFor(value).url()}
          alt={value.alt || 'Image'}
          className="w-full rounded-xl shadow-md transition-shadow duration-300 group-hover:shadow-xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {value.caption && (
          <figcaption className="text-muted-foreground mt-3 text-center text-sm italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    video: ({ value }: any) => (
      <figure className="my-8">
        <video
          controls
          preload="metadata"
          className="w-full rounded-xl shadow-md"
        >
          <source src={value.asset?.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </figure>
    ),
    code: ({ value }: any) => <CodeBlock value={value} />,
  },
  block: {
    normal: ({ children }: any) => (
      <p className="text-foreground/90 mb-6 leading-relaxed">{children}</p>
    ),
    h1: makeHeading(
      'h1',
      'mt-12 mb-6 scroll-mt-24 text-4xl font-bold first:mt-0',
    ),
    h2: makeHeading(
      'h2',
      'border-border/50 mt-10 mb-5 scroll-mt-24 border-b pb-3 text-3xl font-semibold first:mt-0',
    ),
    h3: makeHeading(
      'h3',
      'mt-8 mb-4 scroll-mt-24 text-2xl font-semibold first:mt-0',
    ),
    h4: makeHeading(
      'h4',
      'mt-6 mb-3 scroll-mt-24 text-xl font-medium first:mt-0',
    ),
    h5: makeHeading(
      'h5',
      'mt-5 mb-3 scroll-mt-24 text-lg font-medium first:mt-0',
    ),
    h6: makeHeading(
      'h6',
      'text-muted-foreground mt-4 mb-2 scroll-mt-24 text-base font-medium first:mt-0',
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-primary/60 text-muted-foreground bg-muted/40 my-8 rounded-r-lg border-l-4 py-4 pl-6 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-6 ml-4 list-inside list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-6 ml-4 list-inside list-decimal space-y-2">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="text-foreground font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-muted/70 border-border/50 rounded-md border px-2 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        className="text-primary hover:text-primary/80 decoration-primary/30 underline underline-offset-4 transition-colors duration-200"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={
          value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined
        }
      >
        {children}
      </a>
    ),
  },
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <PortableText
          value={post.content ?? []}
          components={portableTextComponents}
        />
      </div>

      <div className="border-border mt-12 border-t pt-8">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
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
