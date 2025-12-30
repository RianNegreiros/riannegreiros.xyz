import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client, urlFor } from '@/lib/services/sanity'
import type { Post } from '@/lib/types'
import { formatDate } from '@/lib'
import { useSEO } from '@/hooks/useSEO'
import { BlogPostStructuredData } from '@/components/StructuredData'
import PostContent from './_components/PostContent'
import PostSkeleton from './_components/PostSkeleton'
import TableOfContents from './_components/TableOfContents'

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
      <div className="container mx-auto px-4">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-2">Post não encontrado</h1>
          <p className="text-muted-foreground">
            O artigo que você está procurando não existe.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <BlogPostStructuredData
        title={post.title}
        description={post.overview || ''}
        url={`${import.meta.env.VITE_BASE_URL}/blog/${slug}`}
        image={post.image ? urlFor(post.image).url() : undefined}
        publishedTime={post.firstPublishedDate}
        modifiedTime={post.updatedAt}
      />

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

            <PostContent post={post} />
          </article>

          <aside className="mt-12 lg:mt-0">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto toc-scroll">
              <TableOfContents
                className="hidden lg:block"
                headings={post.headings || []}
              />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
