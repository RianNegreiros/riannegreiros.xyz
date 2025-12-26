/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { client, urlFor } from '@/lib/services/sanity'
import type { Post } from '@/lib/types'
import { formatDate, slugify } from '@/lib'
import { useSEO } from '@/hooks/useSEO'
import { BlogPostStructuredData } from '@/components/StructuredData'
import TableOfContents from './_components/TableOfContents'
import CodeBlock from './_components/CodeBlock'
import PostSkeleton from './_components/PostSkeleton'
import ShareButton from './_components/ShareButton'

// Portable Text Components Configuration
const createPortableTextComponents = () => ({
  types: {
    image: ({ value }: any) => (
      <figure className="my-8">
        <img
          loading="lazy"
          src={urlFor(value).url()}
          alt={value.alt || 'Image'}
          className="w-full rounded-lg shadow-sm"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-muted border border-border px-2 py-1 rounded text-sm font-mono">
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
})

// Sanity Query
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

  // SEO for blog post
  useSEO({
    title: post ? `${post.title} | Rian Negreiros` : 'Loading...',
    description: post?.overview || 'Blog post by Rian Negreiros',
    image: post?.image ? urlFor(post.image).url() : '/og-image.jpg',
    url: `${import.meta.env.VITE_BASE_URL}/blog/${slug}`,
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
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground">Post não encontrado.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {post && (
        <BlogPostStructuredData
          title={post.title}
          description={post.overview || ''}
          url={`${import.meta.env.VITE_BASE_URL}/blog/${slug}`}
          image={post.image ? urlFor(post.image).url() : undefined}
          publishedTime={post.firstPublishedDate}
          modifiedTime={post.updatedAt}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
          <article className="w-full min-w-0">
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <p className="text-muted-foreground">
                Publicado {formatDate(post.firstPublishedDate)}
              </p>
              {post.image && (
                <figure className="aspect-video overflow-hidden mb-8">
                  <img
                    loading="lazy"
                    src={urlFor(post.image).url()}
                    alt={
                      post.image.alt ?? `Imagem de capa do post: ${post.title}`
                    }
                    className="w-full h-full object-cover rounded-lg shadow-sm"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </figure>
              )}
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none w-full">
              <PortableText
                value={post.content}
                components={createPortableTextComponents()}
              />
            </div>

            <ShareButton
              slug={post.slug.current}
              title={post.title}
              body={post.overview || ''}
            />
          </article>

          <aside className="mt-8 lg:mt-0">
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto toc-scroll">
              <TableOfContents
                className="hidden lg:block"
                headings={post.headings || []}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
