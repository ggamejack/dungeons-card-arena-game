import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/components/GameCard";
import { Card, GameState, Player } from "@/types/Card";
import { allCards } from "@/data/cards";
import { Heart, Zap, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const createInitialDeck = (): Card[] => {
  // Shuffle and take 20 cards for each player
  const shuffled = [...allCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 20);
};

const createPlayer = (id: string, name: string): Player => {
  const deck = createInitialDeck();
  return {
    id,
    name,
    health: 4000,
    hand: deck.slice(0, 5),
    deck: deck.slice(5),
    field: [],
    graveyard: []
  };
};

export default function Arena() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>(() => ({
    player1: createPlayer("player1", "Você"),
    player2: createPlayer("player2", "Oponente"),
    currentPlayer: "player1",
    phase: "draw",
    turn: 1
  }));

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const currentPlayerData = gameState.currentPlayer === "player1" ? gameState.player1 : gameState.player2;
  const opponentData = gameState.currentPlayer === "player1" ? gameState.player2 : gameState.player1;

  const drawCard = () => {
    if (currentPlayerData.deck.length === 0) return;

    const newCard = currentPlayerData.deck[0];
    const newDeck = currentPlayerData.deck.slice(1);
    const newHand = [...currentPlayerData.hand, newCard];

    setGameState(prev => ({
      ...prev,
      [gameState.currentPlayer]: {
        ...currentPlayerData,
        hand: newHand,
        deck: newDeck
      },
      phase: "main"
    }));

    toast({
      title: "Carta comprada!",
      description: `${newCard.name} foi adicionada à sua mão.`,
    });
  };

  const playCard = (card: Card) => {
    if (card.type === "monster") {
      if (currentPlayerData.field.length >= 5) {
        toast({
          title: "Campo lotado!",
          description: "Você pode ter no máximo 5 monstros no campo.",
          variant: "destructive"
        });
        return;
      }

      const newHand = currentPlayerData.hand.filter(c => c.id !== card.id);
      const newField = [...currentPlayerData.field, card];

      setGameState(prev => ({
        ...prev,
        [gameState.currentPlayer]: {
          ...currentPlayerData,
          hand: newHand,
          field: newField
        }
      }));

      toast({
        title: "Monstro invocado!",
        description: `${card.name} entrou no campo de batalha.`,
      });
    }
    
    setSelectedCard(null);
  };

  const attack = (attackerCard: Card) => {
    if (opponentData.field.length === 0) {
      // Ataque direto
      const damage = attackerCard.attack || 0;
      const newHealth = Math.max(0, opponentData.health - damage);

      setGameState(prev => ({
        ...prev,
        [gameState.currentPlayer === "player1" ? "player2" : "player1"]: {
          ...opponentData,
          health: newHealth
        }
      }));

      if (newHealth <= 0) {
        setWinner(gameState.currentPlayer);
        toast({
          title: "Vitória!",
          description: "Você derrotou seu oponente!",
        });
      } else {
        toast({
          title: "Ataque direto!",
          description: `${damage} de dano causado diretamente!`,
        });
      }
    }
  };

  const endTurn = () => {
    const nextPlayer = gameState.currentPlayer === "player1" ? "player2" : "player1";
    setGameState(prev => ({
      ...prev,
      currentPlayer: nextPlayer,
      phase: "draw",
      turn: nextPlayer === "player1" ? prev.turn + 1 : prev.turn
    }));

    // AI turn simulation for player2
    if (nextPlayer === "player2") {
      setTimeout(() => {
        aiTurn();
      }, 1000);
    }
  };

  const aiTurn = () => {
    // Simple AI: draw card, play a random monster if possible, end turn
    const aiPlayer = gameState.player2;
    
    // Draw card
    if (aiPlayer.deck.length > 0) {
      const newCard = aiPlayer.deck[0];
      const newDeck = aiPlayer.deck.slice(1);
      const newHand = [...aiPlayer.hand, newCard];

      setGameState(prev => ({
        ...prev,
        player2: {
          ...aiPlayer,
          hand: newHand,
          deck: newDeck
        }
      }));

      // Try to play a monster
      setTimeout(() => {
        const monsters = newHand.filter(card => card.type === "monster" && aiPlayer.field.length < 5);
        if (monsters.length > 0) {
          const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
          const finalHand = newHand.filter(c => c.id !== randomMonster.id);
          const finalField = [...aiPlayer.field, randomMonster];

          setGameState(prev => ({
            ...prev,
            player2: {
              ...prev.player2,
              hand: finalHand,
              field: finalField
            },
            currentPlayer: "player1",
            phase: "draw",
            turn: prev.turn + 1
          }));

          toast({
            title: "Oponente jogou",
            description: `${randomMonster.name} foi invocado pelo oponente.`,
          });
        } else {
          // Just end turn
          setGameState(prev => ({
            ...prev,
            currentPlayer: "player1",
            phase: "draw",
            turn: prev.turn + 1
          }));
        }
      }, 1500);
    }
  };

  const resetGame = () => {
    setGameState({
      player1: createPlayer("player1", "Você"),
      player2: createPlayer("player2", "Oponente"),
      currentPlayer: "player1",
      phase: "draw",
      turn: 1
    });
    setWinner(null);
    setSelectedCard(null);
  };

  if (winner) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-black bg-gradient-primary bg-clip-text text-transparent">
            {winner === "player1" ? "🎉 VITÓRIA!" : "💀 DERROTA!"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {winner === "player1" ? "Parabéns! Você venceu!" : "Não foi dessa vez. Tente novamente!"}
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="hero" onClick={resetGame}>
              Jogar Novamente
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              Menu Principal
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Menu Principal
        </Button>
        
        <div className="text-center">
          <h1 className="text-2xl font-black bg-gradient-primary bg-clip-text text-transparent">
            DUNGEONS® ARENA
          </h1>
          <p className="text-sm text-muted-foreground">
            Turno {gameState.turn} - {currentPlayerData.name}
          </p>
        </div>

        <Badge variant="outline" className="font-bold">
          Fase: {gameState.phase.toUpperCase()}
        </Badge>
      </div>

      {/* Game Board */}
      <div className="space-y-6">
        {/* Opponent Area */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Heart className="w-5 h-5 text-destructive" />
              {opponentData.name}: {opponentData.health} HP
            </h2>
            <Badge variant="secondary">
              Cartas na mão: {opponentData.hand.length}
            </Badge>
          </div>
          
          {/* Opponent Field */}
          <div className="min-h-20 border-2 border-dashed border-muted rounded-lg p-4">
            <div className="flex gap-2 flex-wrap">
              {opponentData.field.map((card, index) => (
                <GameCard key={`${card.id}-${index}`} card={card} />
              ))}
              {opponentData.field.length === 0 && (
                <p className="text-muted-foreground text-center w-full">
                  Campo do oponente vazio
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Player Area */}
        <div className="space-y-4">
          {/* Player Field */}
          <div className="min-h-20 border-2 border-primary/30 rounded-lg p-4 bg-primary/5">
            <div className="flex gap-2 flex-wrap">
              {currentPlayerData.field.map((card, index) => (
                <GameCard 
                  key={`${card.id}-${index}`} 
                  card={card}
                  onClick={() => gameState.phase === "battle" && attack(card)}
                  className={gameState.phase === "battle" ? "hover:border-destructive cursor-pointer" : ""}
                />
              ))}
              {currentPlayerData.field.length === 0 && (
                <p className="text-muted-foreground text-center w-full">
                  Seu campo está vazio
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Heart className="w-5 h-5 text-destructive" />
              {currentPlayerData.name}: {currentPlayerData.health} HP
            </h2>
            <div className="flex gap-2">
              {gameState.phase === "draw" && gameState.currentPlayer === "player1" && (
                <Button variant="magical" onClick={drawCard}>
                  Comprar Carta
                </Button>
              )}
              {gameState.phase === "main" && gameState.currentPlayer === "player1" && (
                <Button 
                  variant="fire" 
                  onClick={() => setGameState(prev => ({ ...prev, phase: "battle" }))}
                >
                  Fase de Batalha
                </Button>
              )}
              {gameState.phase === "battle" && gameState.currentPlayer === "player1" && (
                <Button variant="outline" onClick={endTurn}>
                  Finalizar Turno
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Player Hand */}
        {gameState.currentPlayer === "player1" && (
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Sua Mão</h3>
            <div className="flex gap-2 overflow-x-auto pb-4">
              {currentPlayerData.hand.map((card, index) => (
                <GameCard 
                  key={`${card.id}-${index}`} 
                  card={card}
                  isHovered={selectedCard?.id === card.id}
                  onClick={() => gameState.phase === "main" ? playCard(card) : setSelectedCard(card)}
                  className="flex-shrink-0"
                />
              ))}
              {currentPlayerData.hand.length === 0 && (
                <p className="text-muted-foreground">Sua mão está vazia</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}