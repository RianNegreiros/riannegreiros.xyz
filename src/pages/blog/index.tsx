import { useSEO } from '@/hooks/useSEO'
import PostsListClient from './_components/PostsListClient'
import SearchInput from './_components/SearchInput'
import BlogSkeleton from './_components/BlogSkeleton'
import { useBlogPosts } from './_hooks/useBlogPosts'

export default function PostsPage() {
  const {
    posts,
    loading,
    searching,
    searchQuery,
    currentPage,
    totalPages,
    handlePageChange,
  } = useBlogPosts()

  useSEO({
    title: searchQuery
      ? `Search: ${searchQuery} | Blog | Rian Negreiros`
      : 'Blog | Rian Negreiros',
    description: searchQuery
      ? `Search results for "${searchQuery}" in Rian Negreiros' blog`
      : 'Artigos técnicos e insights sobre engenharia de software, desenvolvimento web e tecnologia.',
    url: `${import.meta.env.VITE_BASE_URL}/blog${searchQuery ? `?search=${searchQuery}` : ''}`,
  })

  if (loading) {
    return <BlogSkeleton />
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <SearchInput />

      {searching ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
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
