import Link from 'next/link'
import { post } from '../lib/interface'
import { client } from '../lib/sanity'
import PaginationNav from '../components/PaginationNav'
import { getTotalPosts } from '../action'
import { formatDate } from '../lib/helpers'
import { motion } from 'framer-motion'
import { MotionLi, MotionUl } from '../components/MotionList'

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
      <MotionUl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        {data.map((post, index) => (
          <MotionLi
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="pb-6"
          >
            <header className="mb-2">
              <time
                dateTime={post.firstPublishedDate}
                className="text-sm text-gray-500"
              >
                {formatDate(post.firstPublishedDate)}
              </time>
              <h2 className="text-xl font-semibold mt-1">
                <Link
                  href={`/posts/${post.slug.current}`}
                  className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100"
                >
                  {post.title}
                </Link>
              </h2>
            </header>
            <p className="prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-2">
              {post.overview}
            </p>
          </MotionLi>
        ))}
      </MotionUl>
      <PaginationNav maxPage={maxPage} />
    </div>
  )
}
