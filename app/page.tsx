import { getAll } from '@/app/action'
import LoadMore from '@/app/components/LoadMore'

export default async function IndexPage() {
  const data = await getAll()
  return (
    <ol className="relative max-w-4xl mx-auto mt-5 border-s border-gray-200 dark:border-gray-700">
      {data}
      <LoadMore />
    </ol>
  )
}
