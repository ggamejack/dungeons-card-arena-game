const fs = require('fs');
const path = require('path');

// Read the cards file
const cardsPath = path.join(__dirname, 'src/data/cards.ts');
let content = fs.readFileSync(cardsPath, 'utf8');

// Replace all /lovable-uploads/ with /dungeons-card-arena-game/lovable-uploads/
content = content.replace(/\/lovable-uploads\//g, '/dungeons-card-arena-game/lovable-uploads/');

// Write back
fs.writeFileSync(cardsPath, content);

// Also fix marketplace
const marketplacePath = path.join(__dirname, 'src/pages/Marketplace.tsx');
let marketplaceContent = fs.readFileSync(marketplacePath, 'utf8');
marketplaceContent = marketplaceContent.replace(/\/lovable-uploads\//g, '/dungeons-card-arena-game/lovable-uploads/');
fs.writeFileSync(marketplacePath, marketplaceContent);

console.log('Image paths fixed!');