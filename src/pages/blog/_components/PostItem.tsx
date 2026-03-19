import { formatDate } from '@/lib'
import type { Post } from '@/lib/types'
import { Link } from 'react-router-dom'

interface PostItemProps {
  post: Post
  index: number
}

export default function PostItem({ post, index }: PostItemProps) {
  return (
    <li
      key={post._id}
      className="pb-6 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}>
      <header className="mb-2">
        <time dateTime={post.firstPublishedDate} className="text-sm text-gray-500">
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
    </li>
  )
}
