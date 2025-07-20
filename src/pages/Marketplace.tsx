import { useState } from "react";
import { Card } from "../types/Card";
import { GameCard } from "../components/GameCard";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ShoppingCart, Coins, Star, Sparkles } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const premiumDecks = [
  {
    id: "premium-angels",
    name: "Deck dos Anjos Celestiais",
    description: "Uma coleção épica de anjos com poderes divinos",
    price: 25.99,
    cards: 15,
    rarity: "Legendary",
    image: "/dungeons-card-arena-game/lovable-uploads/43109396-a769-44b4-818f-1f797ee22f52.png"
  },
  {
    id: "premium-shadows",
    name: "Deck das Sombras Eternas",
    description: "Criaturas das trevas com poderes sombrios",
    price: 23.99,
    cards: 15,
    rarity: "Epic",
    image: "/dungeons-card-arena-game/lovable-uploads/9eecb997-c318-4245-8002-492ea0f546bf.png"
  },
  {
    id: "premium-elementals",
    name: "Deck dos Elementais Supremos",
    description: "Mestres dos elementos com poderes devastadores",
    price: 29.99,
    cards: 20,
    rarity: "Legendary",
    image: "/dungeons-card-arena-game/lovable-uploads/15a8d434-2b12-4b22-8537-31e198cdcdd8.png"
  },
  {
    id: "premium-mythical",
    name: "Deck dos Seres Míticos",
    description: "Criaturas lendárias com habilidades únicas",
    price: 35.99,
    cards: 25,
    rarity: "Mythical",
    image: "/dungeons-card-arena-game/lovable-uploads/38499ffe-dbfa-4b49-a357-8cac32af8b3c.png"
  }
];

const newPremiumCards: Card[] = [
  {
    id: 2000,
    name: "Arcanjo Gabriel",
    type: "monster",
    element: "holy",
    attack: 18,
    defense: 15,
    level: 12,
    description: "O mais poderoso dos arcanjos, mensageiro divino com força celestial.",
    image: "/dungeons-card-arena-game/lovable-uploads/43109396-a769-44b4-818f-1f797ee22f52.png",
    rarity: "legendary",
    cost: 15
  },
  {
    id: 2001,
    name: "Serafim da Justiça",
    type: "monster",
    element: "holy",
    attack: 16,
    defense: 13,
    level: 11,
    description: "Guardião celestial que pune os pecadores com luz divina.",
    image: "/lovable-uploads/93e1cfb2-1a99-42de-b3f1-c70a260bd479.png",
    rarity: "legendary",
    cost: 14
  },
  {
    id: 2002,
    name: "Lorde das Trevas",
    type: "monster",
    element: "shadow",
    attack: 20,
    defense: 12,
    level: 12,
    description: "Senhor supremo das sombras, corruptor de almas.",
    image: "/lovable-uploads/9eecb997-c318-4245-8002-492ea0f546bf.png",
    rarity: "legendary",
    cost: 16
  },
  {
    id: 2003,
    name: "Demônio do Abismo",
    type: "monster",
    element: "shadow",
    attack: 17,
    defense: 10,
    level: 10,
    description: "Criatura infernal que emerge das profundezas do abismo.",
    image: "/lovable-uploads/b745b9a0-bb80-4788-92ff-04357d1d3a69.png",
    rarity: "epic",
    cost: 13
  },
  {
    id: 2004,
    name: "Titã do Gelo Eterno",
    type: "monster",
    element: "ice",
    attack: 15,
    defense: 18,
    level: 11,
    description: "Gigante ancestral das terras geladas com poder congelante.",
    image: "/lovable-uploads/15a8d434-2b12-4b22-8537-31e198cdcdd8.png",
    rarity: "legendary",
    cost: 14
  },
  {
    id: 2005,
    name: "Deusa da Luna",
    type: "monster",
    element: "holy",
    attack: 14,
    defense: 16,
    level: 10,
    description: "Divindade lunar que controla as marés e o destino.",
    image: "/lovable-uploads/38499ffe-dbfa-4b49-a357-8cac32af8b3c.png",
    rarity: "legendary",
    cost: 13
  },
  {
    id: 2006,
    name: "Águia do Trovão",
    type: "monster",
    element: "lightning",
    attack: 19,
    defense: 8,
    level: 9,
    description: "Ave lendária que cavalga as tempestades com velocidade divina.",
    image: "/lovable-uploads/699b67df-94bc-415d-abb4-9d688ef5e6d1.png",
    rarity: "epic",
    cost: 12
  },
  {
    id: 2007,
    name: "Raposa de Fogo Mística",
    type: "monster",
    element: "fire",
    attack: 12,
    defense: 14,
    level: 8,
    description: "Espírito vulpino com chamas sagradas que purificam.",
    image: "/lovable-uploads/e6a6b15b-2a22-46aa-ae00-6b2eb3c6fb65.png",
    rarity: "rare",
    cost: 10
  },
  {
    id: 2008,
    name: "Golem de Magma",
    type: "monster",
    element: "fire",
    attack: 16,
    defense: 20,
    level: 10,
    description: "Construto de rocha e magma com força devastadora.",
    image: "/lovable-uploads/d80aaac7-9c5c-409c-86c1-990916520fba.png",
    rarity: "epic",
    cost: 13
  },
  {
    id: 2009,
    name: "Feiticeiro das Sombras",
    type: "monster",
    element: "shadow",
    attack: 13,
    defense: 11,
    level: 9,
    description: "Mago negro que manipula as trevas para invocar poderes proibidos.",
    image: "/lovable-uploads/bdeb866c-9a3f-45cb-bbbd-b8b78da78cba.png",
    rarity: "epic",
    cost: 11
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
              MARKETPLACE
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
            {newPremiumCards.map((card) => (
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
    </div>
  );
}