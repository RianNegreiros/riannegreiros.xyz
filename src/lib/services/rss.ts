export async function getRSSFeed(): Promise<string> {
  try {
    const response = await fetch("/rss.xml");
    if (!response.ok) {
      throw new Error("RSS feed not found");
    }
    return await response.text();
  } catch (error) {
    console.error("Failed to fetch RSS feed:", error);
    throw error;
  }
}

export const rssService = {
  getRSSFeed,
};
