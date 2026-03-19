import { Pencil, Briefcase, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { SanityPortfolioItem } from '@/lib/types/sanity'
import { formatDate } from '@/lib/date'
import { Link } from 'react-router-dom'

interface TimelineItemProps extends SanityPortfolioItem {
  index?: number
}

export default function TimelineItem({
  _id,
  _type,
  title,
  slug,
  overview,
  description,
  link,
  firstPublishedDate,
  index = 0,
}: TimelineItemProps) {
  const isPost = _type === 'post'

  return (
    <li
      key={`${_type}-${_id}`}
      className="my-8 ms-6 relative animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}>
      <span
        className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-9 top-0 ring-8 ring-background animate-scale-in"
        style={{ animationDelay: `${index * 0.1 + 0.2}s`, animationFillMode: 'both' }}>
        {isPost ? (
          <Pencil className="w-3 h-3 text-primary-foreground" aria-hidden="true" />
        ) : (
          <Briefcase className="w-3 h-3 text-primary-foreground" aria-hidden="true" />
        )}
      </span>
      {isPost ? (
        <Link
          to={`/blog/${slug}`}
          className="block p-4 bg-card hover:bg-accent rounded-lg transition-colors duration-200 ease-in-out">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <Badge variant={isPost ? 'default' : 'secondary'} className="flex items-center">
              {isPost ? 'Post' : 'Projeto'}
              <ArrowUpRight className="ml-1 h-3 w-3" aria-hidden="true" />
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {formatDate(firstPublishedDate)}
          </p>
          <p className="text-sm text-foreground line-clamp-2">
            {isPost ? overview : description}
          </p>
        </Link>
      ) : (
        <a
          href={link ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 bg-card hover:bg-accent rounded-lg transition-colors duration-200 ease-in-out">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <Badge variant={isPost ? 'default' : 'secondary'} className="flex items-center">
              {isPost ? 'Post' : 'Projeto'}
              <ArrowUpRight className="ml-1 h-3 w-3" aria-hidden="true" />
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {formatDate(firstPublishedDate)}
          </p>
          <p className="text-sm text-foreground line-clamp-2">
            {isPost ? overview : description}
          </p>
        </a>
      )}
    </li>
  )
}
