import { useEffect, useState, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { LoaderCircle } from 'lucide-react'
import { getPortfolioData, getTotalPortfolioItems } from '@/lib/api'
import type { SanityPortfolioItem } from '@/lib/types/sanity'
import TimelineItem from './TimelineItem'
import { MotionLi } from '@/components/MotionComponents'

const ITEMS_PER_PAGE = 10

export default function LoadMore() {
  const { ref, inView } = useInView()
  const [data, setData] = useState<SanityPortfolioItem[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)

  const loadMore = useCallback(async () => {
    if (loading) return

    setLoading(true)
    try {
      const [newItems, totalItems] = await Promise.all([
        getPortfolioData(page, ITEMS_PER_PAGE),
        page === 0 ? getTotalPortfolioItems() : Promise.resolve(0),
      ])

      setData((prev) => (page === 0 ? newItems : [...prev, ...newItems]))
      setPage((prev) => prev + 1)

      if (page === 0) {
        setHasMore(
          newItems.length === ITEMS_PER_PAGE && newItems.length < totalItems,
        )
      } else {
        setHasMore(newItems.length === ITEMS_PER_PAGE)
      }
    } finally {
      setLoading(false)
    }
  }, [page, loading])

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore()
    }
  }, [inView, hasMore, loading, loadMore])

  return (
    <>
      {data.map((item, index) => (
        <TimelineItem key={item._id} {...item} index={index} />
      ))}
      {hasMore && (
        <MotionLi className="flex items-center justify-center mb-4 list-none">
          <div ref={ref} className="flex items-center justify-center p-4">
            <LoaderCircle className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600" />
            <span className="sr-only">Loading...</span>
          </div>
        </MotionLi>
      )}
    </>
  )
}
