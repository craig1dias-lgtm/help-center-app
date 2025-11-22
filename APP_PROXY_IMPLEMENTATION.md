# MatchMint Help Center: From iFrame to Shopify App Proxy

This document outlines the process we followed to migrate the MatchMint Help Center from an iframe-based implementation to a Shopify App Proxy solution, providing better SEO, performance, and user experience.

## Background

Originally, the Help Center was implemented as a Next.js application embedded within the Shopify theme using an iframe in the `page.help-center.liquid` template. While functional, this approach had several drawbacks:

1. **Poor SEO**: Content within iframes is not well-indexed by search engines
2. **Performance issues**: Loading a separate application within an iframe adds overhead
3. **Inconsistent styling**: Maintaining visual consistency between the iframe content and the main site was challenging
4. **User experience**: iframes create a disconnected browsing experience

## Solution: Shopify App Proxy

We migrated to Shopify's App Proxy feature, which allows external applications to be served under the Shopify store's domain. This approach offers several advantages:

1. **Improved SEO**: Content appears under the store's domain and is properly indexed
2. **Seamless user experience**: Users stay on the same domain without visible transitions
3. **Consistent styling**: Easier to maintain visual consistency across the site
4. **Better performance**: No iframe overhead

## Implementation Steps

### 1. Setting Up the App in Shopify Partner Dashboard

1. Created a new app in the Shopify Partner Dashboard
2. Configured App Proxy settings:
   - Subpath: `help-center`
   - Subpath URL: URL of the deployed Next.js app (Vercel)
   - Allowed request methods: GET, POST
3. Generated API credentials (API key and API secret key)

### 2. Modifying the Next.js Help Center App

#### Server-Side Changes

1. Updated `server.js` to handle App Proxy requests:
   ```javascript
   // App Proxy route handler
   server.get('/shopify-proxy', (req, res) => {
     // Verify the request is from Shopify
     const query = { ...req.query };
     const signature = query.signature;
     delete query.signature;
     
     // Sort the parameters
     const ordered = {};
     Object.keys(query).sort().forEach(key => {
       ordered[key] = query[key];
     });
     
     // Create the message string and calculate the HMAC
     const message = Object.keys(ordered)
       .map(key => `${key}=${ordered[key]}`)
       .join('');
       
     const hmac = crypto
       .createHmac('sha256', process.env.SHOPIFY_API_SECRET)
       .update(message)
       .digest('hex');
       
     // Verify the signature
     if (hmac !== signature) {
       return res.status(401).send('Invalid signature');
     }
     
     // If signature is valid, pass the request to Next.js
     return handle(req, res);
   });
   ```

#### Client-Side Changes

1. Created a `ProxyContext.js` component to detect if the app is running within the App Proxy:
   ```javascript
   import React, { createContext, useContext, useState, useEffect } from 'react';

   const ProxyContext = createContext({
     isInShopifyProxy: false,
     shopifyDomain: null
   });

   export const ProxyProvider = ({ children }) => {
     const [isInShopifyProxy, setIsInShopifyProxy] = useState(false);
     const [shopifyDomain, setShopifyDomain] = useState(null);

     useEffect(() => {
       // Check if we're in the Shopify App Proxy environment
       const checkIfInProxy = () => {
         // Check if URL contains signature parameter (used by Shopify App Proxy)
         const urlParams = new URLSearchParams(window.location.search);
         const hasSignature = urlParams.has('signature');
         
         // Check if path contains /apps/help-center
         const pathIncludesAppProxy = window.location.pathname.includes('/apps/help-center');
         
         // Get shop domain if available
         const shop = urlParams.get('shop');
         if (shop) {
           setShopifyDomain(shop);
         }
         
         setIsInShopifyProxy(hasSignature || pathIncludesAppProxy);
       };

       checkIfInProxy();
     }, []);

     return (
       <ProxyContext.Provider value={{ isInShopifyProxy, shopifyDomain }}>
         {children}
       </ProxyContext.Provider>
     );
   };

   export const useProxy = () => useContext(ProxyContext);
   ```

2. Updated `_app.js` to use the ProxyProvider:
   ```javascript
   import '../styles/globals.css';
   import { ErrorBoundary } from 'react-error-boundary';
   import { ProxyProvider } from '../components/ProxyContext';

   function MyApp({ Component, pageProps }) {
     return (
       <ErrorBoundary FallbackComponent={ErrorFallback}>
         <ProxyProvider>
           <Component {...pageProps} />
         </ProxyProvider>
       </ErrorBoundary>
     );
   }

   export default MyApp;
   ```

3. Created `next.config.js` to set the asset prefix for proper asset loading:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     assetPrefix: 'https://help-center-app-three.vercel.app', // Set your Vercel deployment URL here
     reactStrictMode: true,
   };

   module.exports = nextConfig;
   ```

4. Updated the `Layout.js` component to use absolute URLs for assets when in the App Proxy:
   ```javascript
   const { isInShopifyProxy } = useProxy();
   const assetBaseUrl = isInShopifyProxy ? 'https://help-center-app-three.vercel.app' : '';
   
   // Example usage
   <Image
     src={`${assetBaseUrl}/images/matchmint-logo.png`}
     alt="MatchMint"
     className="fifa-header__heading-logo"
     width={120}
     height={40}
     priority
     unoptimized
   />
   ```

5. Added conditional CSS loading in the `<Head>` section:
   ```javascript
   {isInShopifyProxy && (
     <>
       {/* Explicitly load CSS for proxy environment */}
       <link rel="stylesheet" href="https://help-center-app-three.vercel.app/_next/static/css/globals.css" />
       <link rel="stylesheet" href="https://help-center-app-three.vercel.app/_next/static/css/fifa-header.css" />
     </>
   )}
   ```

### 3. Updating the Shopify Theme

1. Modified `fifa-header.liquid` to use the App Proxy URL:
   ```liquid
   <!-- Help Center Link -->
   <li class="fifa-list-menu__item">
     <a href="{{ section.settings.help_center_url | default: '/apps/help-center' }}" class="fifa-list-menu__item--link">
       HELP CENTER
     </a>
   </li>
   ```

2. Updated the schema settings:
   ```liquid
   {
     "type": "text",
     "id": "help_center_url",
     "label": "Help Center URL",
     "default": "/apps/help-center",
     "info": "Enter the URL for the Help Center page. Default: /apps/help-center (App Proxy URL)."
   }
   ```

3. Ensured consistent styling between the Shopify theme and the Help Center app:
   - Matched font sizes (`0.875rem` for navigation items)
   - Matched padding and spacing
   - Used the same color scheme and gradients
   - Implemented the same hover effects

## Deployment and Testing

1. Deployed the updated Next.js app to Vercel
2. Set environment variables in Vercel:
   - `SHOPIFY_API_KEY`: The API key from the Shopify app
   - `SHOPIFY_API_SECRET`: The API secret key from the Shopify app
3. Configured the App Proxy in the Shopify Partner Dashboard
4. Tested the integration to ensure:
   - Proper styling and visual consistency
   - Correct HMAC validation for App Proxy requests
   - Proper asset loading with absolute URLs

## Benefits Achieved

1. **Improved SEO**: The Help Center content is now properly indexed by search engines under the main domain
2. **Seamless User Experience**: Users stay on the same domain without visible transitions
3. **Consistent Styling**: The Help Center now shares the same header, fonts, and styling as the main site
4. **Better Performance**: Eliminated the iframe overhead, resulting in faster page loads
5. **Maintainability**: Easier to update and maintain with a single codebase for the Help Center

## Future Considerations

1. **Caching**: Implement caching strategies to further improve performance
2. **Content Management**: Consider integrating a headless CMS for easier content updates
3. **Analytics**: Add analytics to track Help Center usage and popular topics
4. **Search Functionality**: Enhance the search capabilities within the Help Center
5. **Internationalization**: Add support for multiple languages if needed

## Conclusion

The migration from an iframe-based implementation to a Shopify App Proxy solution has significantly improved the MatchMint Help Center's SEO, performance, and user experience. The Help Center now appears as an integrated part of the main website while maintaining the flexibility of a separate Next.js application.
