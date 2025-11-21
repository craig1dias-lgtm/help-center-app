import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import Link from 'next/link';
import { getArticlesByCategory, getAllCategories } from '../lib/articles';

export default function Tracking({ trackingArticles, allCategories }) {
  return (
    <ArticleLayout
      title="Tracking & Shipping - MatchMint Help Center"
      description="Help with tracking your order and understanding shipping statuses."
      categoryId="tracking"
      currentArticleId={null}
      sidebarArticles={trackingArticles}
      allCategories={allCategories}
    >
      <div className="bg-white rounded-lg shadow-card p-6 md:p-8">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-primary rounded-lg p-3 mr-3">
            <span className="text-white text-xl">📦</span>
          </div>
          <h2 className="text-xl font-semibold text-primary-700">TRACKING & SHIPPING</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Help with tracking your order and understanding shipping statuses.
        </p>
        
        <div className="space-y-2 mb-8">
          {trackingArticles.map((article) => (
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
  const trackingArticles = categories['tracking'] ? categories['tracking'].articles : [];
  const allCategories = getAllCategories();

  return {
    props: {
      trackingArticles,
      allCategories,
    },
  };
}
