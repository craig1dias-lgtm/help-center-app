import React from 'react';
import Link from 'next/link';

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3" aria-hidden="true">{category.icon}</span>
        <h2 className="text-xl font-semibold">{category.title}</h2>
      </div>
      
      <p className="text-gray-600 mb-6 flex-grow">{category.description}</p>
      
      <div className="space-y-2">
        {category.articles.slice(0, 3).map((article) => (
          <Link 
            href={`/articles/${article.id}`}
            key={article.id}
            className="block text-primary-600 hover:underline"
          >
            {article.title}
          </Link>
        ))}
        
        {category.articles.length > 3 && (
          <Link 
            href={`/categories/${category.id}`}
            className="block text-sm text-gray-500 hover:text-primary-600 mt-2"
          >
            View all {category.articles.length} articles →
          </Link>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
