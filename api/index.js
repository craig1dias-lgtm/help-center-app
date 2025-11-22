// Serverless entry point
const express = require('express');
// We'll use a try/catch for the Shopify import since it might not be available in all environments
let Shopify;
try {
  Shopify = require('@shopify/shopify-api');
} catch (error) {
  console.warn('Shopify API module not available:', error.message);
  // Create a placeholder to prevent crashes
  Shopify = { Context: { API_KEY: null } };
}

// Set up environment variables with default values
const API_KEY = process.env.SHOPIFY_API_KEY || 'MISSING_API_KEY';
const API_SECRET = process.env.SHOPIFY_API_SECRET || 'MISSING_API_SECRET';
const SCOPES = (process.env.SCOPES || 'read_products,read_themes').split(',');
const HOST = process.env.HOST || 'https://help-center-app-three.vercel.app';
const API_VERSION = process.env.API_VERSION || '2023-10';
const HOST_NAME = HOST.replace(/https:\/\//, "");

// Initialize Express app
const app = express();

// Basic routes
app.get('/', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>MatchMint Help Center</title>
        <style>
          body { 
            font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
          }
          h1 { color: #ec4899; }
          .card {
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            background: white;
            margin-top: 20px;
          }
          .button {
            display: inline-block;
            background: #ec4899;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            text-decoration: none;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <h1>MatchMint Help Center</h1>
        <div class="card">
          <p>Welcome to the MatchMint Help Center. This application integrates with Shopify to provide support for custom sports card customization.</p>
          <p>To get started with the Shopify integration, visit the authentication endpoint.</p>
          <a href="/api/auth?shop=matchmint-help-center-test.myshopify.com" class="button">
            Authenticate with Shopify
          </a>
        </div>
        <div class="card">
          <h2>Environment Status</h2>
          <p>API Key: ${API_KEY.substring(0, 4)}...${API_KEY.substring(API_KEY.length - 4)}</p>
          <p>Host: ${HOST}</p>
          <p>API Version: ${API_VERSION}</p>
        </div>
        <div class="card">
          <h2>Help Center Content</h2>
          <p>The actual help center content is hosted at:</p>
          <a href="${process.env.NEXT_PUBLIC_HELP_CENTER_URL || 'https://help-center-nextjs.vercel.app'}" target="_blank" class="button">
            View Help Center Content
          </a>
        </div>
      </body>
    </html>
  `);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: process.env.NODE_ENV,
    shopifyApiInitialized: Shopify && !!Shopify.Context.API_KEY,
    apiKeyPresent: !!process.env.SHOPIFY_API_KEY,
    apiSecretPresent: !!process.env.SHOPIFY_API_SECRET
  });
});

// Simplified auth endpoint (placeholder)
app.get('/api/auth', (req, res) => {
  const shop = req.query.shop;
  
  if (!shop) {
    return res.status(400).send("Missing shop parameter");
  }

  // Instead of actual Shopify auth, just return info
  res.status(200).json({
    message: "Auth would happen here",
    shop,
    environment: process.env.NODE_ENV,
    apiKey: API_KEY ? `${API_KEY.substring(0, 4)}...${API_KEY.substring(API_KEY.length - 4)}` : 'Not set'
  });
});

// Simplified auth callback (placeholder)
app.get('/api/auth/callback', (req, res) => {
  res.redirect(`/?shop=${req.query.shop || 'unknown'}&auth=simulated`);
});

// Export serverless handler
module.exports = app;
