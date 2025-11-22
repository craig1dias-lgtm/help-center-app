import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ArticleLayout from '../components/ArticleLayout';
import { useProxy } from '../components/ProxyContext';

// Import your page components
import HomePage from '../components/HomePage';
import ArticlePage from '../components/ArticlePage';
import CategoryPage from '../components/CategoryPage';
import SearchPage from '../components/SearchPage';
import ContactPage from '../components/ContactPage';

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
    const { page, id, api } = router.query;
    
    // If we're in the Shopify proxy and have a page parameter, render the appropriate component
    if (isInShopifyProxy && page) {
      switch (page) {
        case 'articles':
          setPageComponent(
            <ArticleLayout 
              currentArticleId={id} 
              categoryId={router.query.category}
            >
              <ArticlePage id={id} />
            </ArticleLayout>
          );
          break;
          
        case 'categories':
          setPageComponent(
            <CategoryPage id={id} />
          );
          break;
          
        case 'search':
          setPageComponent(
            <SearchPage query={router.query.q} />
          );
          break;
          
        case 'contact':
          setPageComponent(
            <ContactPage />
          );
          break;
          
        default:
          setPageComponent(
            <FallbackComponent name={page} />
          );
      }
    } else if (isInShopifyProxy && api) {
      // Handle API calls through the UI (this is just a fallback, most API calls should be handled server-side)
      setPageComponent(
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">API Request</h1>
          <p>This is an API endpoint that should be called directly, not viewed as a page.</p>
        </div>
      );
    } else {
      // Default to the home page
      setPageComponent(<HomePage />);
    }
  }, [router.query, isInShopifyProxy]);
  
  return (
    <Layout>
      {pageComponent}
    </Layout>
  );
}
