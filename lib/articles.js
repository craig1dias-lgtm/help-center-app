import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export function getSortedArticlesData() {
  // Get file names under /articles
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data),
      content: matterResult.content,
    };
  });

  // Sort articles by date
  return allArticlesData.sort((a, b) => {
    if (a.date && b.date) {
      return a.date < b.date ? 1 : -1;
    }
    return a.title > b.title ? 1 : -1;
  });
}

export function getAllArticleIds() {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getArticleData(id) {
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the article metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    content: matterResult.content,
    ...(matterResult.data),
  };
}

export function getArticlesByCategory() {
  const allArticles = getSortedArticlesData();
  const categories = {
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

  // Group articles by category
  allArticles.forEach(article => {
    const categoryId = article.category?.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
    if (categoryId && categories[categoryId]) {
      categories[categoryId].articles.push(article);
    } else if (categoryId) {
      categories[categoryId] = {
        id: categoryId,
        title: article.category,
        description: `Articles related to ${article.category}`,
        icon: '📄',
        articles: [article]
      };
    }
  });

  return categories;
}

export function getAllCategories() {
  const categoriesMap = getArticlesByCategory();
  return Object.values(categoriesMap);
}

export function getCategoryData(categoryId) {
  const categories = getArticlesByCategory();
  return categories[categoryId] || null;
}

export function getRelatedArticles(articleId, relatedIds) {
  const allArticles = getSortedArticlesData();
  return allArticles.filter(article => relatedIds.includes(article.id) && article.id !== articleId);
}
