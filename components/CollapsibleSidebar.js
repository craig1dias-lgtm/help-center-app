import React, { useState } from 'react';
import Link from 'next/link';
import { categoryData } from '../lib/categoryData';

const CollapsibleCategory = ({ category, articles, currentArticleId, isActive, toggleCategory }) => {
  return (
    <div className="mb-2">
      <button 
        onClick={() => toggleCategory(category.id)}
        className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 rounded-lg shadow-sm border border-gray-200"
      >
        <div className="flex items-center">
          <div className="bg-gradient-primary rounded-lg p-2 mr-3">
            <span className="text-white text-lg">{category.icon}</span>
          </div>
          <h3 className="text-lg font-medium text-primary-700">{category.title}</h3>
        </div>
        <div className="text-gray-500">
          {isActive ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </button>
      
      {isActive && articles && articles.length > 0 && (
        <div className="mt-1 ml-2 pl-4 border-l-2 border-gray-200">
          <ul className="py-2">
            {articles.map((article) => (
              <li key={article.id} className="py-1">
                <Link 
                  href={`/articles/${article.id}`}
                  className={`block py-2 px-3 rounded-md transition duration-300 ease-in-out ${
                    currentArticleId === article.id 
                      ? 'font-semibold text-primary-700 bg-primary-50' 
                      : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50'
                  }`}
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function CollapsibleSidebar({ allCategories, currentArticleId, currentCategoryId }) {
  // Initialize with the current category expanded
  const [activeCategories, setActiveCategories] = useState({
    [currentCategoryId]: true
  });

  const toggleCategory = (categoryId) => {
    setActiveCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Convert allCategories array to a map for easier lookup
  const categoriesMap = {};
  if (Array.isArray(allCategories)) {
    allCategories.forEach(category => {
      if (category && category.id) {
        categoriesMap[category.id] = category;
      }
    });
  } else if (typeof allCategories === 'object' && allCategories !== null) {
    // If it's already a map, use it directly
    Object.assign(categoriesMap, allCategories);
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-bold text-primary-800 mb-4">Help Topics</h2>
      
      {Object.values(categoryData).map((category) => {
        const categoryArticles = categoriesMap[category.id]?.articles || [];
        return (
          <CollapsibleCategory
            key={category.id}
            category={category}
            articles={categoryArticles}
            currentArticleId={currentArticleId}
            isActive={!!activeCategories[category.id]}
            toggleCategory={toggleCategory}
          />
        );
      })}
    </div>
  );
}
