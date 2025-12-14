import { useEffect } from "react";

interface BlogPostStructuredDataProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function BlogPostStructuredData({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  author = "Rian Negreiros Dos Santos",
}: BlogPostStructuredDataProps) {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description,
      url,
      author: {
        "@type": "Person",
        name: author,
      },
      publisher: {
        "@type": "Person",
        name: author,
      },
      ...(image && { image }),
      ...(publishedTime && { datePublished: publishedTime }),
      ...(modifiedTime && { dateModified: modifiedTime }),
    };

    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      script?.remove();
    };
  }, [title, description, url, image, publishedTime, modifiedTime, author]);

  return null;
}
