import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// This is a placeholder component - replace with your actual article page implementation
export default function ArticlePage({ id }) {
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching article data
    setLoading(true);
    
    // This is where you would normally fetch the article data from your API
    // For now, we'll use a placeholder
    setTimeout(() => {
      if (id === 'getting-started') {
        setArticle({
          id: 'getting-started',
          title: 'Getting Started with MatchMint Football Cards',
          content: `
            <h2>Welcome to MatchMint!</h2>
            <p>This guide will help you create your perfect custom football card in just a few simple steps.</p>
            
            <h3>Step 1: Choose Your Card Design</h3>
            <p>Start by selecting the card design that best matches your style. We offer various options including Team of the Year, Icons, and more.</p>
            
            <h3>Step 2: Upload Your Photo</h3>
            <p>Upload a high-quality photo of yourself or the person you're creating the card for. Make sure it has good lighting and a clear view of the face.</p>
            
            <h3>Step 3: Customize Your Card</h3>
            <p>Add the player name, position, and customize the attributes to create your perfect FIFA card.</p>
            
            <h3>Step 4: Review and Order</h3>
            <p>Review your design, make any final adjustments, and place your order. We'll take care of the rest!</p>
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
            
            <h2>Tracking Your Order</h2>
            <p>Once your order ships, you'll receive a tracking number via email that allows you to monitor your delivery progress.</p>
            
            <h2>International Shipping</h2>
            <p>We ship worldwide! International orders typically take 7-14 business days to arrive, depending on the destination country.</p>
          `
        });
      } else if (id === 'image-guidelines') {
        setArticle({
          id: 'image-guidelines',
          title: 'Image Guidelines for Perfect Football Cards',
          content: `
            <h2>Photo Requirements</h2>
            <p>To create the best possible football card, please follow these guidelines for your uploaded photo:</p>
            
            <h3>Resolution</h3>
            <p>Use a high-resolution image, ideally at least 1000x1000 pixels. Higher resolution images produce better quality cards.</p>
            
            <h3>Lighting</h3>
            <p>Good lighting is crucial. Natural daylight works best, avoiding harsh shadows on the face.</p>
            
            <h3>Background</h3>
            <p>A simple, uncluttered background works best. Our system can remove backgrounds, but starting with a clean background improves results.</p>
            
            <h3>Pose</h3>
            <p>A straight-on or slightly angled pose works best, similar to professional footballer photos on official cards.</p>
            
            <h3>File Format</h3>
            <p>We accept JPG, PNG, and HEIC formats. Maximum file size is 10MB.</p>
          `
        });
      } else {
        setArticle({
          id: id || 'unknown',
          title: 'Article Not Found',
          content: '<p>The requested article could not be found.</p>'
        });
      }
      
      setLoading(false);
    }, 500);
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
