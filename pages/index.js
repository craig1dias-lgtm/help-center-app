import React from 'react';
import Layout from '../components/Layout';

// This is a fallback component in case the imported components don't exist
const FallbackComponent = ({ name }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Page Component Not Found</h1>
    <p>The component for "{name}" page could not be found.</p>
  </div>
);

export default function IndexPage() {
  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-6">MatchMint Help Center</h1>
        <p className="mb-4">Welcome to the help center. This is a temporary placeholder.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
            <p className="text-gray-600 mb-4">Learn how to create your custom FIFA card.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Delivery Information</h2>
            <p className="text-gray-600 mb-4">Find out about shipping times and delivery options.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Image Guidelines</h2>
            <p className="text-gray-600 mb-4">Tips for uploading the perfect player image.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
