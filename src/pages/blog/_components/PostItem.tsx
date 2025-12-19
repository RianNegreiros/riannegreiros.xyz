import { MotionLi } from '@/components/MotionComponents'
import { formatDate } from '@/lib'
import type { Post } from '@/lib/types'
import { Link } from 'react-router-dom'

interface PostItemProps {
  post: Post
  index: number
}

export default function PostItem({ post, index }: PostItemProps) {
  return (
    <MotionLi
      key={post._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="pb-6">
      <header className="mb-2">
        <time
          dateTime={post.firstPublishedDate}
          className="text-sm text-gray-500">
          {formatDate(post.firstPublishedDate)}
        </time>
        <h2 className="text-xl font-semibold mt-1">
          <Link
            to={`/blog/${post.slug}`}
            className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
            {post.title}
          </Link>
        </h2>
      </header>
      <p className="prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-2">
        {post.overview}
      </p>
    </MotionLi>
  )
}
