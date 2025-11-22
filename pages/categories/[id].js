import React from 'react';
import Layout from '../../components/Layout';
import Breadcrumbs from '../../components/Breadcrumbs';
import ArticleCard from '../../components/ArticleCard';
import { getAllCategories, getCategoryData } from '../../lib/articles';

export default function Category({ category }) {
  if (!category) {
    return (
      <Layout title="Category Not Found - MatchMint Help Center">
        <div className="container-custom py-12 text-center">
          <h1 className="text-3xl font-bold mb-6">Category Not Found</h1>
          <p className="mb-6">The category you're looking for doesn't exist or has been moved.</p>
          <a href="/" className="btn">Return to Home</a>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${category.title} - MatchMint Help Center`} description={category.description}>
      <div className="container-custom py-12">
        <Breadcrumbs items={[{ label: category.title }]} />
        
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{category.icon}</span>
            <h1 className="text-3xl font-bold">{category.title}</h1>
          </div>
          <p className="text-lg text-gray-600">{category.description}</p>
        </div>
        
        <div className="grid gap-6">
          {category.articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        
        {category.articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">No articles found in this category.</p>
            <a href="/" className="btn">Browse All Categories</a>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const categories = getAllCategories();
  const paths = categories.map((category) => ({
    params: { id: category.id },
  }));
  
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const category = getCategoryData(params.id);
  
  return {
    props: {
      category: category || null,
    },
  };
}
