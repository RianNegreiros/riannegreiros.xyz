import { Pencil, Briefcase, MoveRight } from 'lucide-react'
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
          <Pencil className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />
        ) : (
          <Briefcase className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />
        )}
      </span>
      {_type === 'post' ? (
        <Link href={`/posts/${slug?.current}`} prefetch>
          <h2 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
        </Link>
      ) : (
        <h2 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
      )}
      <time className="block mb-2 text-sm font-normal leading-none text-blue-400 dark:text-blue-500">
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
      {link && (
        <Link
          href={link}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          GitHub Link <MoveRight className="w-4 h-4 ms-2" />
        </Link>
      )}
    </MotionLi>
  )
}
