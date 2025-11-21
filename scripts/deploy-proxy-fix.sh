#!/bin/bash

# Deployment script for proxy link fixes
# This script builds and deploys the help center app with the proxy link fixes

# Exit on error
set -e

echo "📦 Building help center app with proxy link fixes..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build the app
echo "Building the app..."
npm run build

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "🔍 Testing instructions:"
echo "1. Test in direct Vercel environment: visit your Vercel URL"
echo "2. Test in Shopify proxy environment: visit your app in Shopify"
echo "3. Run the test script in both environments by pasting this in the browser console:"
echo "   fetch('/scripts/test-proxy-links.js').then(r => r.text()).then(t => eval(t))"
echo ""
echo "If you encounter any issues, refer to PROXY_APP_LINK_CONFIGURATION.md"
