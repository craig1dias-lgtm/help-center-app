import { useProxy } from '../components/ProxyContext';

/**
 * Hook that provides proxy-aware link utilities
 * Use this to ensure links work correctly in both direct and proxy environments
 */
export function useProxyAwareLinks() {
  const { isInShopifyProxy, baseUrl, proxyPath } = useProxy();
  
  /**
   * Transforms a path to work in both direct and proxy environments
   * @param {string} path - The original path/href
   * @returns {string} - The transformed path
   */
  const getHref = (path) => {
    // External links (starting with http/https) remain unchanged
    if (path && path.startsWith('http')) return path;
    
    // Ensure path starts with a slash
    const normalizedPath = path && path.startsWith('/') ? path : `/${path || ''}`;
    
    // Log the current state for debugging
    console.log('getHref called with:', { 
      path, 
      normalizedPath, 
      isInShopifyProxy, 
      baseUrl, 
      proxyPath 
    });
    
    // When in proxy, adjust the path
    if (isInShopifyProxy) {
      // If it's the root path, keep it as is but ensure we use the proxy path
      if (normalizedPath === '/' || normalizedPath === '/?') {
        return proxyPath || '/';
      }
      
      // Convert path-based routes to query parameters
      // Format: /section/id becomes /?page=section&id=id
      const pathParts = normalizedPath.split('/');
      
      // Remove empty first element
      if (pathParts[0] === '') pathParts.shift();
      
      if (pathParts.length >= 1) {
        // First part is the page/section
        const page = pathParts[0];
        
        // If there's a second part, it's usually an ID
        const id = pathParts.length >= 2 ? pathParts[1] : '';
        
        // Build the query string
        let queryPath = `?page=${page}`;
        if (id) queryPath += `&id=${id}`;
        
        // Add any existing query parameters
        if (normalizedPath.includes('?')) {
          const queryString = normalizedPath.split('?')[1];
          if (queryString && !queryString.includes('page=')) {
            queryPath += `&${queryString}`;
          }
        }
        
        // Make sure we use the proxyPath if available
        const finalPath = proxyPath ? `${proxyPath}${queryPath}` : queryPath;
        console.log('Transformed proxy path:', finalPath);
        return finalPath;
      }
      
      // Fallback to the original behavior
      const finalPath = proxyPath ? `${proxyPath}${normalizedPath}` : normalizedPath;
      console.log('Fallback proxy path:', finalPath);
      return finalPath;
    } else {
      // Direct environment - use the path as is
      console.log('Direct path:', normalizedPath);
      return normalizedPath;
    }
  };
  
  /**
   * Transforms an API endpoint to work in both direct and proxy environments
   * @param {string} endpoint - The API endpoint
   * @returns {string} - The transformed API URL
   */
  const getApiUrl = (endpoint) => {
    const normalizedEndpoint = endpoint && endpoint.startsWith('/') ? endpoint : `/${endpoint || ''}`;
    if (isInShopifyProxy) {
      // For API calls in proxy mode, we need to use query parameters
      // Format: /api/search?q=term becomes /?api=search&q=term
      
      // Extract the API path and query string
      const apiPath = normalizedEndpoint.split('?')[0];
      const queryString = normalizedEndpoint.includes('?') ? normalizedEndpoint.split('?')[1] : '';
      
      // Remove the leading slash from API path
      const apiEndpoint = apiPath.startsWith('/') ? apiPath.substring(1) : apiPath;
      
      // Build the query string
      let queryPath = `/?api=${apiEndpoint}`;
      if (queryString) queryPath += `&${queryString}`;
      
      return `${proxyPath || baseUrl}${queryPath}`;
    } else {
      return `/api${normalizedEndpoint}`;
    }
  };
  
  /**
   * Transforms an asset path (images, etc.) to work in both environments
   * @param {string} path - The asset path
   * @returns {string} - The transformed asset path
   */
  const getAssetPath = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    if (isInShopifyProxy) {
      // For assets, we typically need the full baseUrl
      return `${baseUrl}${normalizedPath}`;
    } else {
      return normalizedPath;
    }
  };
  
  /**
   * Performs programmatic navigation with proxy-aware paths
   * @param {string} path - The destination path
   */
  const navigate = (path) => {
    const adjustedPath = getHref(path);
    window.location.href = adjustedPath;
  };
  
  return { 
    getHref, 
    getApiUrl, 
    getAssetPath,
    navigate, 
    isInShopifyProxy, 
    baseUrl 
  };
}
