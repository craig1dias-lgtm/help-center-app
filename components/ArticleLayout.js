import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { categoryData } from '../lib/categoryData';
import CollapsibleSidebar from './CollapsibleSidebar';
import HeaderDropdown from './HeaderDropdown';
import getConfig from 'next/config';

// Import the FIFAHeader component from Layout.js
// Inline FIFAHeader component to avoid import issues
const FIFAHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { publicRuntimeConfig } = getConfig() || { publicRuntimeConfig: { basePath: '' } };
  
  // Use standard paths for assets
  const basePath = '';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={`fifa-header-wrapper ${scrolled ? 'scrolled' : ''}`} id="fifa-header-section">
      <header className="fifa-header fifa-header--has-menu">
        {/* Logo */}
        <div className="fifa-header__heading">
          <a href="https://www.matchmintfootballcards.com/" className="fifa-header__heading-link">
            <div className="fifa-header__heading-logo-wrapper">
              <Image
                src={`${basePath}/images/matchmint-logo.png`}
                alt="MatchMint"
                className="fifa-header__heading-logo"
                width={120}
                height={40}
                priority
                unoptimized
              />
            </div>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="fifa-mobile-menu-toggle" onClick={toggleMobileMenu}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="#1a103c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav className="fifa-header__menu">
          <ul className={`fifa-list-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li className="fifa-list-menu__item">
              <a href="https://www.matchmintfootballcards.com/collections/all" className="fifa-list-menu__item--link">
                FOOTBALL CARDS
              </a>
            </li>
            <li className="fifa-list-menu__item">
              <Link href="/pages/guides" className="fifa-list-menu__item--link">
                GUIDES
              </Link>
            </li>
            <li className="fifa-list-menu__item">
              <Link href="/" className="fifa-list-menu__item--link fifa-list-menu__item--active">
                HELP CENTER
              </Link>
            </li>
          </ul>
        </nav>

        {/* Header Actions - Buy Card Button and Cart */}
        <div className="fifa-header__actions">
          {/* Buy Card Button */}
          <a href="https://www.matchmintfootballcards.com/collections/all" className="fifa-header__buy-button">
            Buy Card
          </a>

          {/* Cart Icon */}
          <a href="https://www.matchmintfootballcards.com/cart" className="fifa-header__icon fifa-header__icon--cart">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1.66666L2.5 5.83332V16.6667C2.5 17.1087 2.67559 17.5326 2.98816 17.8452C3.30072 18.1577 3.72464 18.3333 4.16667 18.3333H15.8333C16.2754 18.3333 16.6993 18.1577 17.0118 17.8452C17.3244 17.5326 17.5 17.1087 17.5 16.6667V5.83332L15 1.66666H5Z" stroke="#1a103c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.5 5.83334H17.5" stroke="#1a103c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.3332 9.16666C13.3332 10.0507 12.982 10.8986 12.3569 11.5237C11.7318 12.1488 10.8839 12.5 9.99984 12.5C9.11578 12.5 8.26794 12.1488 7.64282 11.5237C7.0177 10.8986 6.6665 10.0507 6.6665 9.16666" stroke="#1a103c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </header>
      
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fifa-mobile-menu-overlay">
          <ul className="fifa-mobile-menu">
            <li className="fifa-mobile-menu__item">
              <a href="https://www.matchmintfootballcards.com/collections/all" className="fifa-mobile-menu__link" onClick={toggleMobileMenu}>
                FOOTBALL CARDS
              </a>
            </li>
            <li className="fifa-mobile-menu__item">
              <Link href="/pages/guides" className="fifa-mobile-menu__link" onClick={toggleMobileMenu}>
                GUIDES
              </Link>
            </li>
            <li className="fifa-mobile-menu__item">
              <Link href="/" className="fifa-mobile-menu__link fifa-mobile-menu__link--active" onClick={toggleMobileMenu}>
                HELP CENTER
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default function ArticleLayout({ children, title, description, currentArticleId, categoryId, sidebarArticles = [], allCategories = {} }) {
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-gray-50">
        {/* Replace the custom header with the FIFA header */}
        <FIFAHeader />
        
        <div className="container-custom py-8">
          <nav className="text-sm mb-6">
            <ol className="flex flex-wrap items-center space-x-2">
              <li>
                <Link href="/" className="text-primary-600 hover:underline">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">
                <span aria-hidden="true">/</span>
              </li>
              {categoryId && (
                <>
                  <li>
                    <Link href={`/${categoryId}`} className="text-primary-600 hover:underline">
                      {categoryTitle}
                    </Link>
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
                    <Link href="/" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/delivery" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Delivery
                    </Link>
                  </li>
                  <li>
                    <Link href="/order-processing" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Order Processing
                    </Link>
                  </li>
                  <li>
                    <Link href="/orders" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link href="/payments" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Payments
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns-refunds" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Returns & Refunds
                    </Link>
                  </li>
                  <li>
                    <Link href="/technical" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Technical Support
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Contact Us
                    </Link>
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
