import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HeaderDropdown from './HeaderDropdown';

const Layout = ({ children, title = 'MatchMint Help Center', description = 'Find answers to your questions about MatchMint products and services.' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <header className="bg-gradient-primary shadow-md">
          <div className="container-custom py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-white">
                MatchMint Help Center
              </Link>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <Link href="/" className="text-white hover:text-secondary-200 transition duration-300">
                      Home
                    </Link>
                  </li>
                  <li>
                    <HeaderDropdown />
                  </li>
                  <li>
                    <Link href="/contact" className="text-white hover:text-secondary-200 transition duration-300">
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-gray-900 text-white">
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-secondary-400">MatchMint Help Center</h3>
                <p className="text-gray-300">
                  Find answers to your questions about our custom card builder and ordering process.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-secondary-400">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/delivery" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Delivery
                    </Link>
                  </li>
                  <li>
                    <Link href="/order-processing" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Order Processing
                    </Link>
                  </li>
                  <li>
                    <Link href="/orders" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link href="/payments" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Payments
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns-refunds" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Returns & Refunds
                    </Link>
                  </li>
                  <li>
                    <Link href="/technical" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Technical Support
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-300 hover:text-secondary-300 transition duration-300">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-secondary-400">Contact</h3>
                <p className="text-gray-300 mb-2">
                  Need help? Contact our support team.
                </p>
                <a href="mailto:support@matchmint.com" className="text-secondary-400 hover:text-secondary-300 transition duration-300">
                  support@matchmint.com
                </a>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-center text-gray-400">
                &copy; {new Date().getFullYear()} MatchMint. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
