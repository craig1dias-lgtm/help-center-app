/**
 * Test script to verify proxy links work correctly in both environments
 * 
 * This script should be run in the browser console when viewing the help center
 * in both the direct Vercel environment and through the Shopify proxy.
 */

(function testProxyLinks() {
  console.log('🔍 Testing Proxy Links Implementation');
  
  // Check if we're in the proxy environment
  const isInProxy = window.location.pathname.includes('/apps/help-center') || 
                   window.location.href.includes('?hmac=') ||
                   window.location.host.includes('myshopify.com');
  
  console.log(`Environment: ${isInProxy ? 'Shopify Proxy' : 'Direct Vercel'}`);
  
  // Get all links on the page
  const allLinks = document.querySelectorAll('a[href]');
  console.log(`Found ${allLinks.length} links on the page`);
  
  // Test categories
  const internalLinks = [];
  const externalLinks = [];
  const assetLinks = [];
  const apiLinks = [];
  
  // Categorize links
  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Skip anchor links
    if (href.startsWith('#')) return;
    
    // Categorize link
    if (href.startsWith('http') && !href.includes(window.location.host)) {
      externalLinks.push({ element: link, href });
    } else if (href.includes('/api/')) {
      apiLinks.push({ element: link, href });
    } else if (href.match(/\.(png|jpg|jpeg|gif|svg|css|js|ico)$/i)) {
      assetLinks.push({ element: link, href });
    } else {
      internalLinks.push({ element: link, href });
    }
  });
  
  // Log results
  console.log('Internal navigation links:', internalLinks.length);
  internalLinks.slice(0, 10).forEach(link => console.log(`  - ${link.href}`));
  if (internalLinks.length > 10) console.log(`  ... and ${internalLinks.length - 10} more`);
  
  console.log('External links:', externalLinks.length);
  externalLinks.slice(0, 5).forEach(link => console.log(`  - ${link.href}`));
  if (externalLinks.length > 5) console.log(`  ... and ${externalLinks.length - 5} more`);
  
  console.log('Asset links:', assetLinks.length);
  assetLinks.slice(0, 5).forEach(link => console.log(`  - ${link.href}`));
  if (assetLinks.length > 5) console.log(`  ... and ${assetLinks.length - 5} more`);
  
  console.log('API links:', apiLinks.length);
  apiLinks.forEach(link => console.log(`  - ${link.href}`));
  
  // Verify internal links have the correct format
  if (isInProxy) {
    // In proxy mode, internal links should include the base URL
    const baseUrl = document.querySelector('meta[name="proxy-base-url"]')?.getAttribute('content');
    if (!baseUrl) {
      console.error('❌ Could not find proxy base URL meta tag - add this to your head!');
    } else {
      console.log(`Base URL: ${baseUrl}`);
      
      // Check if internal links include the base URL
      const incorrectLinks = internalLinks.filter(link => {
        // Skip links that are full URLs already
        if (link.href.startsWith('http')) return false;
        
        // Internal links in proxy mode should include the base URL
        return !link.href.startsWith(baseUrl);
      });
      
      if (incorrectLinks.length > 0) {
        console.error(`❌ Found ${incorrectLinks.length} internal links that don't include the base URL:`);
        incorrectLinks.forEach(link => console.error(`  - ${link.href}`));
      } else {
        console.log('✅ All internal links include the base URL');
      }
    }
  } else {
    // In direct mode, internal links should be relative
    const incorrectLinks = internalLinks.filter(link => {
      // Skip links that are already relative
      if (!link.href.startsWith('http')) return false;
      
      // Internal links in direct mode should be relative
      return link.href.includes(window.location.host) && !link.href.startsWith('/');
    });
    
    if (incorrectLinks.length > 0) {
      console.error(`❌ Found ${incorrectLinks.length} internal links that aren't relative:`);
      incorrectLinks.forEach(link => console.error(`  - ${link.href}`));
    } else {
      console.log('✅ All internal links are relative');
    }
  }
  
  // Add meta tag for base URL if in proxy mode
  if (isInProxy) {
    console.log('💡 TIP: Add this meta tag to your head to make testing easier:');
    console.log('<meta name="proxy-base-url" content="YOUR_BASE_URL" />');
  }
  
  console.log('🔍 Test complete!');
})();
