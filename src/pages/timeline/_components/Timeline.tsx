import { useState, useEffect } from 'react'
import { getPortfolioData } from '@/lib/api'
import type { SanityPortfolioItem } from '@/lib/types/sanity'
import LoadMore from './LoadMore'
import TimelineItem from './TimelineItem'
import TimelineSkeleton from './TimelineSkeleton'

export default function Timeline() {
  const [items, setItems] = useState<SanityPortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPortfolioData(0, 10)
        setItems(data)
      } catch (error) {
        console.error('Failed to fetch timeline data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <TimelineSkeleton />

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No items found.</p>
      </div>
    )
  }

  return (
    <ol className="relative border-s-2 border-border ps-6 space-y-8">
      {items.map((item, index) => (
        <TimelineItem key={item._id} {...item} index={index} />
      ))}
      <LoadMore />
    </ol>
  )
}
