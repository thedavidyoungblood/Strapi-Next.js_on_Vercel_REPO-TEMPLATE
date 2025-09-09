import React from 'react';
import ArticleCard from './ArticleCard';
import { getArticles } from '@/lib/api';

const ArticleList: React.FC = async () => {
  const articles = await getArticles();

  if (!articles || articles.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.attributes.title}
          excerpt={article.attributes.excerpt}
        />
      ))}
    </div>
  );
};

export default ArticleList;
