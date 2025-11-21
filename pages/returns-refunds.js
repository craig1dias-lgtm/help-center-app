import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import Link from 'next/link';
import { getArticlesByCategory, getAllCategories } from '../lib/articles';

export default function ReturnsRefunds({ returnsRefundsArticles, allCategories }) {
  return (
    <ArticleLayout
      title="Returns & Refunds - MatchMint Help Center"
      description="Information about our return policy and refund process."
      categoryId="returns-refunds"
      currentArticleId={null}
      sidebarArticles={returnsRefundsArticles}
      allCategories={allCategories}
    >
      <div className="bg-white rounded-lg shadow-card p-6 md:p-8">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-primary rounded-lg p-3 mr-3">
            <span className="text-white text-xl">↩️</span>
          </div>
          <h2 className="text-xl font-semibold text-primary-700">Returns & Refunds</h2>
        </div>
        <p className="text-gray-600 mb-6">Information about our return policy and refund process.</p>
        
        <div className="space-y-2 mb-8">
          {returnsRefundsArticles.map((article) => (
            <Link 
              href={`/articles/${article.id}`} 
              key={article.id}
              className="block text-primary-600 hover:text-primary-700 transition duration-300"
            >
              {article.title}
            </Link>
          ))}
        </div>
      </div>
    </ArticleLayout>
  );
}

export async function getStaticProps() {
  const categories = getArticlesByCategory();
  const returnsRefundsArticles = categories['returns-refunds'] ? categories['returns-refunds'].articles : [];

  const allCategories = getAllCategories();

  return {
    props: {
      returnsRefundsArticles,
      allCategories,
    },
  };
}