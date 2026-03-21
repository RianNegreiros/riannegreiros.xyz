import { fetchSanityData, queries } from './services'
import type {
  SanityPortfolioItem,
  SanityPost,
  SanityProject,
} from './types/sanity'

export async function fetchPosts(
  pageNum = 0,
  itemsPerPage = 10,
  searchQuery?: string,
) {
  const start = pageNum * itemsPerPage
  const end = start + itemsPerPage
  const queryResult = queries.posts.list(start, end, searchQuery)
  return fetchSanityData<SanityPost[]>(queryResult.query, queryResult.params)
}

export async function getTotalPosts() {
  return fetchSanityData<number>(queries.posts.count)
}

export async function getPortfolioData(pageNum = 0, itemsPerPage = 10) {
  const start = pageNum * itemsPerPage
  const { query, params } = queries.portfolio.timeline(start, itemsPerPage + 1)
  const items = await fetchSanityData<SanityPortfolioItem[]>(query, params)
  return {
    items: items.slice(0, itemsPerPage),
    hasMore: items.length > itemsPerPage,
  }
}

export async function getTotalPortfolioItems() {
  return fetchSanityData<number>(queries.portfolio.count)
}

export async function fetchProjects() {
  return fetchSanityData<SanityProject[]>(queries.projects.list)
}
