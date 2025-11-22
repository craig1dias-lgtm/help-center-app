import React from 'react';
import ProxyLink from './ProxyLink';

// This is a placeholder component - replace with your actual home page implementation
export default function HomePage() {
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">MatchMint Help Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
          <p className="text-gray-600 mb-4">Learn how to create your custom FIFA card.</p>
          <ProxyLink href="/articles/getting-started" className="text-primary-600 hover:underline">
            Read more →
          </ProxyLink>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Delivery Information</h2>
          <p className="text-gray-600 mb-4">Find out about shipping times and delivery options.</p>
          <ProxyLink href="/articles/production-shipping-delivery-information" className="text-primary-600 hover:underline">
            Read more →
          </ProxyLink>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Image Guidelines</h2>
          <p className="text-gray-600 mb-4">Tips for uploading the perfect player image.</p>
          <ProxyLink href="/articles/image-guidelines" className="text-primary-600 hover:underline">
            Read more →
          </ProxyLink>
        </div>
      </div>
    </div>
  );
}
