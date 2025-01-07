import PostContent from '@/app/components/PostContent'
import { post } from '@/app/lib/interface'
import { client } from '@/app/lib/sanity'
import { redirect } from 'next/navigation'

type tParams = Promise<{ slug: string }>

async function getData(slug: string) {
  const query = `*[_type == 'post' && slug.current == '${slug}'][0]{
    title,
    firstPublishedDate,
    image,
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

export async function generateMetadata(props: { params: tParams }) {
  const { slug } = await props.params
  const data: post = await getData(slug)

  return {
    title: data.title,
    description: data.overview,
    openGraph: {
      title: data.title,
      description: data.overview,
      type: 'article',
      locale: 'pt_BR',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${slug}`,
      siteName: 'riannegreiros.xyz',
    },
  }
}

export default async function BlogPost({ params }: { params: tParams }) {
  const { slug } = await params
  const data: post = await getData(slug)

  if (!data) {
    redirect('/not-found')
  }

  return <PostContent slug={slug} data={data} />
}
