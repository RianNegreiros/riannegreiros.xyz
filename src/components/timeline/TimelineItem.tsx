import { Pencil, Briefcase, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { SanityPortfolioItem } from '@/lib/types/sanity'
import { formatDate } from '@/lib/date'

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
  displayDate,
  index = 0,
}: TimelineItemProps) {
  const isPost = _type === 'post'
  const href = isPost ? `/blog/${slug}` : (link ?? '#')
  const linkProps = isPost ? {} : { target: '_blank', rel: 'noopener noreferrer' }

  return (
    <li
      className="animate-slide-up relative my-8 ms-6"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
    >
      <span
        className="bg-primary ring-background animate-scale-in absolute top-0 -left-9 flex h-6 w-6 items-center justify-center rounded-full ring-8"
        style={{ animationDelay: `${index * 0.1 + 0.2}s`, animationFillMode: 'both' }}
      >
        {isPost ? (
          <Pencil className="text-primary-foreground h-3 w-3" aria-hidden="true" />
        ) : (
          <Briefcase className="text-primary-foreground h-3 w-3" aria-hidden="true" />
        )}
      </span>

      <a
        href={href}
        {...linkProps}
        className="bg-card hover:bg-accent block rounded-lg p-4 transition-colors duration-200 ease-in-out"
      >
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-foreground text-lg font-semibold">{title}</h2>
          <Badge variant={isPost ? 'default' : 'secondary'} className="flex items-center">
            {isPost ? 'Post' : 'Projeto'}
            <ArrowUpRight className="ml-1 h-3 w-3" aria-hidden="true" />
          </Badge>
        </div>
        <p className="text-muted-foreground mb-2 text-sm">{formatDate(displayDate)}</p>
        <p className="text-foreground line-clamp-2 text-sm">{isPost ? overview : description}</p>
      </a>
    </li>
  )
}
