/* eslint-disable @typescript-eslint/no-explicit-any */

import { PortableText } from '@portabletext/react'
import ShareButton from './ShareButton'
import TableOfContents from './TableOfContents'
import MobileTableOfContents from './MobileTableOfContents'
import { Suspense } from 'react'
import Loading from './Loading'
import CodeBlock from './CodeBlock'
import { fetchSanityData, queries, urlFor } from '@/lib/services'
import type { Post } from '@/lib/types'
import { formatDate, slugify } from '@/lib'

async function getData(slug: string) {
  const query = queries.posts.bySlug
  return await fetchSanityData<Post>(query, { slug })
}

const PortableTextComponent = {
  types: {
    image: ({ value }: any) => (
      <figure className="my-8">
        <img
          src={value.url}
          alt={value.alt || 'Image'}
          className="rounded-lg w-full h-auto shadow-sm"
          width={0}
          height={0}
          sizes="100vw"
        />
        {value.caption && (
          <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    code: ({ value }: any) => <CodeBlock value={value} />,
  },
  block: {
    normal: ({ children }: any) => (
      <p className="mb-4 leading-7 text-justify">{children}</p>
    ),
    h1: ({ children, value }: any) => {
      const text =
        value.children?.map((child: any) => child.text || '').join('') || ''
      return (
        <h1
          id={slugify(text)}
          className="scroll-mt-20 text-3xl font-bold mb-6 mt-8 first:mt-0">
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
          className="scroll-mt-20 text-2xl font-semibold mb-4 mt-8 first:mt-0 border-b border-border pb-2">
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
          className="scroll-mt-20 text-xl font-semibold mb-3 mt-6 first:mt-0">
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
          className="scroll-mt-20 text-lg font-medium mb-2 mt-5 first:mt-0">
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
          className="scroll-mt-20 text-base font-medium mb-2 mt-4 first:mt-0">
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
          className="scroll-mt-20 text-sm font-medium mb-2 mt-4 first:mt-0 text-muted-foreground">
          {children}
        </h6>
      )
    },
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground bg-muted/30 py-2 rounded-r-md">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-1 ml-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 ml-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-7">{children}</li>,
    number: ({ children }: any) => <li className="leading-7">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={
          value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined
        }>
        {children}
      </a>
    ),
  },
}

export default async function PostContent({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = await getData(slug)

  if (!data) {
    return <div>Post not found</div>
  }

  const shareParams = {
    slug: data.slug,
    body: `Confira este artigo: ${data.title}. Leia mais em:`,
    title: data.title,
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          <p className="text-muted-foreground mb-8">
            Publicado {formatDate(data.firstPublishedDate)}
          </p>

          {data.image && (
            <img
              src={urlFor(data.image).url()}
              alt={data.image.alt ?? `Imagem de capa do post: ${data.title}`}
              width={1200}
              height={600}
              className="rounded-lg mb-8 w-full h-auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          <MobileTableOfContents headings={data.headings} />

          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-pre:bg-muted prose-pre:border prose-img:rounded-lg prose-img:shadow-sm">
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

        <ShareButton
          slug={shareParams.slug.current}
          body={shareParams.body}
          title={shareParams.title}
        />
      </div>
    </Suspense>
  )
}
