export interface ProjectsCard {
  title: string
  _id: string
  imageUrl: string
  blurImage: string
  tags: string[]
  description: string
  link: string
}

export interface PortfolioItem {
  _id: string
  _type: 'post' | 'project'
  title: string
  slug: { current: string }
  overview?: string
  description?: string
  link: string
  firstPublishedDate: string
  index: number
}
