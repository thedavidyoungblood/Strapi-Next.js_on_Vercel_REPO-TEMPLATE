const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles`);
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}
