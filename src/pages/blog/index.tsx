import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import PostsListClient from "./_components/PostsListClient";
import SearchInput from "./_components/SearchInput";
import BlogSkeleton from "./_components/BlogSkeleton";
import { client } from "@/lib/services/sanity";
import type { Post } from "@/lib/types";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // SEO for blog page
  useSEO({
    title: searchQuery
      ? `Search: ${searchQuery} | Blog | Rian Negreiros`
      : "Blog | Rian Negreiros",
    description: searchQuery
      ? `Search results for "${searchQuery}" in Rian Negreiros' blog`
      : "Artigos técnicos e insights sobre engenharia de software, desenvolvimento web e tecnologia.",
    url: `${window.location.origin}/blog${searchQuery ? `?search=${searchQuery}` : ""}`,
  });

  useEffect(() => {
    async function fetchPosts() {
      try {
        let query = `*[_type == "post"`;

        if (searchQuery) {
          query += ` && (title match "*${searchQuery}*" || overview match "*${searchQuery}*")`;
        }

        query += `] | order(firstPublishedDate desc) {
          _id,
          title,
          "slug": slug.current,
          overview,
          firstPublishedDate,
          updatedAt
        }`;

        const data = await client.fetch<Post[]>(query);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [searchQuery]);

  if (loading) {
    return <BlogSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <SearchInput />
      <PostsListClient data={posts} searchQuery={searchQuery} />
    </div>
  );
}
