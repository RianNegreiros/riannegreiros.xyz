import { createClient } from "@sanity/client";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";
import { toHTML } from "@portabletext/to-html";
import { SITE_CONFIG } from "./constants";
import { Feed } from "feed";

const client = createClient({
  apiVersion: "2024-03-13",
  dataset: "production",
  projectId: "091jywj8",
  useCdn: true,
  perspective: "published",
});

const builder = createImageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  content: PortableTextBlock[];
  overview: string;
  firstPublishedDate: string;
  image: string;
}

function convertPortableTextToHTML(content: PortableTextBlock[]): string {
  return toHTML(content, {
    components: {
      types: {
        image: ({ value }) =>
          `<img src="${urlFor(value).url()}" alt="${value.alt ?? "Image"}" />`,
        code: ({ value }) => `<pre><code>${value.code}</code></pre>`,
      },
    },
  });
}

export async function generateRSSFeed(baseUrl: string) {
  const posts = await client.fetch(
    `*[_type == 'post'] | order(firstPublishedDate desc)`,
  );

  const feed = new Feed({
    title: "RSS feed do meu blog pessoal",
    description: "This is my personal blog RSS feed",
    id: baseUrl,
    link: baseUrl,
    language: "pt-BR",
    image: `${baseUrl}/og-image.jpg`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: "2025 Rian Negreiros Dos Santos. Todos os direitos reservado",
    author: {
      name: SITE_CONFIG.author,
      email: SITE_CONFIG.email,
      link: baseUrl,
    },
  });

  posts.forEach((post: Post) => {
    const contentHTML = convertPortableTextToHTML(post.content);
    feed.addItem({
      title: post.title,
      id: post._id,
      link: `${baseUrl}/blog/${post.slug.current}`,
      description: post.overview,
      content: contentHTML,
      author: [
        {
          name: SITE_CONFIG.author,
          email: SITE_CONFIG.email,
          link: baseUrl,
        },
      ],
      date: post.firstPublishedDate
        ? new Date(post.firstPublishedDate)
        : new Date(),
      image: post.image ? urlFor(post.image).url() : undefined,
    });
  });

  return feed.rss2();
}
