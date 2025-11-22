import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import Link from 'next/link';
import { getArticlesByCategory, getAllCategories } from '../lib/articles';

// Define the delivery article links for the main content
const deliveryLinks = [
  {
    id: 'production-shipping-delivery-information',
    title: 'Production, Shipping & Delivery Information',
    href: '/articles/production-shipping-delivery-information'
  },
  {
    id: 'customs-import-fees',
    title: 'Customs & Import Fees',
    href: '/articles/customs-import-fees'
  },
  {
    id: 'tracking-delivery',
    title: 'How do I track my MatchMint delivery?',
    href: '/articles/tracking-delivery'
  },
  {
    id: 'find-tracking-number',
    title: 'How do I find my tracking number?',
    href: '/articles/find-tracking-number'
  },
  {
    id: 'tracking-not-updating',
    title: 'My tracking information is not updating',
    href: '/articles/tracking-not-updating'
  },
  {
    id: 'change-delivery-address',
    title: 'I need to change my delivery address',
    href: '/articles/change-delivery-address'
  },
  {
    id: 'package-returned',
    title: 'My package was returned to MatchMint',
    href: '/articles/package-returned'
  },
  {
    id: 'label-created-no-updates',
    title: 'Why do I only see a label created without updates?',
    href: '/articles/label-created-no-updates'
  }
];

export default function Delivery({ deliveryArticles, allCategories }) {
  return (
    <ArticleLayout 
      title="Delivery" 
      description="Find answers to your delivery questions about MatchMint products and services."
      categoryId="delivery"
      sidebarArticles={deliveryArticles}
      allCategories={allCategories}
    >
      <div className="bg-white rounded-lg shadow-card p-6 md:p-8">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-primary rounded-lg p-3 mr-3">
            <span className="text-white text-xl">🚚</span>
          </div>
          <h2 className="text-xl font-semibold text-primary-700">Delivery</h2>
        </div>
        <p className="text-gray-600 mb-6">Information about shipping, tracking, and delivery of your orders.</p>
        
        <div className="space-y-2 mb-8">
          {deliveryLinks.map((link) => (
            <Link 
              key={link.id}
              href={link.href} 
              className="block text-primary-600 hover:text-primary-700 transition duration-300"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </ArticleLayout>
  );
}

export async function getStaticProps() {
  // Get delivery articles from the server-side only
  const categories = getArticlesByCategory();
  const deliveryArticles = categories['delivery'] ? categories['delivery'].articles : [];
  const allCategories = getAllCategories();
  
  return {
    props: {
      deliveryArticles,
      allCategories,
    },
  };
}