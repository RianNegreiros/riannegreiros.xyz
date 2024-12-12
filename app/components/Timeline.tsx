import { Pencil, Briefcase, MoveRight } from 'lucide-react'
import { client } from '../lib/sanity'
import Link from 'next/link'

async function fetchPostsAndProjects() {
  const query = `{
    'projects': *[_type == 'project'] {
      title,
      _id,
      _type,
      link,
      description,
      publishedDate
    },
    'posts': *[_type == 'post'] {
      title,
      _id,
      _type,
      slug,
      overview,
      firstPublishedDate
    }
  }`

  const data = await client.fetch(query, {}, { next: { revalidate: 60 } })
  return data
}

export default async function Timeline() {
  const { posts, projects } = await fetchPostsAndProjects()
  const combinedItems = [...posts, ...projects].sort(
    (a, b) =>
      new Date(b.firstPublishedDate || b.publishedDate).getTime() -
      new Date(a.firstPublishedDate || a.publishedDate).getTime()
  )

  return (
    <ol className="relative mt-4 border-s border-gray-200 dark:border-gray-700">
      {combinedItems.map(
        ({
          _id,
          _type,
          title,
          slug,
          overview,
          description,
          link,
          firstPublishedDate,
          publishedDate,
        }) => (
          <li key={_id} className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              {_type === 'post' ? (
                <Pencil className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />
              ) : (
                <Briefcase className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />
              )}
            </span>
            {_type === 'post' ? (
              <Link href={`/posts/${slug.current}`} prefetch>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
              </Link>
            ) : (
              <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {new Date(firstPublishedDate || publishedDate).toLocaleDateString(
                'pt-BR',
                {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }
              )}
            </time>
            <p className="mb-4 prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-2">
              {_type === 'post' ? overview : description}
            </p>
            {link && (
              <Link
                href={link}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                GitHub Link{' '}
                <MoveRight className="w-4 h-4 ms-2 rtl:rotate-180" />
              </Link>
            )}
          </li>
        )
      )}
    </ol>
  )
}
