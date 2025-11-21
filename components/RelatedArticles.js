import React from 'react';
import Link from 'next/link';

const RelatedArticles = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <Link 
            href={`/articles/${article.id}`} 
            key={article.id}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="font-medium text-primary-600">{article.title}</h3>
            {article.excerpt && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{article.excerpt}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
