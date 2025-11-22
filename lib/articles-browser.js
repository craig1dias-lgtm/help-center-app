// Browser-compatible version of articles.js with hardcoded data
// This avoids using Node.js-specific modules like fs and path

// Hardcoded article data for client-side rendering
const articlesData = [
  {
    id: 'production-shipping-delivery-information',
    title: 'Production, Shipping & Delivery Information',
    category: 'Delivery',
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
  },
  {
    id: 'customs-import-fees',
    title: 'Customs & Import Fees | International Shipping Guide',
    category: 'Delivery',
    content: `
      <h2>Understanding Customs & Import Fees</h2>
      <p>When ordering from MatchMint to be delivered internationally, you may be subject to customs duties and import taxes imposed by your country's customs authority.</p>
      
      <h3>What are Customs Duties and Import Taxes?</h3>
      <p>Customs duties are taxes imposed on goods when they cross international borders. Import taxes are additional fees that may include VAT (Value Added Tax) or GST (Goods and Services Tax) depending on your country.</p>
      
      <h3>Who is Responsible for These Fees?</h3>
      <p>As the recipient of the order, you (the customer) are responsible for paying any customs duties and import taxes. MatchMint is not able to calculate or collect these fees during checkout as they vary by country and are determined by your local customs authority.</p>
      
      <h3>When and How Do I Pay These Fees?</h3>
      <p>Typically, the shipping carrier (such as DHL, FedEx, or your local postal service) will contact you when your package arrives in your country. They will provide instructions on how to pay any applicable duties and taxes before your package can be delivered.</p>
    `
  },
  {
    id: 'tracking-delivery',
    title: 'How do I track my MatchMint delivery?',
    category: 'Delivery',
    content: `
      <h2>Tracking Your MatchMint Delivery</h2>
      <p>Once your order ships, you'll receive an email with tracking information. Here's how to track your delivery:</p>
      
      <h3>Step 1: Find Your Tracking Number</h3>
      <p>Your tracking number can be found in:</p>
      <ul>
        <li>The shipping confirmation email</li>
        <li>Your account order history</li>
        <li>The order confirmation page</li>
      </ul>
      
      <h3>Step 2: Use the Carrier's Website</h3>
      <p>We ship primarily with USPS, FedEx, and DHL. Visit the carrier's website and enter your tracking number in their tracking tool.</p>
      
      <h3>Step 3: Check for Updates</h3>
      <p>Tracking information is typically updated once per day. International shipments may update less frequently.</p>
    `
  },
  {
    id: 'find-tracking-number',
    title: 'How do I find my tracking number?',
    category: 'Delivery',
    content: `
      <h2>Finding Your Tracking Number</h2>
      <p>Your tracking number is available in several places:</p>
      
      <h3>In Your Email</h3>
      <p>Check your inbox for an email with the subject "Your MatchMint Order Has Shipped". The tracking number will be prominently displayed in this email.</p>
      
      <h3>In Your Account</h3>
      <p>Log in to your MatchMint account and navigate to Order History. Select your order and look for the tracking information.</p>
      
      <h3>Contact Support</h3>
      <p>If you can't find your tracking number, contact our support team at support@matchmint.com with your order number.</p>
    `
  },
  {
    id: 'tracking-not-updating',
    title: 'My tracking information is not updating',
    category: 'Delivery',
    content: `
      <h2>Why Isn't My Tracking Information Updating?</h2>
      <p>There are several reasons why tracking information might not update:</p>
      
      <h3>Normal Delays</h3>
      <p>Tracking systems typically update once per day. During busy periods, updates may be delayed by 24-48 hours.</p>
      
      <h3>In Transit Between Facilities</h3>
      <p>When packages are in transit between sorting facilities, tracking may not update until they arrive at the next facility.</p>
      
      <h3>International Shipping</h3>
      <p>International shipments may experience longer periods without updates, especially when going through customs.</p>
      
      <h3>What to Do</h3>
      <p>If your tracking hasn't updated for more than 3 business days, please contact our support team.</p>
    `
  },
  {
    id: 'change-delivery-address',
    title: 'I need to change my delivery address',
    category: 'Delivery',
    content: `
      <h2>Changing Your Delivery Address</h2>
      
      <h3>Before Shipping</h3>
      <p>If your order hasn't shipped yet:</p>
      <ol>
        <li>Contact our support team immediately at support@matchmint.com</li>
        <li>Include your order number and the new address</li>
        <li>We'll update your address if the order hasn't been processed</li>
      </ol>
      
      <h3>After Shipping</h3>
      <p>If your order has already shipped:</p>
      <ol>
        <li>Contact the shipping carrier directly with your tracking number</li>
        <li>Some carriers allow address changes for a fee</li>
        <li>If the carrier can't change the address, the package may be returned to us</li>
      </ol>
    `
  },
  {
    id: 'package-returned',
    title: 'My package was returned to MatchMint',
    category: 'Delivery',
    content: `
      <h2>What to Do If Your Package Was Returned</h2>
      
      <h3>Why Packages Get Returned</h3>
      <p>Packages may be returned to us for several reasons:</p>
      <ul>
        <li>Incorrect or incomplete address</li>
        <li>No one available to receive the package (for signature-required deliveries)</li>
        <li>Customs issues for international shipments</li>
        <li>Delivery attempts exceeded</li>
      </ul>
      
      <h3>Our Process for Returned Packages</h3>
      <ol>
        <li>We'll email you when we receive the returned package</li>
        <li>You can choose to have it reshipped to a corrected address</li>
        <li>A reshipping fee may apply depending on the reason for return</li>
      </ol>
    `
  },
  {
    id: 'label-created-no-updates',
    title: 'Why do I only see a label created without updates?',
    category: 'Delivery',
    content: `
      <h2>Understanding "Label Created" Status</h2>
      
      <h3>What "Label Created" Means</h3>
      <p>When you see "Label Created" or "Shipping Information Received" as your tracking status, it means:</p>
      <ul>
        <li>We've generated a shipping label for your order</li>
        <li>The package has not yet been handed over to the shipping carrier</li>
        <li>The carrier's system knows about your package but hasn't received it</li>
      </ul>
      
      <h3>Common Reasons for Delays</h3>
      <p>There may be several reasons why your tracking hasn't updated beyond "Label Created":</p>
      <ul>
        <li>We're still processing and packaging your order</li>
        <li>The carrier has picked up the package but hasn't scanned it yet</li>
        <li>There was a batch pickup and your package will be scanned at the sorting facility</li>
      </ul>
      
      <h3>When to Contact Us</h3>
      <p>If your tracking status has remained at "Label Created" for more than 3 business days, please contact our support team.</p>
    `
  },
  // Add more articles as needed
];

// Categories data
const categoriesData = {
  'general-information': {
    id: 'general-information',
    title: 'General Information',
    description: 'Find answers to general questions about our products, services, and policies.',
    icon: 'ℹ️',
    articles: []
  },
  'delivery': {
    id: 'delivery',
    title: 'Delivery',
    description: 'Information about shipping, tracking, and delivery of your orders.',
    icon: '🚚',
    articles: []
  },
  'order-processing': {
    id: 'order-processing',
    title: 'Order Processing',
    description: 'Learn about our order processing times and requirements.',
    icon: '⏱️',
    articles: []
  },
  'orders': {
    id: 'orders',
    title: 'Orders',
    description: 'Information about managing your orders, changes, and issues.',
    icon: '📋',
    articles: []
  },
  'tracking': {
    id: 'tracking',
    title: 'Tracking & Shipping',
    description: 'Help with tracking your order and understanding shipping statuses.',
    icon: '📦',
    articles: []
  },
  'payments': {
    id: 'payments',
    title: 'Payments',
    description: 'Information about payment methods, currencies, and payment-related questions.',
    icon: '💳',
    articles: []
  },
  'returns-refunds': {
    id: 'returns-refunds',
    title: 'Returns & Refunds',
    description: 'Information about our return policy and refund process.',
    icon: '↩️',
    articles: []
  },
  'technical': {
    id: 'technical',
    title: 'Technical Support',
    description: 'Help with technical issues, website problems, and account management.',
    icon: '🔧',
    articles: []
  }
};

// Populate categories with articles
articlesData.forEach(article => {
  const categoryId = article.category?.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
  if (categoryId && categoriesData[categoryId]) {
    categoriesData[categoryId].articles.push(article);
  }
});

// Export functions that mimic the original articles.js API
export function getSortedArticlesData() {
  return articlesData.sort((a, b) => {
    if (a.date && b.date) {
      return a.date < b.date ? 1 : -1;
    }
    return a.title > b.title ? 1 : -1;
  });
}

export function getArticlesByCategory() {
  return categoriesData;
}

export function getAllCategories() {
  return Object.values(categoriesData);
}

export function getCategoryData(categoryId) {
  return categoriesData[categoryId] || null;
}

export function getRelatedArticles(articleId, relatedIds) {
  return articlesData.filter(article => relatedIds?.includes(article.id) && article.id !== articleId);
}
