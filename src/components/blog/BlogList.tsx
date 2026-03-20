import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchPosts, getTotalPosts } from '@/lib/api'
import type { Post } from '@/lib/types'
import PostsListClient from './PostsListClient'
import SearchInput from './SearchInput'
import BlogSkeleton from './BlogSkeleton'

const ITEMS_PER_PAGE = 10

function getUrlParams() {
  if (typeof window === 'undefined') return { search: '', page: 0 }
  const params = new URLSearchParams(window.location.search)
  return {
    search: params.get('search') ?? '',
    page: Math.max(0, Number(params.get('page') ?? 1) - 1),
  }
}

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [urlState, setUrlState] = useState(getUrlParams)
  const fetchingRef = useRef(false)

  const fetchData = useCallback(
    async (pageNum: number, searchQuery: string) => {
      if (fetchingRef.current) return
      fetchingRef.current = true
      setLoading(true)
      try {
        const [data, total] = await Promise.all([
          fetchPosts(pageNum, ITEMS_PER_PAGE, searchQuery) as Promise<Post[]>,
          getTotalPosts(),
        ])
        setPosts(data)
        setTotalPages(Math.ceil(total / ITEMS_PER_PAGE))
      } catch (e) {
        console.error('Failed to fetch posts:', e)
      } finally {
        setLoading(false)
        fetchingRef.current = false
      }
    },
    [],
  )

  useEffect(() => {
    fetchData(urlState.page, urlState.search)
  }, [urlState, fetchData])

  useEffect(() => {
    const onPopState = () => setUrlState(getUrlParams())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', String(newPage + 1))
    window.history.pushState({}, '', `${window.location.pathname}?${params}`)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  if (loading) return <BlogSkeleton />

  return (
    <>
      <SearchInput />
      <PostsListClient
        data={posts}
        searchQuery={urlState.search}
        currentPage={urlState.page + 1}
        totalPages={totalPages}
        onPageChange={(page) => handlePageChange(page - 1)}
      />
    </>
  )
}
