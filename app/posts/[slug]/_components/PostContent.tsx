'use client'

import { PortableText } from '@portabletext/react'
import { client, urlFor } from '@/app/lib/sanity'
import Image from 'next/image'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { useTheme } from 'next-themes'
import {
  dracula,
  atomOneLight,
} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { post } from '@/app/lib/interface'
import ShareButton from './ShareButton'
import { CopyButton } from './CopyButton'
import TableOfContents from './TableOfContents'
import { formatDate, slugify } from '@/app/lib/helpers'
import { useTransition, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Loading from './Loading'

async function getData(slug: string) {
  const query = `*[_type == 'post' && slug.current == '${slug}'][0]{
    title,
    firstPublishedDate,
    image,
    slug,
    "blurImage": image.asset->metadata.lqip,
    content[]{
      ...,
      _type == 'image' => {
        ...,
        "blurImage": asset->metadata.lqip
      }
    },
    "headings": content[]{
      _type == "block" && style match "h*" => @
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 30 } })
}

export default function PostContent({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [data, setData] = useState<post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { resolvedTheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const { slug } = await params
      const fetchedData = await getData(slug)

      if (!fetchedData) {
        router.push('/not-found')
      } else {
        setData(fetchedData)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [params])

  if (isLoading || !data) {
    return <Loading />
  }

  const shareParams = {
    slug: data.slug.current,
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

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        <p className="text-muted-foreground mb-8">
          Publicado {formatDate(data.firstPublishedDate)}
        </p>

        {data.image && (
          <Image
            src={urlFor(data.image).url()}
            alt={data.image.alt ? data.image.alt : 'Blog post cover image'}
            priority
            width={800}
            height={400}
            className="rounded-lg mb-8"
            placeholder="blur"
            blurDataURL={data.blurImage}
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
