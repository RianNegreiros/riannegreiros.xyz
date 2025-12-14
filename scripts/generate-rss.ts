import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { PortableTextBlock } from "@portabletext/types";
import { toHTML } from "@portabletext/to-html";
import RSS from "rss";
import fs from "fs";
import path from "path";
import { SITE_CONFIG } from "../src/lib/constants";

const client = createClient({
  apiVersion: "2024-03-13",
  dataset: "production",
  projectId: "091jywj8",
  useCdn: true,
  perspective: "published",
});

const builder = createImageUrlBuilder(client);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const urlFor = (source: any) => builder.image(source);

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  content: PortableTextBlock[];
  firstPublishedDate: string;
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

async function generateRssFeed() {
  const feed = new RSS({
    title: SITE_CONFIG.name,
    description: "RSS feed do meu blog pessoal",
    feed_url: `${process.env.VITE_BASE_URL}/rss.xml`,
    site_url: `${process.env.VITE_BASE_URL}`,
    language: "pt-BR",
  });

  const posts = await client.fetch(
    `*[_type == 'post'] | order(firstPublishedDate desc)`,
  );

  posts.forEach((post: Post) => {
    const contentHTML = convertPortableTextToHTML(post.content);
    feed.item({
      guid: post._id,
      title: post.title,
      description: contentHTML,
      url: `${process.env.VITE_BASE_URL}/blog/${post.slug.current}`,
      date: post.firstPublishedDate,
    });
  });

  return feed.xml({ indent: true });
}

async function main() {
  try {
    const rssXml = await generateRssFeed();
    const publicDir = path.join(process.cwd(), "public");

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, "rss.xml"), rssXml);
    console.log("RSS feed generated successfully at public/rss.xml");
  } catch (error) {
    console.error("Failed to generate RSS feed:", error);
    process.exit(1);
  }
}

main();
