/* eslint-disable @typescript-eslint/no-explicit-any */

export type SanityHeading = {
  text: string
  level: string
}

export type SanityPost = {
  id: string
  title: string
  overview: string
  slug: string
  firstPublishedDate: string
  updatedAt?: string
  image?: any
  content?: any[]
  headings: SanityHeading[]
}

export type SanityProject = {
  id: string
  title: string
  link: string
  description: string
  tags: string[]
  imageUrl: string
  createdAt: string
}

export type SanityPortfolioItem = {
  id: string
  _type: 'post' | 'project'
  title: string
  slug: string
  overview?: string
  description?: string
  link?: string
  firstPublishedDate: string
  createdAt: string
}
