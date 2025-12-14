/* eslint-disable @typescript-eslint/no-explicit-any */

export type Heading = {
  text: string;
  level: string;
};

export type Post = {
  id: string;
  title: string;
  overview: string;
  slug: string;
  firstPublishedDate: string;
  updatedAt?: string;
  image?: any;
  content?: any[];
  headings: Heading[];
  blurImage?: string;
};

export type Project = {
  id: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
  imageUrl: string;
  blurImage: string;
  createdAt: string;
};

export type PortfolioItem = {
  id: string;
  _type: "post" | "project";
  title: string;
  slug: string;
  overview?: string;
  description?: string;
  link?: string;
  firstPublishedDate: string;
  createdAt: string;
};
