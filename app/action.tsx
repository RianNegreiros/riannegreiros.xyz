'use server'

import { fetchSanityData } from './lib/services/sanity'
import { queries } from './lib/services/sanity.queries'
import { PortfolioItem } from './lib/types/sanity'
import TimelineItem from './components/TimelineItem'

export async function getTotalPosts() {
  return fetchSanityData<number>(queries.posts.count)
}

export async function getTotal() {
  return fetchSanityData<number>(queries.portfolio.count)
}

export async function getAll(pageNum: number = 0, itemsPerPage: number = 10) {
  const start = pageNum * itemsPerPage
  const end = start + itemsPerPage
  const query = queries.portfolio.timeline(start, end)
  const data = await fetchSanityData<PortfolioItem[]>(query)

  return data.map((item, index) => (
    <TimelineItem key={item._id} {...item} index={index} />
  ))
}
