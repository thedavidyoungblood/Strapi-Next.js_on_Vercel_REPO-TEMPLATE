import React from 'react';
import ArticleCard from './ArticleCard';

const ArticleList: React.FC = () => {
  // Placeholder data - this will be replaced with API data
  const articles = [
    { title: 'Article 1', excerpt: 'This is the excerpt for article 1.' },
    { title: 'Article 2', excerpt: 'This is the excerpt for article 2.' },
    { title: 'Article 3', excerpt: 'This is the excerpt for article 3.' },
  ];

  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <ArticleCard key={index} title={article.title} excerpt={article.excerpt} />
      ))}
    </div>
  );
};

export default ArticleList;
