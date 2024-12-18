import PostContent from '@/app/components/PostContent'
import { post } from '@/app/lib/interface'
import { client } from '@/app/lib/sanity'
import { redirect } from 'next/navigation'

type tParams = Promise<{ slug: string }>

async function getData(slug: string) {
  const query = `*[_type == 'post' && slug.current == '${slug}'][0]`

  return await client.fetch(query, {}, { next: { revalidate: 30 } })
}

export async function generateMetadata(props: { params: tParams }) {
  const { slug } = await props.params
  const data: post = await getData(slug)
  if (!data) {
    return
  }

  return {
    title: data.title,
    description: data.overview,
    openGraph: {
      title: data.title,
      description: data.overview,
      type: 'article',
      locale: 'pt_BR',
      url: `${process.env.BASE_URL}/post/${slug}`,
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
