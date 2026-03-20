import { useInView } from 'react-intersection-observer'
import { LoaderCircle } from 'lucide-react'
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
        <li className="mb-4 flex list-none items-center justify-center">
          <div ref={ref} className="flex items-center justify-center p-4">
            <LoaderCircle className="h-8 w-8 animate-spin text-gray-200 dark:text-gray-600" />
            <span className="sr-only">Loading...</span>
          </div>
        </li>
      )}
    </>
  )
}
