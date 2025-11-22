import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useProxy } from '../components/ProxyContext';

// Import HomePage component
import HomePage from '../components/HomePage';

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
    // Default to the home page
    setPageComponent(<HomePage />);
  }, []);
  
  return (
    <Layout>
      {pageComponent}
    </Layout>
  );
}
