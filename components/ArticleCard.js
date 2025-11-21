import React from 'react';
import Link from 'next/link';

const ArticleCard = ({ article }) => {
  return (
    <Link href={`/articles/${article.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 hover:text-primary-600">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-gray-600 line-clamp-2">{article.excerpt}</p>
        )}
      </div>
    </Link>
  );
};

export default ArticleCard;
