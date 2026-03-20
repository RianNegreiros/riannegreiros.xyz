import { formatDate } from '@/lib'
import type { Post } from '@/lib/types'

interface PostItemProps {
  post: Post
  index: number
}

export default function PostItem({ post, index }: PostItemProps) {
  return (
    <li
      key={post._id}
      className="animate-slide-up pb-6"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
    >
      <header className="mb-2">
        <time
          dateTime={post.firstPublishedDate}
          className="text-sm text-gray-500"
        >
          {formatDate(post.firstPublishedDate)}
        </time>
        <h2 className="mt-1 text-xl font-semibold">
          <a
            href={`/blog/${post.slug}`}
            className="text-2xl leading-8 font-bold tracking-tight text-gray-900 dark:text-gray-100"
          >
            {post.title}
          </a>
        </h2>
      </header>
      <p className="prose line-clamp-2 max-w-none text-gray-500 dark:text-gray-400">
        {post.overview}
      </p>
    </li>
  )
}
