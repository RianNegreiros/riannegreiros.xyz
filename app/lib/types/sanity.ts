export type Heading = {
  _type: 'block'
  _key: string
  style: string
  children: Array<{
    text: string
  }>
}

export type Post = {
  title: string
  _id: string
  overview: string
  slug: { current: string }
  firstPublishedDate: string
  updatedAt?: string
  image?: any
  tags?: string[]
  content?: any[]
  headings: Heading[]
  blurImage?: string
}

export type Project = {
  title: string
  _id: string
  link: string
  description: string
  tags: string[]
  imageUrl: string
  blurImage: string
}

export type PortfolioItem = {
  _id: string
  _type: 'post' | 'project'
  title: string
  slug: { current: string }
  overview?: string
  description?: string
  link?: string
  firstPublishedDate: string
  index?: number
}
