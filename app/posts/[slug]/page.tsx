import { Metadata } from 'next'
import { client, urlFor } from '@/app/lib/sanity'
import PostContent from './_components/PostContent'

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
    image
  }`
  const data = await client.fetch(query, { slug: resolvedParams.slug })

  if (!data) {
    return {
      title: 'Postagem não encontrada',
      description: 'A postagem solicitada não existe.',
    }
  }

  return {
    title: data.title,
    description: data.overview || 'Leia esta postagem no blog.',
    openGraph: {
      type: 'article',
      title: data.title,
      description: data.overview || 'Leia esta postagem no blog.',
      images: data.image ? [{ url: urlFor(data.image).url() }] : [],
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${data.slug.current}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.overview || 'Leia esta postagem no blog.',
      images: data.image ? [urlFor(data.image).url()] : [],
    },
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  return <PostContent params={params} />
}
