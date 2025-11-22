/**
 * Catch-all API handler for Next.js
 * This will handle all API requests at /api/*
 */
export default async function handler(req, res) {
  const { path } = req.query;
  
  // If no path is provided, return 404
  if (!path || path.length === 0) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // The first element in the path array is the API endpoint name
  const endpoint = path[0];
  
  // The rest of the path elements are parameters
  const params = path.slice(1);
  
  // Handle different API endpoints
  switch (endpoint) {
    case 'search':
      return handleSearch(req, res);
    
    case 'feedback':
      return handleFeedback(req, res);
    
    // Add more API endpoints as needed
    
    default:
      return res.status(404).json({ error: `API endpoint '${endpoint}' not found` });
  }
}

/**
 * Handle search API requests
 */
async function handleSearch(req, res) {
  try {
    const { q } = req.query;
    
    // Implement your search logic here
    // This is a placeholder implementation
    const results = [
      { id: '1', title: 'Example search result 1', excerpt: 'This is an example search result.' },
      { id: '2', title: 'Example search result 2', excerpt: 'This is another example search result.' },
    ];
    
    return res.status(200).json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Handle feedback API requests
 */
async function handleFeedback(req, res) {
  try {
    const { articleId, helpful } = req.body;
    
    // Implement your feedback logic here
    // This is a placeholder implementation
    console.log(`Received feedback for article ${articleId}: ${helpful ? 'Helpful' : 'Not helpful'}`);
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Feedback API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
