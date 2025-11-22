import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSortedArticlesData } from '../lib/articles-browser';

// This is a placeholder component - replace with your actual article page implementation
export default function ArticlePage({ id }) {
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch article data from the articles.js library
    setLoading(true);
    
    try {
      // Get all articles
      const allArticles = getSortedArticlesData();
      
      // Find the article with the matching ID
      const foundArticle = allArticles.find(article => article.id === id);
      
      if (foundArticle) {
        // If we found the article, set it in state
        setArticle({
          id: foundArticle.id,
          title: foundArticle.title,
          content: foundArticle.content
        });
        console.log('Found article:', foundArticle.id);
      } else {
        // If we couldn't find the article, show a placeholder
        console.log('Article not found:', id);
        
        // Fallback to hardcoded articles for demo purposes
        if (id === 'customs-import-fees') {
          setArticle({
            id: 'customs-import-fees',
            title: 'Customs & Import Fees | International Shipping Guide',
            content: `
              <h2>Understanding Customs & Import Fees</h2>
              <p>When ordering from MatchMint to be delivered internationally, you may be subject to customs duties and import taxes imposed by your country's customs authority.</p>
              
              <h3>What are Customs Duties and Import Taxes?</h3>
              <p>Customs duties are taxes imposed on goods when they cross international borders. Import taxes are additional fees that may include VAT (Value Added Tax) or GST (Goods and Services Tax) depending on your country.</p>
              
              <h3>Who is Responsible for These Fees?</h3>
              <p>As the recipient of the order, you (the customer) are responsible for paying any customs duties and import taxes. MatchMint is not able to calculate or collect these fees during checkout as they vary by country and are determined by your local customs authority.</p>
            `
          });
        } else if (id === 'production-shipping-delivery-information') {
          setArticle({
            id: 'production-shipping-delivery-information',
            title: 'Production, Shipping & Delivery Information',
            content: `
              <h2>Production Process</h2>
              <p>Each card is carefully crafted to ensure the highest quality. Our production process typically takes 1-2 business days.</p>
              
              <h2>Shipping Options</h2>
              <p>We offer several shipping options to meet your needs:</p>
              <ul>
                <li><strong>Standard Shipping:</strong> 5-7 business days</li>
                <li><strong>Express Shipping:</strong> 2-3 business days</li>
                <li><strong>Priority Shipping:</strong> 1-2 business days</li>
              </ul>
            `
          });
        } else {
          // Generic article not found message
          setArticle({
            id: id || 'unknown',
            title: 'Article Not Found',
            content: '<p>The requested article could not be found. Please check the URL or return to the help center homepage.</p>'
          });
        }
      }
    } catch (error) {
      console.error('Error loading article:', error);
      setArticle({
        id: id || 'error',
        title: 'Error Loading Article',
        content: '<p>There was an error loading this article. Please try again later.</p>'
      });
    } finally {
      setLoading(false);
    }
  }, [id]);
  
  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}
