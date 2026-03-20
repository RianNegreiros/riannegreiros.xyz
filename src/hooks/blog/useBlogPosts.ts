import { useEffect, useRef, useState, useCallback } from 'react'
import { client } from '@/lib/services/sanity'
import type { Post } from '@/lib/types'

const POSTS_PER_PAGE = 6

function getParamsFromURL() {
  if (typeof window === 'undefined') return { searchQuery: '', currentPage: 1 }
  const params = new URLSearchParams(window.location.search)
  return {
    searchQuery: params.get('search') ?? '',
    currentPage: Number(params.get('page')) || 1,
  }
}

export function useBlogPosts() {
  const [{ searchQuery, currentPage }, setURLState] = useState(getParamsFromURL)
  const [posts, setPosts] = useState<Post[]>([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const initialLoad = useRef(true)
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  useEffect(() => {
    const handler = () => setURLState(getParamsFromURL())
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  useEffect(() => {
    async function fetchPosts() {
      if (!initialLoad.current) setSearching(true)

      try {
        let baseQuery = `*[_type == "post"`
        if (searchQuery) {
          baseQuery += ` && (title match "*${searchQuery}*" || overview match "*${searchQuery}*")`
        }
        baseQuery += `]`

        const start = (currentPage - 1) * POSTS_PER_PAGE
        const end = currentPage * POSTS_PER_PAGE

        const [total, data] = await Promise.all([
          client.fetch<number>(`count(${baseQuery})`),
          client.fetch<Post[]>(
            `${baseQuery} | order(firstPublishedDate desc) [${start}...${end}] {
              _id, title, "slug": slug.current, overview, firstPublishedDate, updatedAt
            }`,
          ),
        ])

        setTotalPosts(total)
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
        setSearching(false)
        initialLoad.current = false
      }
    }

    fetchPosts()
  }, [searchQuery, currentPage])

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(window.location.search)
      if (page === 1) {
        params.delete('page')
      } else {
        params.set('page', page.toString())
      }
      if (searchQuery) {
        params.set('search', searchQuery)
      }
      const queryString = params.toString()
      window.history.pushState(
        {},
        '',
        `${window.location.pathname}${queryString ? `?${queryString}` : ''}`,
      )
      window.dispatchEvent(new PopStateEvent('popstate'))
    },
    [searchQuery],
  )

  return {
    posts,
    loading,
    searching,
    searchQuery,
    currentPage,
    totalPages,
    handlePageChange,
  }
}
