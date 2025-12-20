import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { client } from '@/lib/services/sanity'
import type { Post } from '@/lib/types'

const POSTS_PER_PAGE = 6

export function useBlogPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const searchQuery = searchParams.get('search') || ''
  const currentPage = Number(searchParams.get('page')) || 1
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  useEffect(() => {
    async function fetchPosts() {
      const isInitialLoad = loading

      if (!isInitialLoad) {
        setSearching(true)
      }

      try {
        let baseQuery = `*[_type == "post"`

        if (searchQuery) {
          baseQuery += ` && (title match "*${searchQuery}*" || overview match "*${searchQuery}*")`
        }

        baseQuery += `]`

        // Get total count and paginated posts in parallel
        const [total, data] = await Promise.all([
          client.fetch<number>(`count(${baseQuery})`),
          client.fetch<
            Post[]
          >(`${baseQuery} | order(firstPublishedDate desc) [${(currentPage - 1) * POSTS_PER_PAGE}...${currentPage * POSTS_PER_PAGE}] {
            _id,
            title,
            "slug": slug.current,
            overview,
            firstPublishedDate,
            updatedAt
          }`),
        ])

        setTotalPosts(total)
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
        setSearching(false)
      }
    }

    fetchPosts()
  }, [searchQuery, currentPage])

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams)
    if (page === 1) {
      newParams.delete('page')
    } else {
      newParams.set('page', page.toString())
    }

    if (searchQuery) {
      newParams.set('search', searchQuery)
    }

    setSearchParams(newParams)
  }

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
