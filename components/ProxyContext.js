import React, { createContext, useContext, useState, useEffect } from 'react';

const ProxyContext = createContext({
  isInShopifyProxy: false,
  shopDomain: null,
  baseUrl: '',
  proxyPath: ''
});

export const ProxyProvider = ({ children }) => {
  const [proxyState, setProxyState] = useState({
    isInShopifyProxy: false,
    shopDomain: null,
    baseUrl: '',
    proxyPath: ''
  });
  
  useEffect(() => {
    // Check if we're in the Shopify proxy - more robust detection
    const isInProxy = typeof window !== 'undefined' && (
      window.location.pathname.includes('/apps/help-center') || 
      window.location.href.includes('?hmac=') ||
      window.location.host.includes('myshopify.com') ||
      document.querySelector('meta[name="shopify-digital-wallet"]') !== null
    );
    
    console.log('Proxy detection:', { 
      path: typeof window !== 'undefined' ? window.location.pathname : 'N/A',
      host: typeof window !== 'undefined' ? window.location.host : 'N/A',
      isInProxy 
    });
    
    // Try to extract shop domain from query params
    const urlParams = new URLSearchParams(window.location.search);
    const shopDomain = urlParams.get('shop') || 
                      (window.location.host.includes('myshopify.com') ? window.location.host : null);
    
    // Determine base URL for assets and proxy path
    let baseUrl = '';
    let proxyPath = '';
    
    if (isInProxy) {
      // When in proxy, we need to use absolute URLs for external resources
      baseUrl = process.env.NEXT_PUBLIC_HOST || 'https://help-center-app-three.vercel.app';
      
      // Extract the proxy path from the URL
      if (window.location.pathname.includes('/apps/help-center')) {
        // Extract the proxy path (e.g., /apps/help-center)
        const pathMatch = window.location.pathname.match(/(\/apps\/help-center)(?:\/|$)/);
        if (pathMatch && pathMatch[1]) {
          proxyPath = pathMatch[1];
          console.log('Detected proxy path:', proxyPath);
        }
      }
    }
    
    setProxyState({
      isInShopifyProxy: isInProxy,
      shopDomain: shopDomain,
      baseUrl: baseUrl,
      proxyPath: proxyPath
    });
    
    // Debug info
    console.log('Proxy Context:', { isInProxy, shopDomain, baseUrl, proxyPath });
  }, []);
  
  return (
    <ProxyContext.Provider value={proxyState}>
      {children}
    </ProxyContext.Provider>
  );
};

export const useProxy = () => useContext(ProxyContext);
