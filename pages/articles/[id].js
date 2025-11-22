import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ArticleLayout from '../../components/ArticleLayout';
import { getAllArticleIds, getArticleData, getRelatedArticles, getArticlesByCategory } from '../../lib/articles';

export default function Article({ article, relatedArticles, categoryArticles, allCategories }) {
  const router = useRouter();
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);
  
  // Extract category ID from the article's category
  const categoryId = article.category ? article.category.toLowerCase().replace(/\s+/g, '-') : null;
  
  // Show loading state while article is being fetched
  if (router.isFallback) {
    return (
      <ArticleLayout title="Loading..." categoryId="general-information">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p>Loading article...</p>
        </div>
      </ArticleLayout>
    );
  }

  return (
    <ArticleLayout 
      title={article.title} 
      description={article.excerpt || ''} 
      currentArticleId={article.id}
      categoryId={categoryId}
      sidebarArticles={categoryArticles}
      allCategories={allCategories}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{article.title}</h1>
      
      <div 
        className="article-content prose max-w-none text-base"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }} 
      />
      
      {/* Article Feedback */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Was this article helpful?</h3>
          {feedbackSubmitted ? (
            <div className="bg-blue-50 text-blue-700 p-4 rounded-lg inline-block">
              <p>Thank you for your feedback!</p>
              {feedbackType === 'helpful' ? (
                <p className="text-sm mt-2">We're glad this article was helpful.</p>
              ) : (
                <p className="text-sm mt-2">We'll use your feedback to improve our content.</p>
              )}
            </div>
          ) : (
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setFeedbackType('helpful');
                  setFeedbackSubmitted(true);
                  // In a real implementation, you would send this feedback to your backend
                  console.log('Article was helpful:', article.id);
                }}
                className="px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors"
              >
                <span role="img" aria-label="thumbs up" className="mr-2">👍</span>
                Yes, it helped
              </button>
              <button
                onClick={() => {
                  setFeedbackType('not-helpful');
                  setFeedbackSubmitted(true);
                  // In a real implementation, you would send this feedback to your backend
                  console.log('Article was not helpful:', article.id);
                }}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
              >
                <span role="img" aria-label="thumbs down" className="mr-2">👎</span>
                No, I need more help
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Articles */}
      {relatedArticles && relatedArticles.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-800">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((article) => (
              <Link 
                href={`/articles/${article.id}`} 
                key={article.id}
                className="group"
              >
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-5">
                  <h3 className="font-medium text-primary-600 group-hover:text-primary-700 text-lg mb-2">{article.title}</h3>
                  {article.excerpt && (
                    <p className="text-gray-600 line-clamp-2">{article.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </ArticleLayout>
  );
}

export async function getStaticPaths() {
  const paths = getAllArticleIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  try {
    const article = await getArticleData(params.id);
    
    // Get related articles
    const relatedArticles = article.relatedArticles 
      ? getRelatedArticles(article.id, article.relatedArticles)
      : [];
    
    // Get category articles for the sidebar
    const categoryId = article.category ? article.category.toLowerCase().replace(/\s+/g, '-') : null;
    const categories = getArticlesByCategory();
    const categoryArticles = categoryId && categories[categoryId] 
      ? categories[categoryId].articles 
      : [];
    
    return {
      props: {
        article,
        relatedArticles,
        categoryArticles,
        allCategories: categories,
      },
    };
  } catch (error) {
    console.error(`Error fetching article ${params.id}:`, error);
    return {
      notFound: true,
    };
  }
}