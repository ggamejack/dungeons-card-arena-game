#!/bin/bash

# Dungeons® Game Deployment Script

echo "🎮 Dungeons® - Deployment Script"
echo "================================"

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Your game is ready for deployment!"
    echo ""
    echo "📁 Built files are in the 'dist' folder"
    echo ""
    echo "🌐 Deploy options:"
    echo "1. Netlify: Upload the 'dist' folder to netlify.com"
    echo "2. Vercel: Connect your GitHub repo to vercel.com"
    echo "3. GitHub Pages: Push 'dist' contents to gh-pages branch"
    echo "4. Local preview: npm run preview"
    echo ""
    echo "🎯 The game includes:"
    echo "- 99 unique cards (monsters, magic, traps)"
    echo "- Full combat system with mana management"
    echo "- AI opponent"
    echo "- Beautiful responsive UI"
    echo ""
    echo "🎉 Ready to play online!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi