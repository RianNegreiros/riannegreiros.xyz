'use client'

import { Pencil, Briefcase, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PortfolioItem } from '../lib/interface'
import { formatDate } from '../lib/helpers'

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
    <motion.li
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
        className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-9 top-4 ring-8 ring-background"
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
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {formatDate(firstPublishedDate)}
              </CardDescription>
            </div>
            <Badge variant={isPost ? 'default' : 'secondary'}>
              {isPost ? 'Post' : 'Projeto'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-base text-card-foreground">
            {isPost ? overview : description}
          </p>
          <Button asChild variant="outline">
            <Link
              href={isPost ? `/posts/${slug.current}` : link}
              target={isPost ? '' : '_blank'}
              rel={isPost ? '' : 'noopener noreferrer'}
              className="inline-flex items-center"
            >
              {isPost ? 'Ler Mais' : 'Ver Projeto'}
              <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.li>
  )
}
