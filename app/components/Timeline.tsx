import { getAll } from '../action'
import LoadMore from './LoadMore'

export default async function Timeline() {
  const data = await getAll()
  return (
    <ol className="relative mt-4 border-s border-gray-200 dark:border-gray-700">
      {data}
      <LoadMore />
    </ol>
  )
}
