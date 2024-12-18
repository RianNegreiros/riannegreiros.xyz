import { Pencil, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { TimelineItemProps } from '../lib/interface'
import { MotionLi } from './MotionLi'

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
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
}: TimelineItemProps) {
  const displayDate = firstPublishedDate

  return (
    <MotionLi
      key={`${_type}-${_id}`}
      className="mb-10 ms-6"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.25,
        ease: 'easeInOut',
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
    >
      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
        {_type === 'post' ? (
          <Pencil className="w-2.5 h-2.5 text-blue-800 dark:text-blue-400" />
        ) : (
          <Briefcase className="w-2.5 h-2.5 text-blue-800 dark:text-blue-400" />
        )}
      </span>
      <Link
        href={_type === 'post' ? `/posts/${slug.current}` : link}
        target={_type === 'project' ? '_blank' : ''}
        prefetch
      >
        <h2 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
          <span
            className={`text-xs font-medium ml-2 px-2 py-0.5 rounded ms-3 ${_type === 'post' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'}`}
          >
            {_type === 'post' ? 'Post' : 'Projeto'}
          </span>
          <span
            className={`ml-2 px-2 py-0.5 rounded text-xs font-medium `}
          ></span>
        </h2>
      </Link>
      <time className="block mb-2 text-sm font-normal leading-none text-primary">
        {displayDate
          ? new Date(displayDate).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })
          : 'No date available'}
      </time>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {_type === 'post' ? overview : description}
      </p>
    </MotionLi>
  )
}
