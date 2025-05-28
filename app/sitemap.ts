import { MetadataRoute } from 'next'
import { client } from './lib/services/sanity'

interface Post {
  slug: string
  firstPublishedDate: string
  updatedAt: string
}

interface Project {
  slug: string
  updatedAt: string
}

async function getPosts() {
  const query = `*[_type == "post"] | order(firstPublishedDate desc) {
    "slug": slug.current,
    firstPublishedDate,
    "updatedAt": _updatedAt
  }`
  return await client.fetch<Post[]>(query)
}

async function getProjects() {
  const query = `*[_type == "project"] | order(_createdAt desc) {
    "slug": slug.current,
    "updatedAt": _updatedAt
  }`
  return await client.fetch<Project[]>(query)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
  const posts = await getPosts()
  const projects = await getProjects()

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  const postRoutes = posts.map((post: Post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.firstPublishedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const projectRoutes = projects.map((project: Project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...postRoutes, ...projectRoutes]
}
