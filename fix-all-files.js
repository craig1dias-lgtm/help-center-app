const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'content/articles');
const files = fs.readdirSync(articlesDir);

let processedCount = 0;

files.forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(articlesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the frontmatter section
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const frontmatterMatch = content.match(frontmatterRegex);
  
  if (!frontmatterMatch) {
    console.log(`No frontmatter found in ${file}`);
    return;
  }
  
  // Extract the frontmatter content
  const frontmatterContent = frontmatterMatch[1];
  
  // Create a new frontmatter with double quotes
  const newFrontmatterContent = frontmatterContent
    .replace(/title: '([^']*)'/g, 'title: "$1"')
    .replace(/date: '([^']*)'/g, 'date: "$1"')
    .replace(/category: '([^']*)'/g, 'category: "$2"')
    .replace(/excerpt: '([^']*)'/g, 'excerpt: "$1"')
    .replace(/keywords: '([^']*)'/g, 'keywords: "$1"');
  
  // Replace the frontmatter in the content
  const newContent = content.replace(frontmatterRegex, `---\n${newFrontmatterContent}\n---`);
  
  // Write the new content to the file
  fs.writeFileSync(filePath, newContent, 'utf8');
  
  console.log(`Processed: ${file}`);
  processedCount++;
});

console.log(`\nProcessed ${processedCount} files out of ${files.length} total markdown files.`);
