const fs = require('fs');

// Read the cards file
const content = fs.readFileSync('src/data/cards.ts', 'utf8');

// Replace all remaining /lovable-uploads/ with /dungeons-card-arena-game/lovable-uploads/
const fixedContent = content.replace(/\/lovable-uploads\//g, '/dungeons-card-arena-game/lovable-uploads/');

// Write back the fixed content
fs.writeFileSync('src/data/cards.ts', fixedContent);

console.log('Fixed all image paths in cards.ts');