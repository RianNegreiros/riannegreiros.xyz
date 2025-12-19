import { MotionLi, MotionUl } from '@/components/MotionComponents'
import { formatDate } from '@/lib'
import type { Post } from '@/lib/types'
import { Link } from 'react-router-dom'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination'

interface PostsListClientProps {
  data: Post[]
  searchQuery?: string
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function PostsListClient({
  data,
  searchQuery,
  currentPage,
  totalPages,
  onPageChange,
}: PostsListClientProps) {
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

  const renderPaginationItems = () => {
    const items = []
    const showEllipsis = totalPages > 7

    if (showEllipsis) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => onPageChange(1)}
            isActive={currentPage === 1}
            className="cursor-pointer">
            1
          </PaginationLink>
        </PaginationItem>,
      )

      if (currentPage > 4) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>,
        )
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer">
              {i}
            </PaginationLink>
          </PaginationItem>,
        )
      }

      if (currentPage < totalPages - 3) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        )
      }

      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={() => onPageChange(totalPages)}
              isActive={currentPage === totalPages}
              className="cursor-pointer">
              {totalPages}
            </PaginationLink>
          </PaginationItem>,
        )
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer">
              {i}
            </PaginationLink>
          </PaginationItem>,
        )
      }
    }

    return items
  }

  return (
    <div className="space-y-8">
      <MotionUl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4">
        {data.map((post: Post, index: number) => (
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
        ))}
      </MotionUl>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={`cursor-pointer ${
                  currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                }`}
              />
            </PaginationItem>

            {renderPaginationItems()}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
                className={`cursor-pointer ${
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
