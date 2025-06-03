import { getAll } from '../action'
import LoadMore from './LoadMore'

export default async function Timeline() {
  const items = await getAll()

  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {items}
      <LoadMore />
    </ol>
  )
}
