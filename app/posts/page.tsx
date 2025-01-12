'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { client } from '../lib/sanity'
import { getTotalPosts } from '../action'
import PaginationNav from '../components/PaginationNav'
import PostSkeletonLoader from '../components/PostSkeletonLoader'
import { formatDate } from '../lib/helpers'
import { post } from '../lib/interface'

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

export default function PostsPage() {
  const [data, setData] = useState<post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageNum, setPageNum] = useState(0)
  const [maxPage, setMaxPage] = useState(0)
  const postsPerPage = 10

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const posts = await getData(pageNum, postsPerPage)
      const postsNum = await getTotalPosts()
      setData(posts)
      setMaxPage(Math.ceil(postsNum / postsPerPage))
      setIsLoading(false)
    }

    fetchData()
  }, [pageNum])

  return (
    <div className="max-w-4xl mx-auto mt-5">
      {isLoading ? (
        <PostSkeletonLoader />
      ) : (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {data.map((post, index) => (
            <motion.li
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
            </motion.li>
          ))}
        </motion.ul>
      )}
      <PaginationNav maxPage={maxPage} />
    </div>
  )
}
