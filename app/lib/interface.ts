export interface simplePostCard {
  title: string
  smallDescription: string
  currentSlug: string
  titleImage: string
}

export interface post {
  title: string
  overview: string
  content: string
  _id: string
  slug: {
    current: string
  }
  _createdAt: string
  firstPublishedDate: string
  translations?: {
    [key: string]: {
      title: string
      content: string
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
