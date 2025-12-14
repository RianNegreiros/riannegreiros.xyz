import { Button } from "@/components/ui/button";
import { ExternalLink, Rss } from "lucide-react";

export default function RssFeedPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl text-center space-y-6">
      <Rss className="w-16 h-16 mx-auto text-primary" />
      <h1 className="text-3xl font-bold">RSS Feed</h1>
      <p className="text-muted-foreground">
        Assine o RSS feed para receber atualizações dos posts do blog.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
            <Rss className="w-4 h-4 mr-2" />
            Ver RSS Feed
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>

        <Button asChild variant="outline">
          <a href="/blog">Ver Posts do Blog</a>
        </Button>
      </div>

      <div className="text-sm text-muted-foreground space-y-2">
        <p>
          URL do RSS:{" "}
          <code className="bg-muted px-2 py-1 rounded">
            {window.location.origin}/rss.xml
          </code>
        </p>
        <p>Use esta URL em seu leitor de RSS favorito</p>
      </div>
    </div>
  );
}
