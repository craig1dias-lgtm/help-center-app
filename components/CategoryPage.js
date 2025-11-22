import React from 'react';
import ProxyLink from './ProxyLink';

// This is a placeholder component - replace with your actual category page implementation
export default function CategoryPage({ id }) {
  // In a real implementation, you would fetch the category data based on the ID
  // For now, we'll use placeholder data
  
  const categories = {
    'getting-started': {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Everything you need to know to get started with MatchMint FIFA cards.',
      articles: [
        { id: 'getting-started', title: 'Getting Started with MatchMint FIFA Cards' },
        { id: 'card-types', title: 'FIFA Card Types and Designs' },
        { id: 'account-setup', title: 'Setting Up Your MatchMint Account' }
      ]
    },
    'ordering': {
      id: 'ordering',
      title: 'Ordering & Delivery',
      description: 'Information about placing orders and delivery options.',
      articles: [
        { id: 'production-shipping-delivery-information', title: 'Production, Shipping & Delivery Information' },
        { id: 'order-tracking', title: 'How to Track Your Order' },
        { id: 'international-shipping', title: 'International Shipping Guidelines' }
      ]
    },
    'design-tips': {
      id: 'design-tips',
      title: 'Design Tips',
      description: 'Tips and tricks for creating the perfect FIFA card.',
      articles: [
        { id: 'image-guidelines', title: 'Image Guidelines for Perfect FIFA Cards' },
        { id: 'attribute-selection', title: 'How to Choose Player Attributes' },
        { id: 'design-inspiration', title: 'Design Inspiration Gallery' }
      ]
    }
  };
  
  const category = categories[id] || {
    id: id || 'unknown',
    title: 'Category Not Found',
    description: 'The requested category could not be found.',
    articles: []
  };
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-4">{category.title}</h1>
      <p className="text-gray-600 mb-8">{category.description}</p>
      
      <div className="space-y-6">
        {category.articles.map(article => (
          <div key={article.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <ProxyLink href={`/articles/${article.id}`} className="text-primary-600 hover:underline">
              Read article →
            </ProxyLink>
          </div>
        ))}
        
        {category.articles.length === 0 && (
          <p className="text-gray-500 italic">No articles found in this category.</p>
        )}
      </div>
    </div>
  );
}
