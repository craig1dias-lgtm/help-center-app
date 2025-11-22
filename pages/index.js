import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import HomePage from '../components/HomePage';
import ArticlePage from '../components/ArticlePage';
import CategoryPage from '../components/CategoryPage';
import SearchPage from '../components/SearchPage';
import ContactPage from '../components/ContactPage';
import { useProxy } from '../components/ProxyContext';

// This is a fallback component in case the imported components don't exist
const FallbackComponent = ({ name }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Page Component Not Found</h1>
    <p>The component for "{name}" page could not be found.</p>
  </div>
);

export default function IndexPage() {
  const router = useRouter();
  const { isInShopifyProxy } = useProxy();
  const [pageComponent, setPageComponent] = useState(null);
  
  useEffect(() => {
    // Get the query parameters
    const { page, id } = router.query;
    
    // Log the current router state for debugging
    console.log('Index.js router state:', { 
      query: router.query, 
      pathname: router.pathname,
      asPath: router.asPath,
      isInShopifyProxy
    });
    
    // Handle routing based on query parameters
    if (page) {
      console.log('Query parameter routing:', page, id);
      
      // Handle different pages
      switch(page) {
        case 'articles':
          if (id) {
            console.log('Loading ArticlePage with id:', id);
            setPageComponent(<ArticlePage articleId={id} />);
            return;
          }
          break;
        case 'categories':
          if (id) {
            console.log('Loading CategoryPage with id:', id);
            setPageComponent(<CategoryPage categoryId={id} />);
            return;
          }
          break;
        case 'search':
          console.log('Loading SearchPage with query:', id);
          setPageComponent(<SearchPage query={id} />);
          return;
        case 'contact':
          console.log('Loading ContactPage');
          setPageComponent(<ContactPage />);
          return;
        default:
          console.log('Unknown page:', page);
      }
    }
    
    // Default to the home page
    console.log('Loading HomePage (default)');
    setPageComponent(<HomePage />);
  }, [router.query, isInShopifyProxy]);
  
  return (
    <Layout>
      {pageComponent || (
        <div className="container-custom py-8">
          <p>Loading...</p>
        </div>
      )}
    </Layout>
  );
}
