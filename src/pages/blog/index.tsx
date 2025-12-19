import { useSEO } from '@/hooks/useSEO'
import PostsListClient from './_components/PostsListClient'
import SearchInput from './_components/SearchInput'
import BlogSkeleton from './_components/BlogSkeleton'
import { useBlogPosts } from './_hooks/useBlogPosts'

export default function PostsPage() {
  const { posts, loading, searching, searchQuery, currentPage, totalPages, handlePageChange } = useBlogPosts()

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

  if (loading) {
    return <BlogSkeleton />
  }

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <SearchInput />
      {searching ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
      ) : (
        <PostsListClient
          data={posts}
          searchQuery={searchQuery}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
