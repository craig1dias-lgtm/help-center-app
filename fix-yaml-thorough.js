const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'content/articles');
const files = fs.readdirSync(articlesDir);

let fixedCount = 0;

files.forEach(file => {
  if (!file.endsWith('.md')) return;
  
  const filePath = path.join(articlesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the frontmatter section
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.log(`No frontmatter found in ${file}`);
    return;
  }
  
  const frontmatter = frontmatterMatch[1];
  const originalFrontmatter = frontmatterMatch[0];
  
  // Split frontmatter into lines
  const lines = frontmatter.split('\n');
  const newLines = [];
  
  // Process each line
  for (const line of lines) {
    if (line.trim() === '') {
      newLines.push(line);
      continue;
    }
    
    // Extract key and value
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) {
      newLines.push(line);
      continue;
    }
    
    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();
    
    // If value starts with single quote and ends with single quote, replace with double quotes
    if (value.startsWith("'") && value.endsWith("'")) {
      // Replace the outer quotes
      value = '"' + value.substring(1, value.length - 1) + '"';
      
      // Replace any apostrophes with escaped apostrophes
      value = value.replace(/(\w)'(\w)/g, '$1\\\'$2');
    }
    
    newLines.push(`${key}: ${value}`);
  }
  
  // Create the new frontmatter
  const newFrontmatter = `---\n${newLines.join('\n')}\n---`;
  
  // Only update if changes were made
  if (newFrontmatter !== originalFrontmatter) {
    const updatedContent = content.replace(originalFrontmatter, newFrontmatter);
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Fixed: ${file}`);
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} files out of ${files.length} total markdown files.`);
