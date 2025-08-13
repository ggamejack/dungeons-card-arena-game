const fs = require('fs');

console.log('🔧 Iniciando correção COMPLETA de todos os caminhos de imagens...');

// Lê o arquivo de cartas
let content = fs.readFileSync('src/data/cards.ts', 'utf8');

// Substitui todas as ocorrências de "/lovable-uploads/ para "/dungeons-card-arena-game/lovable-uploads/
const beforeFix = content.match(/image: "\/lovable-uploads\//g) || [];
console.log(`📊 Encontrados ${beforeFix.length} caminhos para corrigir`);

// Aplica a correção
content = content.replace(/image: "\/lovable-uploads\//g, 'image: "/dungeons-card-arena-game/lovable-uploads/');

// Escreve de volta
fs.writeFileSync('src/data/cards.ts', content);

// Verifica se ainda há caminhos sem correção
const afterFix = content.match(/image: "\/lovable-uploads\//g) || [];
console.log(`✅ Correção concluída! Caminhos restantes: ${afterFix.length}`);
console.log(`🎯 Total de caminhos corrigidos: ${beforeFix.length - afterFix.length}`);

if (afterFix.length === 0) {
  console.log('🎉 SUCESSO! Todas as imagens agora têm caminhos corretos!');
} else {
  console.log('⚠️  Ainda há alguns caminhos que precisam de correção manual.');
}