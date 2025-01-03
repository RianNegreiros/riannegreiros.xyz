/* eslint-disable @typescript-eslint/no-explicit-any */
export interface simplePostCard {
  title: string
  smallDescription: string
  currentSlug: string
  titleImage: string
}

interface Span {
  _type: string
  marks: string[]
  text: string
  _key: string
}

export interface Heading {
  _type: string
  style: string
  _key: string
  markDefs: any[]
  children: Span[]
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
  headings: Heading[]
  translations?: {
    [key: string]: {
      title: string
      content: any
      headings: Heading[]
    }
  }
}

export interface ProjectsCard {
  title: string
  _id: string
  imageUrl: string
  blurImage: string
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
