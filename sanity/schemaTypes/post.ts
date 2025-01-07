export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'overview',
      type: 'string',
      title: 'Overview',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'firstPublishedDate',
      type: 'datetime',
      title: 'First Published Date',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative Text',
            },
          ],
        },
        {
          type: 'code',
          name: 'code',
          title: 'Code',
          options: {
            withFilename: true,
            highlightedLines: true,
          },
        },
      ],
    },
  ],
}
