import React, { useEffect, useState } from 'react';
import ProxyLink from './ProxyLink';
import { useProxyAwareLinks } from '../utils/linkHelpers';

// This is a placeholder component - replace with your actual search page implementation
export default function SearchPage({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getApiUrl } = useProxyAwareLinks();
  
  useEffect(() => {
    // Only search if we have a query
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }
    
    // Simulate searching
    setLoading(true);
    
    // In a real implementation, you would call your search API
    // For now, we'll use placeholder data
    setTimeout(() => {
      // Simulate search results based on the query
      const searchResults = [
        {
          id: 'getting-started',
          title: 'Getting Started with MatchMint FIFA Cards',
          excerpt: 'This guide will help you create your perfect custom FIFA card in just a few simple steps.'
        },
        {
          id: 'production-shipping-delivery-information',
          title: 'Production, Shipping & Delivery Information',
          excerpt: 'Each card is carefully crafted to ensure the highest quality. Our production process typically takes 1-2 business days.'
        },
        {
          id: 'image-guidelines',
          title: 'Image Guidelines for Perfect FIFA Cards',
          excerpt: 'To create the best possible FIFA card, please follow these guidelines for your uploaded photo.'
        }
      ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.excerpt.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(searchResults);
      setLoading(false);
    }, 500);
  }, [query]);
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      
      {query ? (
        <p className="text-gray-600 mb-8">
          Showing results for: <span className="font-semibold">"{query}"</span>
        </p>
      ) : (
        <p className="text-gray-600 mb-8">
          Please enter a search term to find help articles.
        </p>
      )}
      
      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse bg-white p-6 rounded-lg shadow-md">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {results.length > 0 ? (
            results.map(result => (
              <div key={result.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
                <p className="text-gray-600 mb-3">{result.excerpt}</p>
                <ProxyLink href={`/articles/${result.id}`} className="text-primary-600 hover:underline">
                  Read more →
                </ProxyLink>
              </div>
            ))
          ) : (
            query && (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-600 mb-2">No results found for "{query}".</p>
                <p className="text-gray-500">Try using different keywords or check the spelling.</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
