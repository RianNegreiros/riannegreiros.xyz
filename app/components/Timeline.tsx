import LoadMore from './LoadMore'
import { getAll } from '../utils/api'
import TimelineItem from './TimelineItem'
import { TimelineItemProps } from '../lib/interface'

export default async function Timeline() {
  const data = await getAll()
  return (
    <ol className="relative mt-4 border-s border-gray-200 dark:border-gray-700">
      {data.map((item: TimelineItemProps) => (
        <TimelineItem key={item._id} {...item} />
      ))}
      <LoadMore />
    </ol>
  )
}
