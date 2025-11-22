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
    
    if (page) {
      // Handle page navigation
      let path = `/${page}`;
      if (id) path += `/${id}`;
      
      // Use replace to avoid adding to browser history
      router.replace(path, undefined, { shallow: true });
      
      console.log('QueryRouter navigated to page:', path);
    } else if (api) {
      // Handle API calls - this is just for logging, actual API calls are handled differently
      console.log('QueryRouter detected API call:', api);
    }
  }, [router.query, isInShopifyProxy]);
  
  // This component doesn't render anything
  return null;
}
