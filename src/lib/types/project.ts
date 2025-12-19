export interface ProjectsCard {
  title: string
  _id: string
  imageUrl: string
  tags: string[]
  description: string
  link: string
  createdAt: string
}

export interface PortfolioItem {
  id: string
  _type: 'post' | 'project'
  title: string
  slug: string
  overview?: string
  description?: string
  link: string
  firstPublishedDate: string
  createdAt: string
}
