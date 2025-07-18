# Dungeons® - Deployment Guide

## Game Features

✅ **Fully Playable Card Game** with:
- 99 unique cards (monsters, magic, traps)
- Monster vs Monster combat system
- Mana system (starts at 3, increases by 1 each turn, max 10)
- Direct attacks when opponent field is empty
- Magic cards with damage effects
- Trap cards (basic implementation)
- AI opponent with strategic card playing
- Win/lose conditions
- Beautiful UI with animations
- Responsive design

## Quick Deploy Options

### Option 1: Netlify (Recommended)
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Your game will be live instantly!

### Option 2: Vercel
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

### Option 3: GitHub Pages
1. Build: `npm run build`
2. Push `dist` contents to `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Option 4: Local Server
```bash
npm run build
npm run preview
```

## Game Instructions

### How to Play:
1. **Draw Phase**: Draw a card from your deck
2. **Main Phase**: Play monster cards (costs mana)
3. **Battle Phase**: Select your monsters to attack
   - Click on your monster to select it (yellow border)
   - Click on enemy monster to attack it
   - If no enemy monsters, click "Direct Attack" button
4. **End Turn**: Pass turn to opponent

### Combat Rules:
- **Monster vs Monster**: Compare Attack vs Defense
- **Direct Attack**: When opponent has no monsters
- **Mana System**: Start with 3, gain 1 per turn (max 10)
- **Victory**: Reduce opponent's HP to 0

### Card Types:
- **Monsters**: Can attack and defend
- **Magic**: Instant damage spells
- **Traps**: Defensive/counter cards

## Technical Details

- **Framework**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Cards**: 99 unique cards with balanced stats
- **AI**: Smart opponent that plays strategically
- **Responsive**: Works on desktop and mobile

## Live Demo

The game is ready for deployment! Simply build and upload to any static hosting service.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Game Balance

- **Legendary Cards**: 4 powerful cards (3000 ATK/DEF)
- **Epic Cards**: High-tier cards (2000-2800 stats)
- **Rare Cards**: Mid-tier cards (1500-2000 stats)
- **Common/Uncommon**: Early game cards (300-1500 stats)
- **Mana Costs**: Balanced from 1-8 mana
- **Deck Size**: 20 cards per player
- **Hand Size**: 5 cards starting hand

The game is fully playable and ready for online deployment! 🎮✨