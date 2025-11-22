const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'content/articles');
const files = fs.readdirSync(articlesDir);

let fixedCount = 0;

files.forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(articlesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return;
  
  const frontmatter = frontmatterMatch[1];
  const originalFrontmatter = frontmatterMatch[0];
  
  // Replace single quotes with double quotes in frontmatter fields
  let updatedFrontmatter = frontmatter
    .replace(/title: '([^']*)'/g, 'title: "$1"')
    .replace(/date: '([^']*)'/g, 'date: "$1"')
    .replace(/category: '([^']*)'/g, 'category: "$1"')
    .replace(/excerpt: '([^']*)'/g, 'excerpt: "$1"')
    .replace(/keywords: '([^']*)'/g, 'keywords: "$1"');
  
  // Handle any remaining apostrophes in the content
  updatedFrontmatter = updatedFrontmatter.replace(/(\w)'(\w)/g, '$1\'$2');
  
  // Create the new frontmatter block
  const newFrontmatter = `---\n${updatedFrontmatter}\n---`;
  
  // Only update if changes were made
  if (newFrontmatter !== originalFrontmatter) {
    const updatedContent = content.replace(originalFrontmatter, newFrontmatter);
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Fixed: ${file}`);
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} files out of ${files.length} total markdown files.`);
