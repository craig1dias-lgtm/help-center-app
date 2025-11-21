import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import Link from 'next/link';
import { getArticlesByCategory, getAllCategories } from '../lib/articles';

export default function OrderProcessing({ orderProcessingArticles, allCategories }) {
  return (
    <ArticleLayout
      title="Order Processing - MatchMint Help Center"
      description="Learn about our order processing times and requirements."
      categoryId="order-processing"
      currentArticleId={null}
      sidebarArticles={orderProcessingArticles}
      allCategories={allCategories}
    >
      <div className="bg-white rounded-lg shadow-card p-6 md:p-8">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-primary rounded-lg p-3 mr-3">
            <span className="text-white text-xl">⏱️</span>
          </div>
          <h2 className="text-xl font-semibold text-primary-700">Order Processing</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Learn about our order processing times and requirements.
        </p>
        
        <div className="space-y-2 mb-8">
          {orderProcessingArticles.map((article) => (
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
  const orderProcessingArticles = categories['order-processing'] ? categories['order-processing'].articles : [];
  const allCategories = getAllCategories();

  return {
    props: {
      orderProcessingArticles,
      allCategories,
    },
  };
}