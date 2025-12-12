import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { LoaderCircle } from 'lucide-react'
import { getPortfolioData, getTotalPortfolioItems } from '@/lib/api'
import type { PortfolioItem } from '@/lib/types/sanity'
import TimelineItem from './TimelineItem'

let page = 1
const itemsPerPage = 10

export default function LoadMore() {
  const { ref, inView } = useInView()
  const [data, setData] = useState<PortfolioItem[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [totalItems, setTotalItems] = useState<number>(0)

  useEffect(() => {
    getTotalPortfolioItems().then((total) => {
      setTotalItems(total)
    })
  }, [])

  useEffect(() => {
    if (inView && hasMore) {
      getPortfolioData(page, itemsPerPage).then((res) => {
        setData((prevData) => [...prevData, ...res])
        page++

        if (data.length + res.length + itemsPerPage >= totalItems) {
          setHasMore(false)
        }
      })
    }
  }, [inView, hasMore, totalItems, data.length])

  return (
    <>
      {data.map((item, index) => (
        <TimelineItem key={item.id} {...item} index={index} />
      ))}
      {hasMore && (
        <div ref={ref} className="flex items-center justify-center mb-4">
          <LoaderCircle className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600" />
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  )
}
