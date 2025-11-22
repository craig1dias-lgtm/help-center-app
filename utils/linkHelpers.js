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
    
    // When in proxy, adjust the path
    if (isInShopifyProxy) {
      // For internal navigation, use the proxy path
      if (proxyPath) {
        return `${proxyPath}${normalizedPath}`;
      } else {
        // Fallback to baseUrl for assets if no proxy path is detected
        return `${baseUrl}${normalizedPath}`;
      }
    } else {
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
      if (proxyPath) {
        return `${proxyPath}/api${normalizedEndpoint}`;
      } else {
        return `${baseUrl}/api${normalizedEndpoint}`;
      }
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
