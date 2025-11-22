# MatchMint Help Center

A modern, responsive help center for MatchMint, built with Next.js and integrated with Shopify.

## Features

- 📱 Fully responsive design
- 🔍 Search functionality
- 📂 Category-based organization
- 📄 Markdown content for easy editing
- 🔗 Related articles
- 👍 Article feedback system
- 🚀 Fast performance with Next.js
- 🎨 Beautiful UI with Tailwind CSS
- 🛒 Seamless Shopify integration

## Getting Started

### Prerequisites

- Node.js 14.6.0 or newer
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create a `.env` file in the root directory with your Shopify credentials:
   ```
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SCOPES=read_products,read_themes
HOST=http://localhost:3000
API_VERSION=2023-10
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the help center.

## Project Structure

```
help-center-app/
├── components/      # React components
├── content/
│   └── articles/    # Markdown files for articles
├── lib/             # Utility functions
├── pages/           # Next.js pages
│   └── articles/    # Article pages
│   └── categories/  # Category pages
├── public/          # Static assets
├── styles/          # CSS styles
└── server.js        # Custom Express server
```

## Adding Content

### Creating a New Article

1. Create a new Markdown file in `content/articles/` with a unique filename (e.g., `new-article.md`).
2. Add frontmatter at the top of the file:

```markdown
---
title: "Article Title"
category: "Category Name"
excerpt: "A brief description of the article"
relatedArticles: ["article-id-1", "article-id-2"]
---

## Main Heading

Your article content goes here...
```

3. Write your article content using Markdown syntax.

## Shopify Integration

This help center is designed to work both as a standalone website and embedded within a Shopify admin panel.

### Standalone Mode

When accessed directly via URL, the help center displays with its own navigation, styling, and full functionality.

### Embedded Mode

When embedded in Shopify admin, the help center detects the Shopify context and adjusts its display accordingly:

- Uses Shopify Polaris UI components
- Adapts to the Shopify admin panel layout
- Maintains consistent styling with the Shopify admin

## Testing

### Testing Standalone Mode

1. Run the development server: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000) in your browser

### Testing Embedded Mode

1. Set up a Shopify Partner account and create a development store
2. Register a custom app in the Shopify Partner dashboard
3. Configure the app with your local development URL
4. Install the app in your development store
5. Access the app through your Shopify admin panel

## Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add the environment variables in the Vercel dashboard
4. Deploy the app

### Option 2: Custom Server

1. Build the project: `npm run build`
2. Start the production server: `npm start`
3. Configure your web server (Nginx, Apache, etc.) to serve the app

## Customization

### Styling

This project uses Tailwind CSS for styling. You can customize the design by:

1. Modifying `tailwind.config.js` to change colors, fonts, etc.
2. Editing global styles in `styles/globals.css`
3. Updating component-specific styles in their respective files

## Support

If you need help with this project, please contact the MatchMint development team.