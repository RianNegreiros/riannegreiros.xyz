/* eslint-disable @typescript-eslint/no-explicit-any */

import { PortableText } from '@portabletext/react'
import { urlFor, fetchSanityData } from '@/app/lib/services/sanity'
import { queries } from '@/app/lib/services/sanity.queries'
import { Post } from '@/app/lib/types/sanity'
import Image from 'next/image'
import ShareButton from './ShareButton'
import TableOfContents from './TableOfContents'
import { Suspense } from 'react'
import Loading from './Loading'
import CodeBlock from './CodeBlock'
import { slugify, formatDate } from '@/app/lib/utils'

async function getData(slug: string) {
  const query = queries.posts.bySlug(slug)
  return await fetchSanityData<Post>(query)
}

const PortableTextComponent = {
  types: {
    image: ({ value }: { value: any }) => (
      <Image
        src={value.url}
        alt="Image"
        className="rounded-lg w-full h-auto"
        width={0}
        height={0}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={value.blurImage}
      />
    ),
    code: ({ value }: { value: any }) => <CodeBlock value={value} />,
  },
  block: {
    h2: ({ value }: { value: any }) => {
      const text = value.children?.[0]?.text ?? ''
      return <h2 id={slugify(text)}>{text}</h2>
    },
    h3: ({ value }: { value: any }) => {
      const text = value.children?.[0]?.text ?? ''
      return <h3 id={slugify(text)}>{text}</h3>
    },
    h4: ({ value }: { value: any }) => {
      const text = value.children?.[0]?.text ?? ''
      return <h4 id={slugify(text)}>{text}</h4>
    },
    h5: ({ value }: { value: any }) => {
      const text = value.children?.[0]?.text ?? ''
      return <h5 id={slugify(text)}>{text}</h5>
    },
    h6: ({ value }: { value: any }) => {
      const text = value.children?.[0]?.text ?? ''
      return <h6 id={slugify(text)}>{text}</h6>
    },
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
            <Image
              src={urlFor(data.image).url()}
              alt={data.image.alt ?? `Imagem de capa do post: ${data.title}`}
              priority
              width={1200}
              height={600}
              className="rounded-lg mb-8 w-full h-auto"
              placeholder="blur"
              blurDataURL={data.blurImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
    </Suspense>
  )
}
