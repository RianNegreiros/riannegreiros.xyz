import { fetchSanityData, queries } from "./services";
import type { PortfolioItem } from "./types/sanity";
import type { Post } from "./types/post";

export async function fetchPosts(
  pageNum = 0,
  itemsPerPage = 10,
  searchQuery?: string,
) {
  const start = pageNum * itemsPerPage;
  const end = start + itemsPerPage;
  const queryResult = queries.posts.list(start, end, searchQuery);
  return fetchSanityData<Post[]>(queryResult.query, queryResult.params);
}

export async function getTotalPosts() {
  return fetchSanityData<number>(queries.posts.count);
}

export async function getPortfolioData(pageNum = 0, itemsPerPage = 10) {
  const start = pageNum * itemsPerPage;
  const end = start + itemsPerPage;
  const query = queries.portfolio.timeline(start, end);
  return fetchSanityData<PortfolioItem[]>(query);
}

export async function getTotalPortfolioItems() {
  return fetchSanityData<number>(queries.portfolio.count);
}
