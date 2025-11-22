require('dotenv').config();
const express = require('express');
const next = require('next');
const { Shopify } = require('@shopify/shopify-api');
const cors = require('cors');
const crypto = require('crypto'); // Added for App Proxy verification

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Check if all required environment variables are set
const requiredEnvVars = ['SHOPIFY_API_KEY', 'SHOPIFY_API_SECRET', 'SCOPES', 'HOST', 'API_VERSION'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  console.error('Please set these variables in your Vercel project settings.');
  
  // Set default values for development
  if (!process.env.SHOPIFY_API_KEY) process.env.SHOPIFY_API_KEY = 'MISSING_API_KEY';
  if (!process.env.SHOPIFY_API_SECRET) process.env.SHOPIFY_API_SECRET = 'MISSING_API_SECRET';
  if (!process.env.SCOPES) process.env.SCOPES = 'read_products,read_themes';
  if (!process.env.HOST) process.env.HOST = 'https://help-center-app-three.vercel.app';
  if (!process.env.API_VERSION) process.env.API_VERSION = '2023-10';
}

// Initialize Shopify API
try {
  Shopify.Context.initialize({
    API_KEY: process.env.SHOPIFY_API_KEY,
    API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
    SCOPES: process.env.SCOPES.split(","),
    HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
    API_VERSION: process.env.API_VERSION,
    IS_EMBEDDED_APP: true,
    SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
  });
  console.log('Shopify API initialized successfully');
} catch (error) {
  console.error('Failed to initialize Shopify API:', error);
}

app.prepare().then(() => {
  const server = express();
  
  // Enable CORS for all routes
  server.use(cors());
  
  // Parse JSON request body
  server.use(express.json());

  // No longer need to detect if request is from Shopify proxy
  // since we're using a dedicated subdomain

  // Set up Shopify authentication and webhook handling
  server.get("/auth", async (req, res) => {
    const shop = req.query.shop;
    
    if (!shop) {
      return res.status(400).send("Missing shop parameter");
    }

    const authRoute = await Shopify.Auth.beginAuth(
      req,
      res,
      shop,
      '/auth/callback',
      false,
    );

    res.redirect(authRoute);
  });

  server.get('/auth/callback', async (req, res) => {
    try {
      const session = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query
      );
      
      // Redirect to app with shop parameter
      res.redirect(`/?shop=${session.shop}`);
    } catch (e) {
      console.error("Error during auth callback:", e);
      res.status(500).send("Error during auth callback");
    }
  });

  // Add a health check endpoint
  server.get('/api/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      environment: process.env.NODE_ENV,
      shopifyApiInitialized: !!Shopify.Context.API_KEY
    });
  });

  // Route to display environment setup status
  server.get('/api/config-check', (req, res) => {
    const envStatus = {
      SHOPIFY_API_KEY: !!process.env.SHOPIFY_API_KEY,
      SHOPIFY_API_SECRET: !!process.env.SHOPIFY_API_SECRET,
      SCOPES: process.env.SCOPES || 'not set',
      HOST: process.env.HOST || 'not set',
      API_VERSION: process.env.API_VERSION || 'not set',
      NODE_ENV: process.env.NODE_ENV || 'not set'
    };
    
    res.status(200).json({
      message: 'Environment variable status',
      environmentVariables: envStatus,
      shopifyInitialized: !!Shopify.Context.API_KEY
    });
  });
  
  // API endpoint for context information
  server.get('/api/context', (req, res) => {
    res.status(200).json({
      host: req.get('host'),
      referrer: req.get('referrer')
    });
  });

  // All other routes go to Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
