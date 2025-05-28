'use client'

import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { getAll, getTotal } from '../action'
import { LoaderCircle } from 'lucide-react'

export type TimelineItem = React.JSX.Element

let page = 1
const itemsPerPage = 10

export default function LoadMore() {
  const { ref, inView } = useInView()
  const [data, setData] = useState<TimelineItem[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [totalItems, setTotalItems] = useState<number>(0)

  useEffect(() => {
    getTotal().then((total) => {
      setTotalItems(total)
    })
  }, [])

  useEffect(() => {
    if (inView && hasMore) {
      getAll(page, itemsPerPage).then((res) => {
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
      {data}
      {hasMore && (
        <div ref={ref} className="flex items-center justify-center mb-4">
          <LoaderCircle className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600" />
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  )
}
