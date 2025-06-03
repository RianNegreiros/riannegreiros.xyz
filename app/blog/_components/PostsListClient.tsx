'use client'

import Link from 'next/link'
import { Post } from '@/app/lib/types/sanity'
import { formatDate } from '@/app/lib/utils'
import { MotionLi, MotionUl } from '@/app/components/MotionComponents'

export default function PostsListClient({
  data,
  searchQuery,
}: {
  data: Post[]
  searchQuery?: string
}) {
  if (!data || data.length === 0) {
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
      {data.map((post: Post, index: number) => (
        <MotionLi
          key={post.id}
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
                href={`/blog/${post.slug}`}
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
