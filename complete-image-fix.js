const fs = require('fs');

console.log('Corrigindo TODOS os caminhos de imagens...');

// Lê o arquivo de cartas
let content = fs.readFileSync('src/data/cards.ts', 'utf8');

// Substitui TODAS as ocorrências de /lovable-uploads/ para /dungeons-card-arena-game/lovable-uploads/
const originalContent = content;
content = content.replace(/\/lovable-uploads\//g, '/dungeons-card-arena-game/lovable-uploads/');

// Escreve o conteúdo de volta
fs.writeFileSync('src/data/cards.ts', content);

// Conta as mudanças
const changes = (originalContent.match(/\/lovable-uploads\//g) || []).length;
console.log(`Corrigidos ${changes} caminhos de imagens em cards.ts`);

console.log('TODOS os caminhos de imagens foram corrigidos com sucesso!');