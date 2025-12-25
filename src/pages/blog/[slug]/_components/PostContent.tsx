/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { client, urlFor } from '@/lib/services/sanity'
import type { Post } from '@/lib/types'
import { formatDate, slugify } from '@/lib'
import { useSEO } from '@/hooks/useSEO'
import { BlogPostStructuredData } from '@/components/StructuredData'
import CodeBlock from './CodeBlock'
import PostSkeleton from './PostSkeleton'
import ShareButton from './ShareButton'
import TableOfContents from './TableOfContents'

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
          className="scroll-mt-24 text-4xl font-bold mb-6 mt-12 first:mt-0 bg-linear-to-r from-foreground to-foreground/80 bg-clip-text">
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

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  overview,
  content,
  image,
  firstPublishedDate,
  updatedAt,
  "headings": content[]{
    _type == "block" && style match "h*" => {
      "text": pt::text(@),
      "level": style
    }
  }
}`

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useSEO({
    title: post ? `${post.title} | Rian Negreiros` : 'Loading...',
    description: post?.overview || 'Blog post by Rian Negreiros',
    image: post?.image ? urlFor(post.image).url() : '/og-image.jpg',
    url: `${window.location.origin}/blog/${slug}`,
    type: 'article',
    publishedTime: post?.firstPublishedDate,
    modifiedTime: post?.updatedAt,
  })

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return

      try {
        const data = await client.fetch<Post>(POST_QUERY, { slug })
        setPost(data)
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return <PostSkeleton />
  }

  if (!post) {
    return (
      <div className="mx-auto">
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">Post não encontrado.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {post && (
        <BlogPostStructuredData
          title={post.title}
          description={post.overview || ''}
          url={`${window.location.origin}/blog/${slug}`}
          image={post.image ? urlFor(post.image).url() : undefined}
          publishedTime={post.firstPublishedDate}
          modifiedTime={post.updatedAt}
        />
      )}

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="lg:grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] lg:gap-12">
          <article className="w-full min-w-0">
            <header className="mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <time dateTime={post.firstPublishedDate}>
                  Publicado {formatDate(post.firstPublishedDate)}
                </time>
              </div>
              {post.image && (
                <figure className="mt-8 overflow-hidden rounded-xl shadow-lg">
                  <img
                    loading="lazy"
                    src={urlFor(post.image).url()}
                    alt={
                      post.image.alt ?? `Imagem de capa do post: ${post.title}`
                    }
                    className="w-full h-auto object-cover aspect-video"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </figure>
              )}
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <PortableText
                value={post.content}
                components={createPortableTextComponents()}
              />
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <ShareButton
                slug={post.slug.current}
                title={post.title}
                body={post.overview || ''}
              />
            </div>
          </article>

          <aside className="mt-12 lg:mt-0">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto toc-scroll">
              <TableOfContents
                className="hidden lg:block"
                headings={post.headings}
              />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
