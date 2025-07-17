import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/components/GameCard";
import { Card, GameState, Player } from "@/types/Card";
import { allCards } from "@/data/cards";
import { Heart, Zap, ArrowLeft, Swords, Shield, Crown, Sparkles, Flame, Snowflake, Skull } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/10 to-accent/10 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Celebration Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-fire rounded-full opacity-30 animate-victory-celebration"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-holy rounded-full opacity-40 animate-victory-celebration" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-ice rounded-full opacity-25 animate-victory-celebration" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-10 right-10 w-28 h-28 bg-gradient-primary rounded-full opacity-35 animate-victory-celebration" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        <div className="relative z-10 text-center space-y-8 p-8 bg-card/90 backdrop-blur-xl rounded-2xl border border-primary/30 shadow-mystical animate-scale-in">
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-victory-celebration">
              {winner === "player1" ? (
                <Crown className="w-12 h-12 text-white" />
              ) : (
                <Skull className="w-12 h-12 text-white" />
              )}
            </div>
            
            <h1 className="text-6xl font-black bg-gradient-primary bg-clip-text text-transparent animate-glow">
              {winner === "player1" ? "🎉 VITÓRIA ÉPICA!" : "💀 DERROTA!"}
            </h1>
            
            <p className="text-2xl font-bold">
              {winner === "player1" ? (
                <span className="text-accent animate-glow">
                  🏆 Parabéns, Campeão das Masmorras! 🏆
                </span>
              ) : (
                <span className="text-destructive">
                  ⚔️ Não foi dessa vez, guerreiro! ⚔️
                </span>
              )}
            </p>
            
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              {winner === "player1" 
                ? "Você dominou a arena com maestria lendária! Seus inimigos tremem diante de seu poder!"
                : "As masmorras são traiçoeiras, mas um verdadeiro guerreiro nunca desiste. Levante-se e lute novamente!"
              }
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl"
              onClick={resetGame}
              className="animate-glow"
            >
              <Swords className="w-6 h-6 mr-2" />
              {winner === "player1" ? "NOVA CONQUISTA" : "REVANCHE ÉPICA"}
            </Button>
            <Button 
              variant="magical" 
              size="xl"
              onClick={() => navigate("/")}
            >
              <Crown className="w-6 h-6 mr-2" />
              Salão da Fama
            </Button>
          </div>
          
          {winner === "player1" && (
            <div className="pt-4 border-t border-primary/20">
              <p className="text-sm text-accent font-bold animate-pulse">
                ⭐ NOVO TÍTULO DESBLOQUEADO: "Conquistador das Masmorras" ⭐
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-fire rounded-full opacity-20 animate-magical-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-ice rounded-full opacity-20 animate-magical-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-holy rounded-full opacity-10 animate-energy-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6 bg-card/80 backdrop-blur-sm border-b border-border/50">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:bg-primary/10"
        >
          <ArrowLeft className="w-4 h-4" />
          Menu Principal
        </Button>
        
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-black bg-gradient-primary bg-clip-text text-transparent animate-glow">
            DUNGEONS® ARENA
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="outline" className="animate-pulse">
              Turno {gameState.turn}
            </Badge>
            <span className="text-muted-foreground">
              {currentPlayerData.name}
            </span>
            <Badge 
              variant={gameState.phase === "battle" ? "destructive" : "default"} 
              className="font-bold animate-glow"
            >
              {gameState.phase.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Nível Épico
          </Badge>
        </div>
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Opponent Area */}
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-xl border border-destructive/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-destructive to-destructive/60 flex items-center justify-center animate-pulse">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-destructive">
                  {opponentData.name}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-destructive/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-destructive to-destructive/80 transition-all duration-500 animate-glow"
                      style={{ width: `${(opponentData.health / 4000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-bold text-destructive">
                    {opponentData.health} HP
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                {opponentData.hand.length} cartas
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                {opponentData.deck.length} deck
              </Badge>
            </div>
          </div>
          
          {/* Opponent Field */}
          <div className="min-h-32 border-2 border-dashed border-destructive/30 rounded-xl p-6 bg-destructive/5 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-destructive/80 mb-4 flex items-center gap-2">
                <Swords className="w-4 h-4" />
                CAMPO DO OPONENTE
              </h3>
              <div className="flex gap-3 flex-wrap justify-center">
                {opponentData.field.map((card, index) => (
                  <div 
                    key={`${card.id}-${index}`}
                    className="animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <GameCard 
                      card={card} 
                      className="transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-destructive/50"
                    />
                  </div>
                ))}
                {opponentData.field.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground animate-pulse">
                    <Swords className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Campo do oponente vazio</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Battle Effects */}
        <div className="flex justify-center">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-full border border-primary/20 animate-glow">
            <Flame className="w-6 h-6 text-fire animate-pulse" />
            <Swords className="w-8 h-8 text-primary animate-bounce" />
            <Snowflake className="w-6 h-6 text-ice animate-pulse" />
          </div>
        </div>

        {/* Player Area */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Player Field */}
          <div className="min-h-32 border-2 border-primary/50 rounded-xl p-6 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                SEU CAMPO DE BATALHA
              </h3>
              <div className="flex gap-3 flex-wrap justify-center">
                {currentPlayerData.field.map((card, index) => (
                  <div 
                    key={`${card.id}-${index}`}
                    className="animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <GameCard 
                      card={card}
                      onClick={() => gameState.phase === "battle" && attack(card)}
                      className={cn(
                        "transform transition-all duration-300 shadow-lg",
                        gameState.phase === "battle" 
                          ? "hover:scale-110 hover:shadow-fire cursor-pointer animate-glow border-2 border-fire/50" 
                          : "hover:scale-105 hover:shadow-primary/50"
                      )}
                    />
                  </div>
                ))}
                {currentPlayerData.field.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground animate-pulse">
                    <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Seu campo está vazio</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Player Stats & Controls */}
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center animate-glow">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">
                  {currentPlayerData.name}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-primary/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 animate-glow"
                      style={{ width: `${(currentPlayerData.health / 4000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-bold text-primary">
                    {currentPlayerData.health} HP
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              {gameState.phase === "draw" && gameState.currentPlayer === "player1" && (
                <Button variant="magical" size="lg" onClick={drawCard} className="animate-pulse">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Comprar Carta
                </Button>
              )}
              {gameState.phase === "main" && gameState.currentPlayer === "player1" && (
                <Button 
                  variant="fire" 
                  size="lg"
                  onClick={() => setGameState(prev => ({ ...prev, phase: "battle" }))}
                  className="animate-glow"
                >
                  <Swords className="w-5 h-5 mr-2" />
                  Fase de Batalha
                </Button>
              )}
              {gameState.phase === "battle" && gameState.currentPlayer === "player1" && (
                <Button variant="outline" size="lg" onClick={endTurn} className="animate-pulse">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Finalizar Turno
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Player Hand */}
        {gameState.currentPlayer === "player1" && (
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Crown className="w-5 h-5 text-accent" />
                Sua Mão
              </h3>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-accent/20 text-accent border-accent/30">
                {currentPlayerData.hand.length} / 10 cartas
              </Badge>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4 px-2">
              {currentPlayerData.hand.map((card, index) => (
                <div 
                  key={`${card.id}-${index}`}
                  className="flex-shrink-0 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <GameCard 
                    card={card}
                    isHovered={selectedCard?.id === card.id}
                    onClick={() => gameState.phase === "main" ? playCard(card) : setSelectedCard(card)}
                    className={cn(
                      "transition-all duration-300 hover:scale-110",
                      gameState.phase === "main" 
                        ? "cursor-pointer hover:shadow-magical animate-glow" 
                        : "cursor-pointer hover:shadow-lg",
                      selectedCard?.id === card.id && "scale-110 shadow-magical border-2 border-accent"
                    )}
                  />
                </div>
              ))}
              {currentPlayerData.hand.length === 0 && (
                <div className="text-center py-8 text-muted-foreground animate-pulse w-full">
                  <Crown className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Sua mão está vazia</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}