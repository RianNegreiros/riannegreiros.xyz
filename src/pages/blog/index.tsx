import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSEO } from '@/hooks/useSEO'
import PostsListClient from './_components/PostsListClient'
import SearchInput from './_components/SearchInput'
import BlogSkeleton from './_components/BlogSkeleton'
import { client } from '@/lib/services/sanity'
import type { Post } from '@/lib/types'

const POSTS_PER_PAGE = 6

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const currentPage = Number(searchParams.get('page')) || 1

  // SEO for blog page
  useSEO({
    title: searchQuery
      ? `Search: ${searchQuery} | Blog | Rian Negreiros`
      : 'Blog | Rian Negreiros',
    description: searchQuery
      ? `Search results for "${searchQuery}" in Rian Negreiros' blog`
      : 'Artigos técnicos e insights sobre engenharia de software, desenvolvimento web e tecnologia.',
    url: `${window.location.origin}/blog${searchQuery ? `?search=${searchQuery}` : ''}`,
  })

  useEffect(() => {
    async function fetchPosts() {
      try {
        let baseQuery = `*[_type == "post"`

        if (searchQuery) {
          baseQuery += ` && (title match "*${searchQuery}*" || overview match "*${searchQuery}*")`
        }

        baseQuery += `]`

        // Get total count
        const countQuery = `count(${baseQuery})`
        const total = await client.fetch<number>(countQuery)
        setTotalPosts(total)

        // Get paginated posts
        const offset = (currentPage - 1) * POSTS_PER_PAGE
        const postsQuery = `${baseQuery} | order(firstPublishedDate desc) [${offset}...${offset + POSTS_PER_PAGE}] {
          _id,
          title,
          "slug": slug.current,
          overview,
          firstPublishedDate,
          updatedAt
        }`

        const data = await client.fetch<Post[]>(postsQuery)
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [searchQuery, currentPage])

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams)
    if (page === 1) {
      newParams.delete('page')
    } else {
      newParams.set('page', page.toString())
    }
    setSearchParams(newParams)
  }

  if (loading) {
    return <BlogSkeleton />
  }

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <SearchInput />
      <PostsListClient
        data={posts}
        searchQuery={searchQuery}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
