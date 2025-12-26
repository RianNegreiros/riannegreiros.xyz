import { useState, useEffect, useCallback } from 'react'
import { getPortfolioData } from '@/lib/api'
import type { SanityPortfolioItem } from '@/lib/types/sanity'
import LoadMore from './LoadMore'
import TimelineItem from './TimelineItem'
import TimelineSkeleton from './TimelineSkeleton'

const ITEMS_PER_PAGE = 5

export default function Timeline() {
  const [items, setItems] = useState<SanityPortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [page, setPage] = useState<number>(0)

  const fetchData = useCallback(async (pageNum: number) => {
    try {
      const newItems = await getPortfolioData(pageNum, ITEMS_PER_PAGE)
      setItems((prev) => (pageNum === 0 ? newItems : [...prev, ...newItems]))
      setHasMore(newItems.length === ITEMS_PER_PAGE)
    } catch (error) {
      console.error('Failed to fetch timeline data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData(page)
  }, [page, fetchData])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1)
    }
  }, [loading, hasMore])

  if (loading && page === 0) return <TimelineSkeleton />
  if (items.length === 0)
    return <div className="text-center py-8">No items found.</div>

  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700 min-h-100">
      {items.map((item) => (
        <TimelineItem key={`${item._id}-${item._type}`} {...item} />
      ))}
      <LoadMore loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
    </ol>
  )
}
