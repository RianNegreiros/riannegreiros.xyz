'use server'

import { client } from './lib/sanity'
import { PortfolioItem } from './lib/interface'
import TimelineItem from './components/TimelineItem'

export async function getTotalPosts() {
  return client.fetch(`count(*[_type == 'post'])`)
}

export async function getTotal() {
  return client.fetch(`count(*[_type in ['post', 'project']])`)
}

export async function getAll(pageNum: number = 0, itemsPerPage: number = 10) {
  const start = pageNum * itemsPerPage
  const end = start + itemsPerPage
  const query = `*[_type == "post" || _type == "project"] | order(firstPublishedDate desc) [${start}...${end}] {
    title,
    _id,
    _type,
    link,
    slug,
    overview,
    description,
    firstPublishedDate
  }`

  const data: PortfolioItem[] = await client.fetch(query)

  return data.map((item, index) => (
    <TimelineItem key={item._id} {...item} index={index} />
  ))
}
