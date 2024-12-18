/* eslint-disable @typescript-eslint/no-explicit-any */
export interface simplePostCard {
  title: string
  smallDescription: string
  currentSlug: string
  titleImage: string
}

export interface post {
  title: string
  overview: string
  content: any
  _id: string
  slug: {
    current: string
  }
  _createdAt: string
  firstPublishedDate: string
  translations?: {
    [key: string]: {
      title: string
      content: any
    }
  }
}

export interface ProjectsCard {
  title: string
  _id: string
  imageUrl: string
  tags: string[]
  description: string
  link: string
}

export interface TimelineItemProps {
  _id: string
  _type: 'post' | 'project'
  title: string
  slug: { current: string }
  overview?: string
  description?: string
  link: string
  firstPublishedDate?: string
  index: number
}
