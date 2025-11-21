import React from 'react';
import Head from 'next/head';
import ProxyLink from './ProxyLink';
import { useProxyAwareLinks } from '../utils/linkHelpers';
import { categoryData } from '../lib/categoryData';
import CollapsibleSidebar from './CollapsibleSidebar';
import HeaderDropdown from './HeaderDropdown';

export default function ArticleLayout({ children, title, description, currentArticleId, categoryId, sidebarArticles = [], allCategories = {} }) {
  const { getAssetPath } = useProxyAwareLinks();
  // Get current category from static data
  const currentCategory = categoryId && categoryData[categoryId] ? categoryData[categoryId] : null;
  
  // Get category title and icon
  const categoryTitle = currentCategory ? currentCategory.title : 'Articles';
  const categoryIcon = currentCategory ? currentCategory.icon : '📄';

  // Create a categories object for the sidebar if not provided
  const categoriesForSidebar = allCategories || {
    [categoryId]: {
      ...currentCategory,
      articles: sidebarArticles
    }
  };

  return (
    <div>
      <Head>
        <title>{title || 'MatchMint Help Center'}</title>
        <meta name="description" content={description || 'Find answers to your questions about MatchMint products and services.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={getAssetPath('/favicon.ico')} />
      </Head>
      
      <main className="min-h-screen bg-gray-50">
        <header className="bg-gradient-primary shadow-md">
          <div className="container-custom py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">
                <ProxyLink href="/">MatchMint Help Center</ProxyLink>
              </h1>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <ProxyLink href="/" className="text-white hover:text-secondary-200 transition duration-300">
                      Home
                    </ProxyLink>
                  </li>
                  <li>
                    <HeaderDropdown />
                  </li>
                  <li>
                    <ProxyLink href="/contact" className="text-white hover:text-secondary-200 transition duration-300">
                      Contact
                    </ProxyLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        
        <div className="container-custom py-8">
          <nav className="text-sm mb-6">
            <ol className="flex flex-wrap items-center space-x-2">
              <li>
                <ProxyLink href="/" className="text-primary-600 hover:underline">
                  Home
                </ProxyLink>
              </li>
              <li className="text-gray-400">
                <span aria-hidden="true">/</span>
              </li>
              {categoryId && (
                <>
                  <li>
                    <ProxyLink href={`/${categoryId}`} className="text-primary-600 hover:underline">
                      {categoryTitle}
                    </ProxyLink>
                  </li>
                  <li className="text-gray-400">
                    <span aria-hidden="true">/</span>
                  </li>
                </>
              )}
              <li>
                <span className="text-gray-600">{title}</span>
              </li>
            </ol>
          </nav>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Collapsible Sidebar */}
            <div className="md:w-1/4">
              <CollapsibleSidebar 
                allCategories={categoriesForSidebar}
                currentArticleId={currentArticleId}
                currentCategoryId={categoryId}
              />
            </div>
            
            {/* Main Content */}
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-card p-6 md:p-8">
                {children}
              </div>
            </div>
          </div>
        </div>
        
        <footer className="bg-gray-900 text-white">
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-secondary-400">MatchMint Help Center</h3>
                <p className="text-gray-300">
                  Find answers to your questions about our custom card builder and ordering process.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-secondary-400">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <ProxyLink href="/" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Home
                    </ProxyLink>
                  </li>
                  <li>
                    <ProxyLink href="/delivery" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Delivery
                    </ProxyLink>
                  </li>
                  <li>
                    <ProxyLink href="/order-processing" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Order Processing
                    </ProxyLink>
                  </li>
                  <li>
                    <ProxyLink href="/orders" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Orders
                    </ProxyLink>
                  </li>
                  <li>
                    <ProxyLink href="/payments" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Payments
                    </ProxyLink>
                  </li>
                  <li>
                    <ProxyLink href="/returns-refunds" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Returns & Refunds
                    </ProxyLink>
                  </li>
                  <li>
                    <ProxyLink href="/technical" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Technical Support
                    </ProxyLink>
                  </li>
                  <li>
                    <ProxyLink href="/contact" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Contact Us
                    </ProxyLink>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-secondary-400">Contact</h3>
                <p className="text-gray-300 mb-2">
                  Need help? Contact our support team.
                </p>
                <a href="mailto:support@matchmint.com" className="text-secondary-400 hover:text-secondary-300 transition duration-300">
                  support@matchmint.com
                </a>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-center text-gray-400">
                &copy; {new Date().getFullYear()} MatchMint. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
