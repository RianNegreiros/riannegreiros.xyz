import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PostsListClient from './_components/PostsListClient'
import SearchInput from './_components/SearchInput'
import { client } from '@/lib/services/sanity'
import type { Post } from '@/lib/types'

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  useEffect(() => {
    async function fetchPosts() {
      try {
        let query = `*[_type == "post"`
        
        if (searchQuery) {
          query += ` && (title match "*${searchQuery}*" || overview match "*${searchQuery}*")`
        }
        
        query += `] | order(firstPublishedDate desc) {
          _id,
          title,
          "slug": slug.current,
          overview,
          firstPublishedDate,
          _updatedAt
        }`
        
        const data = await client.fetch<Post[]>(query)
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [searchQuery])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-5">
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground">Carregando posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <SearchInput />
      <PostsListClient data={posts} searchQuery={searchQuery} />
    </div>
  )
}
