import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout title="MatchMint Help Center" description="Find answers to your questions about MatchMint products and services.">
      <div className="bg-gradient-primary py-16 relative overflow-hidden">
        {/* Background elements similar to fifa-key-features */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Circle 1 */}
          <div className="absolute w-4/5 h-4/5 top-[-15%] left-[-10%] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.4),rgba(59,130,246,0.1))] filter blur-[60px] opacity-70 animate-pulse-slow"></div>
          
          {/* Circle 2 */}
          <div className="absolute w-3/4 h-3/4 bottom-[-10%] right-[-10%] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.4),rgba(79,70,229,0.1))] filter blur-[60px] opacity-70 animate-pulse-slow"></div>
          
          {/* Light beam */}
          <div className="absolute top-[-20%] right-[25%] w-[150px] h-[140%] bg-[linear-gradient(to_bottom,rgba(236,72,153,0),rgba(236,72,153,0.1),rgba(236,72,153,0))] transform rotate-[15deg] filter blur-[20px] animate-light-beam"></div>
          
          {/* Floating particles */}
          <div className="absolute w-3 h-3 top-[15%] left-[15%] rounded-full opacity-30 bg-[linear-gradient(to_right,#ec4899,#9333ea)] shadow-[0_0_20px_rgba(236,72,153,0.7)] animate-float-particle"></div>
          
          <div className="absolute w-2 h-2 top-[75%] left-[25%] rounded-full opacity-30 bg-[linear-gradient(to_right,#8b5cf6,#3b82f6)] shadow-[0_0_15px_rgba(139,92,246,0.7)] animate-float-particle-delay"></div>
          
          <div className="absolute w-4 h-4 top-[25%] right-[15%] rounded-full opacity-30 bg-[linear-gradient(to_right,#f472b6,#ec4899)] shadow-[0_0_25px_rgba(244,114,182,0.7)] animate-float-particle-long"></div>
        </div>
        
        <div className="container-custom text-center relative z-10">
          {/* Title badge similar to fifa-key-features */}
          <div className="inline-flex items-center bg-gradient-badge px-5 py-2 rounded-full text-sm font-semibold tracking-wider uppercase mb-5 text-white border border-secondary-500/30">
            <span className="block w-2 h-2 rounded-full bg-secondary-400 mr-2"></span>
            HELP CENTER
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">How can we help?</h1>
          <div className="max-w-2xl mx-auto">
            <form action="/search" method="get" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search for help articles..."
                className="w-full px-5 py-4 pr-12 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 transition-all duration-200"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-secondary-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* General Information */}
          <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-badge rounded-lg p-3 mr-3 border border-secondary-500/30 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                <span className="text-white text-xl" aria-hidden="true">ℹ️</span>
              </div>
              <h2 className="text-xl font-semibold text-fifa-darkPurple">General Information</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
              Find answers to general questions about our products, services, and policies.
            </p>
            
            <div className="space-y-2">
              <Link href="/articles/fifa-card-guide" className="block text-fifa-darkPurple hover:text-secondary-500 transition duration-300">
                Custom Sports Card Creation Guide
              </Link>
              <Link href="/articles/price-size-guide" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                Price & Size Guide
              </Link>
              <Link href="/articles/damage-protection" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                Damage Protection
              </Link>
              <Link href="/articles/money-back-guarantee" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                Money-Back Guarantee
              </Link>
              <Link href="/general-information" className="block text-sm text-secondary-500 hover:text-secondary-400 mt-2 font-medium">
                View all general information articles →
              </Link>
            </div>
          </div>

          {/* Delivery */}
          <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-badge rounded-lg p-3 mr-3 border border-secondary-500/30 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                <span className="text-white text-xl" aria-hidden="true">🚚</span>
              </div>
              <h2 className="text-xl font-semibold text-fifa-darkPurple">Delivery</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
              Information about shipping, tracking, and delivery of your orders.
            </p>
            
            <div className="space-y-2">
              <Link href="/articles/production-shipping-delivery-information" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                Production, Shipping & Delivery Information
              </Link>
              <Link href="/articles/customs-import-fees" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                Customs & Import Fees
              </Link>
              <Link href="/articles/tracking-delivery" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                How do I track my MatchMint delivery?
              </Link>
              <Link href="/delivery" className="block text-sm text-secondary-500 hover:text-secondary-600 mt-2 font-medium">
                View all delivery articles →
              </Link>
            </div>
          </div>

          {/* Order Processing */}
          <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-badge rounded-lg p-3 mr-3 border border-secondary-500/30 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                <span className="text-white text-xl" aria-hidden="true">⏱️</span>
              </div>
              <h2 className="text-xl font-semibold text-fifa-darkPurple">Order Processing</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
              Learn about our order processing times and requirements.
            </p>
            
            <div className="space-y-2">
              <Link href="/articles/how-long-cards-take" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                How long do cards take to make?
              </Link>
              <Link href="/articles/what-images-should-i-use" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                What images should I use for my order?
              </Link>
              <Link href="/articles/what-is-super-fast-track" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                What is Super Fast Track?
              </Link>
              <Link href="/order-processing" className="block text-sm text-secondary-500 hover:text-secondary-600 mt-2 font-medium">
                View all order processing articles →
              </Link>
            </div>
          </div>
          
          {/* Orders */}
          <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-badge rounded-lg p-3 mr-3 border border-secondary-500/30 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                <span className="text-white text-xl" aria-hidden="true">📋</span>
              </div>
              <h2 className="text-xl font-semibold text-fifa-darkPurple">Orders</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
              Information about managing your orders, changes, and issues.
            </p>
            
            <div className="space-y-2">
              <Link href="/articles/how-to-change-order-after-placed" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                How can I make changes to my order?
              </Link>
              <Link href="/articles/order-arrived-damaged" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                My order arrived damaged
              </Link>
              <Link href="/articles/order-not-shipped" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                My order has not been shipped
              </Link>
              <Link href="/orders" className="block text-sm text-secondary-500 hover:text-secondary-600 mt-2 font-medium">
                View all order articles →
              </Link>
            </div>
          </div>
          
          {/* Payments */}
          <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-badge rounded-lg p-3 mr-3 border border-secondary-500/30 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                <span className="text-white text-xl" aria-hidden="true">💳</span>
              </div>
              <h2 className="text-xl font-semibold text-fifa-darkPurple">Payments</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
              Information about payment methods, currencies, and payment-related questions.
            </p>
            
            <div className="space-y-2">
              <Link href="/articles/accepted-payment-methods" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                Accepted Payment Methods
              </Link>
              <Link href="/articles/klarna-payment" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                Klarna
              </Link>
              <Link href="/articles/clearpay-payment" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                Clearpay
              </Link>
              <Link href="/payments" className="block text-sm text-secondary-500 hover:text-secondary-600 mt-2 font-medium">
                View all payment articles →
              </Link>
            </div>
          </div>
          
          {/* Returns & Refunds */}
          <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-badge rounded-lg p-3 mr-3 border border-secondary-500/30 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                <span className="text-white text-xl" aria-hidden="true">↩️</span>
              </div>
              <h2 className="text-xl font-semibold text-fifa-darkPurple">Returns & Refunds</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
              Information about our return policy and refund process.
            </p>
            
            <div className="space-y-2">
              <Link href="/articles/refunds-return-policy" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                Refunds & Return Policy
              </Link>
              <Link href="/returns-refunds" className="block text-sm text-secondary-500 hover:text-secondary-600 mt-2 font-medium">
                View all returns & refunds articles →
              </Link>
            </div>
          </div>
          
          {/* Technical Support */}
          <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-badge rounded-lg p-3 mr-3 border border-secondary-500/30 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                <span className="text-white text-xl" aria-hidden="true">🔧</span>
              </div>
              <h2 className="text-xl font-semibold text-fifa-darkPurple">Technical Support</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
              Help with technical issues, website problems, and account management.
            </p>
            
            <div className="space-y-2">
              <Link href="/articles/cant-add-order-to-cart" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                I can't add my order to cart
              </Link>
              <Link href="/articles/account-login-password-reset" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                Account Login & Password Reset
              </Link>
              <Link href="/technical" className="block text-sm text-secondary-500 hover:text-secondary-600 mt-2 font-medium">
                View all technical support articles →
              </Link>
            </div>
          </div>
          
          {/* Contact */}
          <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-badge rounded-lg p-3 mr-3 border border-secondary-500/30 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                <span className="text-white text-xl" aria-hidden="true">📞</span>
              </div>
              <h2 className="text-xl font-semibold text-fifa-darkPurple">Contact Us</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
              Need more help? Contact our support team for personalized assistance.
            </p>
            
            <div className="space-y-2">
              <Link href="/contact" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                Contact Support
              </Link>
              <Link href="/articles/contact-us" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                Support Hours & Response Times
              </Link>
              <a href="mailto:support@matchmint.com" className="block text-primary-600 hover:text-primary-700 transition duration-300">
                Email: support@matchmint.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Still need help?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you with any questions or concerns.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition duration-300 ease-in-out bg-gradient-accent text-white hover:shadow-lg">
            Contact Support
          </Link>
        </div>
                </div>
        </Layout>
  );
}