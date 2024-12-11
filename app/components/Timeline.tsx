import { Pencil, Briefcase } from 'lucide-react'
import { client } from '../lib/sanity'
import Link from 'next/link'

async function fetchPostsAndProjects() {
  const query = `{
  "projects": *[_type == 'project'] | order(_createdAt desc) {
        title,
          _id,
          link,
          description,
          _createdAt
    },
    "posts": *[_type == "post"] | order(firstPublishedDate desc)
    }`

  const data = await client.fetch(query)

  return data
}

export default async function Timeline() {
  const { posts, projects } = await fetchPostsAndProjects()
  const combinedItems = [...posts, ...projects].sort(
    (a, b) =>
      new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
  )

  return (
    <ol className="relative mt-4 border-s border-gray-200 dark:border-gray-700">
      {combinedItems.map((item) => (
        <li key={item._id} className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            {item.overview ? (
              <Pencil className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />
            ) : (
              <Briefcase className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" />
            )}
          </span>
          {item.overview ? (
            <Link href={`/posts/${item.slug.current}`} prefetch>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}{' '}
                <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                  Post
                </span>
              </h3>
            </Link>
          ) : (
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              {item.title}{' '}
              <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                Projeto
              </span>
            </h3>
          )}
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {new Date(item._createdAt).toLocaleDateString()}
          </time>
          <p className="mb-4 text-base font-normal text-dracula-aro-800 dark:text-dracula-aro-400">
            {item.description ? item.description : item.overview}
          </p>
          {item.link && (
            <a
              href={item.link}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              GitHub
            </a>
          )}
        </li>
      ))}
    </ol>
  )
}
