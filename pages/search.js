import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { getSortedArticlesData } from '../lib/articles';

// Inline Layout component
const Layout = ({ children, title = 'MatchMint Help Center', description = 'Find answers to your questions about MatchMint products and services.' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                MatchMint Help Center
              </Link>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <Link href="/" className="text-gray-600 hover:text-primary-600">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-600 hover:text-primary-600">
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">MatchMint Help Center</h3>
                <p className="text-gray-600">
                  Find answers to your questions about our custom card builder and ordering process.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-600 hover:text-primary-600">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/articles/fifa-card-guide" className="text-gray-600 hover:text-primary-600">
                      Custom Sports Card Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/articles/delivery-information" className="text-gray-600 hover:text-primary-600">
                      Delivery Information
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-600 hover:text-primary-600">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-gray-600 mb-2">
                  Need help? Contact our support team.
                </p>
                <a href="mailto:support@matchmint.com" className="text-primary-600 hover:underline">
                  support@matchmint.com
                </a>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-500">
                &copy; {new Date().getFullYear()} MatchMint. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

// Inline SearchBar component
const SearchBar = ({ initialQuery = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto w-full">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for help articles..."
          className="w-full px-5 py-4 pr-12 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

// Inline ArticleCard component
const ArticleCard = ({ article }) => {
  return (
    <Link href={`/articles/${article.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 hover:text-primary-600">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-gray-600 line-clamp-2">{article.excerpt}</p>
        )}
      </div>
    </Link>
  );
};

export default function Search({ allArticles }) {
  const router = useRouter();
  const { q } = router.query;
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (q) {
      setSearchQuery(q);
      const query = q.toLowerCase();
      
      // Simple search implementation - can be improved with a proper search library
      const results = allArticles.filter(article => {
        const titleMatch = article.title ? article.title.toLowerCase().includes(query) : false;
        const contentMatch = article.content ? article.content.toLowerCase().includes(query) : false;
        const excerptMatch = article.excerpt ? article.excerpt.toLowerCase().includes(query) : false;
        
        return titleMatch || contentMatch || excerptMatch;
      });
      
      setSearchResults(results);
    }
  }, [q, allArticles]);

  return (
    <Layout title={`Search Results for "${searchQuery}" - MatchMint Help Center`}>
      <div className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-6 text-center">Search Results</h1>
          <div className="max-w-2xl mx-auto">
            <SearchBar initialQuery={searchQuery} />
          </div>
        </div>
      </div>
      
      <div className="container-custom py-12">
        <div className="mb-6">
          <p className="text-lg">
            {searchResults.length === 0
              ? `No results found for "${searchQuery}"`
              : `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'} for "${searchQuery}"`}
          </p>
        </div>
        
        <div className="grid gap-6">
          {searchResults.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        
        {searchResults.length === 0 && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Can't find what you're looking for?</h2>
            <p className="mb-4">Try these suggestions:</p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Check the spelling of your search term</li>
              <li>Use more general keywords</li>
              <li>Browse our help categories on the home page</li>
            </ul>
            <p>
              Or <a href="/articles/contact-us" className="text-primary-600 hover:underline">contact our support team</a> for assistance.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const allArticles = getSortedArticlesData();
  
  return {
    props: {
      allArticles,
    },
  };
}
