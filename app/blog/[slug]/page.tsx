import { Metadata } from 'next'
import PostContent from './_components/PostContent'
import StructuredData from './_components/StructuredData'
import { client, urlFor } from '@/app/lib/services/sanity'
import { cache } from 'react'

export const revalidate = 86400

const getPostMetadata = cache(async (slug: string) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    overview,
    slug,
    image,
    firstPublishedDate,
    updatedAt,
    "author": {
      "name": "Rian Negreiros Dos Santos",
      "url": "${process.env.NEXT_PUBLIC_BASE_URL}"
    }
  }`
  return await client.fetch(query, { slug })
})

const getPostContent = cache(async (slug: string) => {
  const query = `*[_type == "post" && slug.current == $slug][0]`
  return await client.fetch(query, { slug })
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const data = await getPostMetadata(resolvedParams.slug)

  if (!data) {
    return {
      title: 'Postagem não encontrada',
      description: 'A postagem solicitada não existe.',
    }
  }

  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${data.slug.current}`
  const imageUrl = data.image ? urlFor(data.image).url() : undefined

  return {
    title: data.title,
    description: data.overview ?? 'Leia esta postagem no blog.',
    authors: [{ name: data.author.name, url: data.author.url }],
    openGraph: {
      type: 'article',
      title: data.title,
      description: data.overview ?? 'Leia esta postagem no blog.',
      images: imageUrl ? [{ url: imageUrl }] : [],
      url: canonicalUrl,
      publishedTime: data.firstPublishedDate,
      modifiedTime: data.updatedAt ?? data.firstPublishedDate,
      authors: [data.author.name]
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.overview ?? 'Leia esta postagem no blog.',
      images: imageUrl ? [imageUrl] : [],
      creator: '@riannegreiros',
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const post = await getPostContent(resolvedParams.slug)

  return (
    <>
      <StructuredData post={post} baseUrl={process.env.NEXT_PUBLIC_BASE_URL!} />
      <PostContent params={params} />
    </>
  )
}
