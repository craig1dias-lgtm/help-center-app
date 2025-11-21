import React, { createContext, useContext, useState, useEffect } from 'react';

const ProxyContext = createContext({
  isInShopifyProxy: false,
  shopDomain: null,
  baseUrl: ''
});

export const ProxyProvider = ({ children }) => {
  const [proxyState, setProxyState] = useState({
    isInShopifyProxy: false,
    shopDomain: null,
    baseUrl: ''
  });
  
  useEffect(() => {
    // Check if we're in the Shopify proxy
    const isInProxy = window.location.pathname.includes('/apps/help-center') || 
                     window.location.href.includes('?hmac=') ||
                     window.location.host.includes('myshopify.com');
    
    // Try to extract shop domain from query params
    const urlParams = new URLSearchParams(window.location.search);
    const shopDomain = urlParams.get('shop') || 
                      (window.location.host.includes('myshopify.com') ? window.location.host : null);
    
    // Determine base URL for assets
    let baseUrl = '';
    if (isInProxy) {
      // When in proxy, we need to use absolute URLs
      baseUrl = process.env.NEXT_PUBLIC_HOST || 'https://help-center-app-three.vercel.app';
    }
    
    setProxyState({
      isInShopifyProxy: isInProxy,
      shopDomain: shopDomain,
      baseUrl: baseUrl
    });
    
    // Debug info
    console.log('Proxy Context:', { isInProxy, shopDomain, baseUrl });
  }, []);
  
  return (
    <ProxyContext.Provider value={proxyState}>
      {children}
    </ProxyContext.Provider>
  );
};

export const useProxy = () => useContext(ProxyContext);
