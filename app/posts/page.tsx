import Link from 'next/link'
import { post } from '../lib/interface'
import { client } from '../lib/sanity'
import PaginationNav from '../components/PaginationNav'
import { getTotalPosts } from '../action'

async function getData(pageNum: number = 0, postsPerPage: number = 10) {
  const start = pageNum * postsPerPage
  const end = start + postsPerPage
  const query = `*[_type == 'post'] | order(firstPublishedDate desc) [${start}...${end}] {
    title,
    _id,
    overview,
    slug,
    firstPublishedDate
  }`
  return await client.fetch(query, {}, { next: { revalidate: 30 } })
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string
  }>
}) {
  const page = await searchParams
  const pageNum = Number(page?.page ?? 0)
  const postsPerPage = 10
  const data: post[] = await getData(pageNum, postsPerPage)
  const postsNum = await getTotalPosts()
  const maxPage = Math.ceil(postsNum / postsPerPage)

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <ul>
        {data.map((post) => (
          <li key={post._id} className="py-4">
            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              <div>
                <p className="text-base font-medium leading-6 text-primary">
                  {new Date(post.firstPublishedDate).toLocaleDateString(
                    'pt-BR',
                    {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    }
                  )}
                </p>
              </div>

              <Link
                href={`/posts/${post.slug.current}`}
                prefetch
                className="space-y-3 xl:col-span-3"
              >
                <div>
                  <h2 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
                    {post.title}
                  </h2>
                </div>

                <p className="prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-2">
                  {post.overview}
                </p>
              </Link>
            </article>
          </li>
        ))}
      </ul>
      <PaginationNav maxPage={maxPage} />
    </div>
  )
}
