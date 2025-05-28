export const queries = {
  posts: {
    list: (start: number, end: number, searchQuery?: string) => {
      let query = `*[_type == 'post']`
      if (searchQuery) {
        query += `[title match "*${searchQuery}*" || overview match "*${searchQuery}*"]`
      }
      query += ` | order(firstPublishedDate desc) [${start}...${end}] {
        title,
        _id,
        overview,
        slug,
        firstPublishedDate
      }`
      return query
    },
    bySlug: (
      slug: string
    ) => `*[_type == 'post' && slug.current == '${slug}'][0]{
      title,
      firstPublishedDate,
      updatedAt,
      image,
      slug,
      overview,
      tags,
      "blurImage": image.asset->metadata.lqip,
      content[]{
        ...,
        _type == 'image' => {
          ...,
          "blurImage": asset->metadata.lqip
        }
      },
      "headings": content[]{
        _type == "block" && style match "h*" => @
      }
    }`,
    count: `count(*[_type == 'post'])`,
  },
  projects: {
    list: `*[_type == 'project'] | order(_createdAt desc) {
      title,
      _id,
      link,
      description,
      tags,
      "imageUrl": image.asset->url,
      "blurImage": image.asset->metadata.lqip
    }`,
  },
  portfolio: {
    search: (
      searchParam: string
    ) => `*[_type in ['post', 'project'] && (title match '${searchParam}*')]{
      _id,
      _type,
      title,
      slug,
      overview,
      description,
      link,
      firstPublishedDate,
      "index": order
    }`,
    count: `count(*[_type in ['post', 'project']])`,
    timeline: (
      start: number,
      end: number
    ) => `*[_type == "post" || _type == "project"] | order(firstPublishedDate desc) [${start}...${end}] {
      title,
      _id,
      _type,
      link,
      slug,
      overview,
      description,
      firstPublishedDate
    }`,
  },
}
