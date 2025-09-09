import React from 'react';

interface ArticleCardProps {
  title: string;
  excerpt: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, excerpt }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{excerpt}</p>
    </div>
  );
};

export default ArticleCard;
