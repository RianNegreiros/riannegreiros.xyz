import ShareButtons from '@/app/components/ShareMenu'
import { post } from '@/app/lib/interface'
import { client } from '@/app/lib/sanity'
import { redirect } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

export const revalidate = 30

async function getData(slug: string) {
  const query = `*[_type == 'post' && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          firstPublishedDate
      }[0]`

  const data = await client.fetch(query, {}, { next: { revalidate: 30 } })
  return data
}

type tParams = Promise<{ slug: string }>

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
      siteName: 'riannegreiros.dev',
    },
  }
}

export default async function BlogArticle(props: { params: tParams }) {
  const { slug } = await props.params
  const data: post = await getData(slug)

  if (!data) {
    redirect('/not-found')
  }

  const shareParams = {
    slug,
    body: `Check out this article: ${data.title}. Read more at: `,
    title: data.title,
  }

  return (
    <div className="mt-8 flex flex-col items-center max-w-full overflow-hidden">
      <h1 className="text-center">
        <span className="font-bold">Publicado</span>{' '}
        <span className="text-base font-semibold tracking-wide text-gray-500 dark:text-gray-400">
          {new Date(data.firstPublishedDate).toLocaleString('pt-BR', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
            timeZoneName: 'short',
          })}
        </span>
        <span className="mt-2 block text-3xl leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <div className="mt-4 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary max-w-full overflow-x-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            img: ({ ...props }) => (
              <img {...props} className="max-w-full h-auto" alt={props.alt} />
            ),
          }}
        >
          {data.content}
        </ReactMarkdown>
      </div>
      <ShareButtons params={shareParams} />
    </div>
  )
}
