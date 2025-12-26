import { useInView } from 'react-intersection-observer'
import { LoaderCircle } from 'lucide-react'
import { MotionLi } from '@/components/MotionComponents'
import { useEffect } from 'react'

interface LoadMoreProps {
  loading: boolean
  hasMore: boolean
  onLoadMore: () => void
}

export default function LoadMore({
  loading,
  hasMore,
  onLoadMore,
}: LoadMoreProps) {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasMore && !loading) {
      onLoadMore()
    }
  }, [inView, hasMore, loading, onLoadMore])

  return (
    <>
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
