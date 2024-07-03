export interface simplePostCard {
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: any;
}

export interface post {
  title: string;
  overview: string;
  content: any;
  _id: string;
  slug: {
    current: string;
  };
  _createdAt: string;
  firstPublishedDate: string;
}

export interface ProjectsCard {
  title: string;
  _id: string;
  imageUrl: string;
  tags: string[];
  description: string;
  link: string;
}