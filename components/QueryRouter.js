import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useProxy } from './ProxyContext';

/**
 * QueryRouter component that handles query parameter-based routing
 * This allows us to use a single proxy path in Shopify but still navigate to different pages
 */
export default function QueryRouter() {
  const router = useRouter();
  const { isInShopifyProxy } = useProxy();
  
  useEffect(() => {
    // Only apply in Shopify proxy environment
    if (!isInShopifyProxy) return;
    
    // Get the query parameters
    const { page, id, api } = router.query;
    
    // Log the current query parameters
    console.log('QueryRouter detected query params:', { page, id, api });
    
    // We're no longer replacing the URL as it might interfere with the routing
    // Instead, we'll let the index.js component handle the routing based on query params
    
    if (page) {
      console.log('QueryRouter detected page:', page, id);
    } else if (api) {
      console.log('QueryRouter detected API call:', api);
    }
  }, [router.query, isInShopifyProxy]);
  
  // This component doesn't render anything
  return null;
}
