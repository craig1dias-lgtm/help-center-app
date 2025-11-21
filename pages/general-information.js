import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import Link from 'next/link';
import { getArticlesByCategory, getAllCategories } from '../lib/articles';

// Define the general information article links for the main content
const generalInfoLinks = [
  {
    id: 'custom-sports-card-creation-guide',
    title: 'Custom Sports Card Creation Guide',
    href: '/articles/fifa-card-guide'
  },
  {
    id: 'price-size-guide',
    title: 'Price & Size Guide',
    href: '/articles/price-size-guide'
  },
  {
    id: 'damage-protection',
    title: 'Damage Protection Plan',
    href: '/articles/damage-protection'
  },
  {
    id: 'money-back-guarantee',
    title: 'Money-Back Guarantee',
    href: '/articles/money-back-guarantee'
  },
  {
    id: 'club-badge-limitations',
    title: 'Club Badge Limitations',
    href: '/articles/club-badge-limitations'
  },
  {
    id: 'partnerships-sponsorships',
    title: 'Partnerships & Sponsorships',
    href: '/articles/partnerships-sponsorships'
  },
  {
    id: 'bulk-discounts',
    title: 'Bulk Discounts',
    href: '/articles/bulk-discounts'
  },
  {
    id: 'groupon',
    title: 'Groupon Vouchers',
    href: '/articles/groupon'
  },
  {
    id: 'vat-registration',
    title: 'VAT Registration Information',
    href: '/articles/vat-registration'
  },
  {
    id: 'terms-conditions',
    title: 'Terms & Conditions',
    href: '/articles/terms-conditions'
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    href: '/articles/privacy-policy'
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    href: '/articles/contact-us'
  },
  {
    id: 'image-requirements',
    title: 'Image Requirements',
    href: '/articles/image-requirements'
  }
];

export default function GeneralInformation({ generalInfoArticles, allCategories }) {
  return (
    <ArticleLayout 
      title="General Information" 
      description="Find answers to general questions about MatchMint products, services, and policies."
      categoryId="general-information"
      sidebarArticles={generalInfoArticles}
      allCategories={allCategories}
    >
      <div className="bg-white rounded-lg shadow-card p-6 md:p-8">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-primary rounded-lg p-3 mr-3">
            <span className="text-white text-xl">ℹ️</span>
          </div>
          <h2 className="text-xl font-semibold text-primary-700">General Information</h2>
        </div>
        <p className="text-gray-600 mb-6">Find answers to general questions about our products, services, and policies.</p>
        
        <div className="space-y-2 mb-8">
          {generalInfoLinks.map((link) => (
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
  // Get general information articles from the server-side only
  const categories = getArticlesByCategory();
  const generalInfoArticles = categories['general-information'] ? categories['general-information'].articles : [];
  const allCategories = getAllCategories();
  
  return {
    props: {
      generalInfoArticles,
      allCategories,
    },
  };
}
