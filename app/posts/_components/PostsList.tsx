'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { post } from '@/app/lib/interface'
import { client } from '@/app/lib/sanity'
import { formatDate } from '@/app/lib/helpers'
import { MotionLi, MotionUl } from '@/app/components/MotionComponents'
import Loading from './Loading'

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

export default function PostsList({ pageNum }: { pageNum: number }) {
  const [data, setData] = useState<post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const postsPerPage = 10
      const fetchedData = await getData(pageNum, postsPerPage)
      setData(fetchedData)
      setIsLoading(false)
    }
    fetchData()
  }, [pageNum])

  if (isLoading || !data) {
    return <Loading />
  }

  return (
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
  )
}
