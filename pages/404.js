import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Custom404() {
  return (
    <Layout title="Page Not Found - MatchMint Help Center">
      <div className="container-custom py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          We couldn't find the page you were looking for. It might have been moved or deleted.
        </p>
        <div className="space-y-6">
          <div>
            <Link href="/" className="btn">
              Return to Home
            </Link>
          </div>
          <p className="text-gray-500">
            Or try searching for what you need:
          </p>
          <div className="max-w-md mx-auto">
            <form action="/search" method="get" className="flex">
              <input
                type="text"
                name="q"
                placeholder="Search help articles..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
