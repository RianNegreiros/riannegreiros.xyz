import { useState, useEffect, useCallback, useRef } from 'react'
import { getPortfolioData } from '@/lib/api'
import type { SanityPortfolioItem } from '@/lib/types/sanity'
import LoadMore from './LoadMore'
import TimelineItem from './TimelineItem'
import TimelineSkeleton from './TimelineSkeleton'
import { useFadingState } from '@/hooks/useFadingSate'

const ITEMS_PER_PAGE = 5

export default function Timeline({
  initialItems = [],
}: {
  initialItems?: SanityPortfolioItem[]
}) {
  const [items, setItems] = useState<SanityPortfolioItem[]>(initialItems)
  const [loading, setLoading] = useState(initialItems.length === 0)
  const skeleton = useFadingState(loading && items.length === 0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [page, setPage] = useState<number>(initialItems.length > 0 ? 1 : 0)
  const [error, setError] = useState<string | null>(null)
  const fetchingRef = useRef(false)

  const fetchData = useCallback(async (pageNum: number) => {
    if (fetchingRef.current) return
    fetchingRef.current = true
    setLoading(true)
    try {
      const { items: newItems, hasMore: more } = await getPortfolioData(
        pageNum,
        ITEMS_PER_PAGE,
      )
      setItems((prev) => (pageNum === 0 ? newItems : [...prev, ...newItems]))
      setHasMore(more)
    } catch (error) {
      console.error('Failed to fetch timeline data:', error)
      setError('Não foi possível carregar os itens. Tente novamente.')
    } finally {
      setLoading(false)
      fetchingRef.current = false
    }
  }, [])

  useEffect(() => {
    if (initialItems.length > 0 && page === 1) return
    fetchData(page)
  }, [page, fetchData])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1)
    }
  }, [loading, hasMore])

  if (skeleton.visible)
    return (
      <div className={skeleton.fading ? 'animate-fade-out' : 'animate-fade-in'}>
        <TimelineSkeleton />
      </div>
    )

  if (error)
    return (
      <div className="text-muted-foreground py-8 text-center">
        <p>{error}</p>
        <button
          onClick={() => {
            setError(null)
            fetchData(page)
          }}
          className="mt-4 underline"
        >
          Tentar novamente
        </button>
      </div>
    )

  if (items.length === 0)
    return <div className="py-8 text-center">No items found.</div>

  return (
    <ol className="relative min-h-100 border-s border-gray-200 dark:border-gray-700">
      {items.map((item) => (
        <TimelineItem key={`${item._id}-${item._type}`} {...item} />
      ))}
      <LoadMore loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
    </ol>
  )
}
