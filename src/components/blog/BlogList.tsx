import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchPosts, getTotalPosts } from '@/lib/api'
import type { SanityPost } from '@/lib/types'
import PostItem from './PostItem'
import BlogPagination from './BlogPagination'
import SearchInput from './SearchInput'

const ITEMS_PER_PAGE = 10

function getUrlParams() {
  if (typeof window === 'undefined') return { search: '', page: 0 }
  const params = new URLSearchParams(window.location.search)
  return {
    search: params.get('search') ?? '',
    page: Math.max(0, Number(params.get('page') ?? 1) - 1),
  }
}

interface BlogListProps {
  initialPosts?: SanityPost[]
  initialTotal?: number
}

export default function BlogList({
  initialPosts = [],
  initialTotal = 0,
}: BlogListProps) {
  const [posts, setPosts] = useState<SanityPost[]>(initialPosts)
  const [totalPages, setTotalPages] = useState(
    Math.ceil(initialTotal / ITEMS_PER_PAGE) || 1,
  )
  const [loading, setLoading] = useState(initialPosts.length === 0)
  const [urlState, setUrlState] = useState(getUrlParams)
  const fetchingRef = useRef(false)
  const isInitialRender = useRef(true)

  const fetchData = useCallback(
    async (pageNum: number, searchQuery: string) => {
      if (fetchingRef.current) return
      fetchingRef.current = true
      setLoading(true)
      try {
        const [data, total] = await Promise.all([
          fetchPosts(pageNum, ITEMS_PER_PAGE, searchQuery) as Promise<
            SanityPost[]
          >,
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
    if (isInitialRender.current) {
      isInitialRender.current = false
      if (initialPosts.length > 0 && urlState.page === 0 && !urlState.search)
        return
    }
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <SearchInput />

      {loading ? (
        <div className="text-muted-foreground py-8 text-center">
          Carregando...
        </div>
      ) : !posts.length ? (
        <div className="py-8 text-center">
          <p className="text-muted-foreground text-lg">
            {urlState.search
              ? 'Nenhum post encontrado para sua busca.'
              : 'Nenhum post encontrado.'}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <ul className="animate-fade-in space-y-4">
            {posts.map((post, index) => (
              <PostItem key={post._id} post={post} index={index} />
            ))}
          </ul>
          {!urlState.search && (
            <BlogPagination
              currentPage={urlState.page + 1}
              totalPages={totalPages}
              onPageChange={(page) => handlePageChange(page - 1)}
            />
          )}
        </div>
      )}
    </>
  )
}
