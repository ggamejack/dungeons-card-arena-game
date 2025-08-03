import { useState } from "react";
import { Card } from "../types/Card";
import { GameCard } from "../components/GameCard";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ShoppingCart, Coins, Star, Sparkles } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Navigation } from "../components/Navigation";

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

const showcaseCards: Card[] = [
  {
    id: 4001,
    name: "Arcanjo Supremo",
    type: "monster",
    element: "holy",
    attack: 4000,
    defense: 3500,
    level: 12,
    description: "O mais poderoso dos arcanjos, mensageiro divino supremo.",
    image: "/lovable-uploads/Arcanjo.webp",
    rarity: "legendary",
    cost: 12
  },
  {
    id: 4002,
    name: "Miguel Arcanjo",
    type: "monster",
    element: "holy",
    attack: 4500,
    defense: 4000,
    level: 12,
    description: "O mais poderoso guerreiro celestial, líder dos exércitos divinos.",
    image: "/lovable-uploads/Miguel.jpeg",
    rarity: "legendary",
    cost: 12
  },
  {
    id: 4003,
    name: "Lorde Infernal",
    type: "monster",
    element: "shadow",
    attack: 4200,
    defense: 2800,
    level: 12,
    description: "Senhor supremo dos infernos com poder sobre as trevas.",
    image: "/lovable-uploads/Lorde infernal.webp",
    rarity: "legendary",
    cost: 12
  },
  {
    id: 4004,
    name: "Aquamon",
    type: "monster",
    element: "ice",
    attack: 3500,
    defense: 2800,
    level: 10,
    description: "Senhor dos oceanos profundos com poderes aquáticos divinos.",
    image: "/lovable-uploads/Aquamon.webp",
    rarity: "legendary",
    cost: 10
  },
  {
    id: 4005,
    name: "Fênix Ardente",
    type: "monster",
    element: "fire",
    attack: 3800,
    defense: 3000,
    level: 11,
    description: "Ave lendária das chamas eternas que renasce das cinzas.",
    image: "/lovable-uploads/Fenix ardente.webp",
    rarity: "legendary",
    cost: 11
  },
  {
    id: 4006,
    name: "Athena, Deusa da Sabedoria",
    type: "monster",
    element: "holy",
    attack: 4000,
    defense: 3600,
    level: 11,
    description: "Divindade da estratégia e conhecimento, protetora dos heróis.",
    image: "/lovable-uploads/athena.webp",
    rarity: "legendary",
    cost: 11
  },
  {
    id: 4007,
    name: "Terra Colossos",
    type: "monster",
    element: "earth",
    attack: 4200,
    defense: 4800,
    level: 12,
    description: "Gigante primordial feito da própria essência da terra.",
    image: "/lovable-uploads/terra colosos.webp",
    rarity: "legendary",
    cost: 12
  },
  {
    id: 4008,
    name: "Lucifer, o Anjo Caído",
    type: "monster",
    element: "shadow",
    attack: 5000,
    defense: 4000,
    level: 12,
    description: "O mais poderoso dos anjos caídos, mestre das trevas supremas.",
    image: "/lovable-uploads/lucifer.webp",
    rarity: "legendary",
    cost: 12
  },
  {
    id: 4009,
    name: "Águia Trovão",
    type: "monster",
    element: "lightning",
    attack: 3600,
    defense: 2800,
    level: 10,
    description: "Majestosa ave dos céus que comanda os trovões e relâmpagos.",
    image: "/lovable-uploads/Águia trovão.webp",
    rarity: "legendary",
    cost: 10
  },
  {
    id: 4010,
    name: "Executor das Sombras",
    type: "monster",
    element: "shadow",
    attack: 3600,
    defense: 2800,
    level: 10,
    description: "Carrasco implacável que serve às forças das trevas.",
    image: "/lovable-uploads/executor.webp",
    rarity: "legendary",
    cost: 10
  }
];

export default function Marketplace() {
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [coins, setCoins] = useState(150); // Moedas fictícias do jogador
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
      <div className="max-w-7xl mx-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumDecks.map((deck) => (
              <div 
                key={deck.id} 
                className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-2xl border border-slate-700/50 overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={deck.image} 
                    alt={deck.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <Badge className={`absolute top-3 right-3 ${getRarityColor(deck.rarity)} text-white border-0`}>
                    {deck.rarity}
                  </Badge>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{deck.name}</h3>
                  <p className="text-slate-300 text-sm mb-4">{deck.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-400">{deck.cards} cartas</span>
                    <div className="flex items-center gap-1">
                      <Coins className="w-4 h-4 text-amber-400" />
                      <span className="text-2xl font-bold text-amber-400">{deck.price}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handlePurchase(deck)}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105"
                    disabled={coins < deck.price}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    COMPRAR
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {showcaseCards.map((card) => (
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