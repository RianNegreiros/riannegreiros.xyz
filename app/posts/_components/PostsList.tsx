'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { post } from '@/app/lib/interface'
import { client } from '@/app/lib/sanity'
import { formatDate } from '@/app/lib/helpers'
import { MotionLi, MotionUl } from '@/app/components/MotionComponents'
import Loading from './Loading'
import { useSearchParams } from 'next/navigation'

async function getData(
  pageNum: number = 0,
  postsPerPage: number = 10,
  searchQuery?: string
) {
  const start = pageNum * postsPerPage
  const end = start + postsPerPage

  let query = `*[_type == 'post']`

  if (searchQuery) {
    query += `[title match "*${searchQuery}*" || overview match "*${searchQuery}*"]`
  }

  query += ` | order(firstPublishedDate desc) [${start}...${end}] {
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
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') ?? ''

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const postsPerPage = 10
      const fetchedData = await getData(pageNum, postsPerPage, searchQuery)
      setData(fetchedData)
      setIsLoading(false)
    }
    fetchData()
  }, [pageNum, searchQuery])

  if (isLoading || !data) {
    return <Loading />
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-muted-foreground">
          {searchQuery
            ? 'Nenhum post encontrado para sua busca.'
            : 'Nenhum post encontrado.'}
        </p>
      </div>
    )
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
