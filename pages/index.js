import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import HomePage from '../components/HomePage';
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
    
    // If we're in the Shopify proxy and have a page parameter, handle routing
    if (isInShopifyProxy && page) {
      console.log('Query parameter routing:', page, id);
      // We'll add the specific component routing later
    }
    
    // Default to the home page
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
}
