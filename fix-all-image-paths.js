const fs = require('fs');
const path = require('path');

// Function to fix image paths in a file
function fixImagePaths(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace all /lovable-uploads/ with /dungeons-card-arena-game/lovable-uploads/
  const originalContent = content;
  content = content.replace(/\/lovable-uploads\//g, '/dungeons-card-arena-game/lovable-uploads/');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed image paths in: ${filePath}`);
  } else {
    console.log(`No changes needed in: ${filePath}`);
  }
}

// Files to fix
const filesToFix = [
  'src/data/cards.ts',
  'src/data/cards-backup.ts',
  'src/pages/Marketplace.tsx'
];

console.log('Fixing image paths...');
filesToFix.forEach(fixImagePaths);
console.log('All image paths fixed!');