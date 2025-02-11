'use client'

import { Pencil, Briefcase, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { PortfolioItem } from '../lib/interface'
import { formatDate } from '../lib/helpers'
import { MotionLi } from './MotionComponents'

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
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
  index,
}: PortfolioItem) {
  const isPost = _type === 'post'

  return (
    <MotionLi
      key={`${_type}-${_id}`}
      className="mb-8 ms-6 relative"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.1,
        ease: 'easeInOut',
        duration: 0.5,
      }}
      viewport={{ amount: 0.2 }}
    >
      <motion.span
        className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-9 top-0 ring-8 ring-background"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
      >
        {isPost ? (
          <Pencil
            className="w-3 h-3 text-primary-foreground"
            aria-hidden="true"
          />
        ) : (
          <Briefcase
            className="w-3 h-3 text-primary-foreground"
            aria-hidden="true"
          />
        )}
      </motion.span>
      <Link
        href={isPost ? `/posts/${slug.current}` : link}
        target={isPost ? '' : '_blank'}
        rel={isPost ? '' : 'noopener noreferrer'}
        className="block p-4 bg-card hover:bg-accent rounded-lg transition-colors duration-200 ease-in-out"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <Badge
            variant={isPost ? 'default' : 'secondary'}
            className="flex items-center"
          >
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
    </MotionLi>
  )
}
