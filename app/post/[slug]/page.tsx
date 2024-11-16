import { post } from '@/app/lib/interface'
import { client } from '@/app/lib/sanity'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

export const revalidate = 30 // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `*[_type == "post" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          _createdAt,
          firstPublishedDate
      }[0]`

  const data = await client.fetch(query)
  return data
}

type tParams = Promise<{ slug: string }>

export default async function BlogArticle(props: { params: tParams }) {
  const { slug } = await props.params
  const data: post = await getData(slug)

  return (
    <div className="mt-8 flex flex-col items-center">
      <h1 className="text-center">
        <span className="block text-base text-primary font-semibold tracking-wide uppercase">
          {new Date(data.firstPublishedDate).toISOString().split('T')[0]}
        </span>
        <span className="mt-2 block text-3xl leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {data.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
