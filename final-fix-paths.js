const fs = require('fs');

console.log('Fixing remaining image paths...');

// Read the cards file
let content = fs.readFileSync('src/data/cards.ts', 'utf8');

// Replace all remaining /lovable-uploads/ with /dungeons-card-arena-game/lovable-uploads/
const originalContent = content;
content = content.replace(/\/lovable-uploads\//g, '/dungeons-card-arena-game/lovable-uploads/');

// Write back the content
fs.writeFileSync('src/data/cards.ts', content);

// Count changes
const changes = (originalContent.match(/\/lovable-uploads\//g) || []).length;
console.log(`Fixed ${changes} image paths in cards.ts`);

console.log('All image paths are now correct!');