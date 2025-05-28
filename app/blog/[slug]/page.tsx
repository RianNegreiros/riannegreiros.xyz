import { Metadata } from 'next'
import PostContent from './_components/PostContent'
import StructuredData from './_components/StructuredData'
import { client, urlFor } from '@/app/lib/services/sanity'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    overview,
    slug,
    image,
    firstPublishedDate,
    updatedAt,
    tags,
    "author": {
      "name": "Rian Negreiros Dos Santos",
      "url": "${process.env.NEXT_PUBLIC_BASE_URL}"
    }
  }`
  const data = await client.fetch(query, { slug: resolvedParams.slug })

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
    keywords: data.tags ?? [],
    authors: [{ name: data.author.name, url: data.author.url }],
    openGraph: {
      type: 'article',
      title: data.title,
      description: data.overview ?? 'Leia esta postagem no blog.',
      images: imageUrl ? [{ url: imageUrl }] : [],
      url: canonicalUrl,
      publishedTime: data.firstPublishedDate,
      modifiedTime: data.updatedAt ?? data.firstPublishedDate,
      authors: [data.author.name],
      tags: data.tags ?? [],
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
  const query = `*[_type == "post" && slug.current == $slug][0]`
  const post = await client.fetch(query, { slug: resolvedParams.slug })

  return (
    <>
      <StructuredData post={post} baseUrl={process.env.NEXT_PUBLIC_BASE_URL!} />
      <PostContent params={params} />
    </>
  )
}
