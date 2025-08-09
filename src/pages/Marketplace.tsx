import { useState } from "react";
import { Card } from "../types/Card";
import { GameCard } from "../components/GameCard";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ShoppingCart, Coins, Star, Sparkles } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Header } from "../components/Header";
import { Navigation } from "../components/Navigation";
import { cn } from "@/lib/utils";
import { allCards } from "../data/cards";

const premiumDecks = [
  {
    id: "premium-angels",
    name: "Deck dos Anjos Celestiais",
    description: "Uma coleção épica de anjos com poderes divinos",
    price: 25.99,
    cards: 15,
    rarity: "Legendary",
    image: "/lovable-uploads/Arcanjo.webp"
  },
  {
    id: "premium-shadows",
    name: "Deck das Sombras",
    description: "Criaturas das trevas com poderes sombrios",
    price: 23.99,
    cards: 15,
    rarity: "Epic",
    image: "/lovable-uploads/Lorde infernal.webp"
  },
  {
    id: "premium-elementals",
    name: "Deck dos Elementais Supremos",
    description: "Mestres dos elementos com poderes devastadores",
    price: 29.99,
    cards: 20,
    rarity: "Legendary",
    image: "/lovable-uploads/Aquamon.webp"
  },
  {
    id: "premium-divine",
    name: "Deck dos Seres Divinos",
    description: "Criaturas celestiais com poderes supremos",
    price: 39.99,
    cards: 25,
    rarity: "Mythical",
    image: "/lovable-uploads/Miguel.jpeg"
  },
  {
    id: "premium-guardians",
    name: "Deck dos Guardiões",
    description: "Protetores ancestrais com defesas impenetráveis",
    price: 32.99,
    cards: 20,
    rarity: "Legendary",
    image: "/lovable-uploads/Sentinela.webp"
  },
  {
    id: "premium-mystics",
    name: "Deck dos Místicos",
    description: "Sábios e videntes com poderes sobrenaturais",
    price: 27.99,
    cards: 18,
    rarity: "Epic",
    image: "/lovable-uploads/Sara.webp"
  }
];

// Use all cards from the game data
const showcaseCards: Card[] = allCards.slice(0, 30); // Show first 30 cards for better performance

export default function Marketplace() {
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [coins, setCoins] = useState(150);
  const { toast } = useToast();

  const handlePurchase = (deck: any) => {
    if (coins >= deck.price) {
      setCoins(prev => prev - deck.price);
      toast({
        title: "Compra Realizada! 🎉",
        description: `Você adquiriu o ${deck.name}! As cartas foram adicionadas à sua coleção.`,
      });
    } else {
      toast({
        title: "Moedas Insuficientes 💰",
        description: "Você não tem moedas suficientes para esta compra.",
        variant: "destructive"
      });
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-amber-600';
      case 'epic': return 'bg-gradient-to-r from-purple-500 to-indigo-600';
      case 'mythical': return 'bg-gradient-to-r from-pink-500 to-rose-600';
      default: return 'bg-gradient-to-r from-blue-500 to-cyan-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <Header />
      <div className="max-w-7xl mx-auto pt-16">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-amber-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              JOKEMPO STORE
            </h1>
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-xl text-slate-300 mb-4">
            Descubra decks épicos e cartas lendárias exclusivas
          </p>
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full px-6 py-3 border border-amber-500/30">
            <Coins className="w-6 h-6 text-amber-400" />
            <span className="text-2xl font-bold text-amber-400">{coins}</span>
            <span className="text-amber-300">Moedas</span>
          </div>
        </div>

        {/* Premium Decks Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Star className="w-8 h-8 text-amber-400" />
            Decks Premium
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumDecks.map((deck) => (
              <div 
                key={deck.id} 
                className={cn(
                  "group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:scale-105",
                  deck.rarity === "Legendary" && "border-yellow-500/50 hover:border-yellow-400 shadow-[0_0_0_2px_rgb(250,204,21,0.3)] hover:shadow-[0_0_20px_rgb(250,204,21,0.4)]",
                  deck.rarity === "Epic" && "border-purple-500/50 hover:border-purple-400 shadow-[0_0_0_2px_rgb(147,51,234,0.3)] hover:shadow-[0_0_20px_rgb(147,51,234,0.4)]",
                  deck.rarity === "Mythical" && "border-violet-500/50 hover:border-violet-400 shadow-[0_0_0_2px_rgb(168,85,247,0.4)] hover:shadow-[0_0_20px_rgb(168,85,247,0.5)]",
                  !["Legendary", "Epic", "Mythical"].includes(deck.rarity) && "border-slate-700/50 hover:border-amber-500/50"
                )}
              >
                {/* Magical Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
                  <div className="absolute top-4 left-4 w-2 h-2 bg-amber-400 rounded-full animate-magical-float"></div>
                  <div className="absolute top-8 right-6 w-1 h-1 bg-yellow-300 rounded-full animate-magical-float" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-amber-300 rounded-full animate-magical-float" style={{animationDelay: '1s'}}></div>
                </div>

                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={deck.image} 
                    alt={deck.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <Badge 
                    className={cn(
                      "absolute top-3 right-3 border-0 font-bold shadow-lg animate-pulse",
                      deck.rarity === "Legendary" && "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black",
                      deck.rarity === "Epic" && "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
                      deck.rarity === "Mythical" && "bg-gradient-to-r from-violet-500 to-purple-500 text-white",
                      !["Legendary", "Epic", "Mythical"].includes(deck.rarity) && getRarityColor(deck.rarity) + " text-white"
                    )}
                  >
                    {deck.rarity}
                  </Badge>
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-1 text-white">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Sparkles className="w-4 h-4 text-white animate-pulse" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 relative">
                  <h3 className={cn(
                    "text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors",
                    deck.rarity === "Legendary" && "text-yellow-400",
                    deck.rarity === "Epic" && "text-purple-400",
                    deck.rarity === "Mythical" && "text-violet-400",
                    !["Legendary", "Epic", "Mythical"].includes(deck.rarity) && "text-white"
                  )}>
                    {deck.name}
                  </h3>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed group-hover:text-slate-200 transition-colors">
                    {deck.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs font-semibold bg-amber-500/10 text-amber-400 border-amber-500/30">
                        {deck.cards} cartas
                      </Badge>
                      <div className="flex items-center gap-1">
                        {[...Array(deck.rarity === "Mythical" ? 5 : deck.rarity === "Legendary" ? 4 : deck.rarity === "Epic" ? 3 : 2)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-amber-500 animate-spin" style={{animationDuration: '3s'}} />
                      <span className="text-lg font-bold text-amber-400">
                        ${deck.price}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handlePurchase(deck)}
                    className={cn(
                      "w-full transition-all duration-300 group-hover:scale-105 font-bold shadow-lg",
                      deck.rarity === "Legendary" && "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black",
                      deck.rarity === "Epic" && "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white",
                      deck.rarity === "Mythical" && "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white animate-pulse",
                      !["Legendary", "Epic", "Mythical"].includes(deck.rarity) && "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black"
                    )}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Comprar Deck
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Cards Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            Pré-visualização das Cartas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {allCards.map((card) => (
              <div key={card.id} className="transform hover:scale-105 transition-all duration-300">
                <GameCard card={card} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-lg">
            ✨ Mais decks e cartas épicas chegando em breve! ✨
          </p>
        </div>
      </div>

      <Navigation />
    </div>
  );
}