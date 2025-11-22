import React, { useState } from 'react';

const ArticleFeedback = ({ articleId }) => {
  const [feedback, setFeedback] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = async (isHelpful) => {
    setFeedback(isHelpful);
    setSubmitted(true);
    
    // In a real implementation, you would send this to your API
    // For now, we'll just log it
    console.log(`Article ${articleId} feedback: ${isHelpful ? 'Helpful' : 'Not helpful'}`);
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      {!submitted ? (
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Was this article helpful?</h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleFeedback(true)}
              className="px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors"
            >
              <span role="img" aria-label="thumbs up" className="mr-2">👍</span>
              Yes, it helped
            </button>
            <button
              onClick={() => handleFeedback(false)}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
            >
              <span role="img" aria-label="thumbs down" className="mr-2">👎</span>
              No, I need more help
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg">
            {feedback 
              ? "Thank you for your feedback! We're glad this article was helpful." 
              : "Thank you for your feedback. We'll work on improving this article."}
          </p>
          {!feedback && (
            <p className="mt-2">
              <a href="/contact" className="text-primary-600 hover:underline">
                Contact our support team
              </a>{" "}
              for additional help.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleFeedback;
