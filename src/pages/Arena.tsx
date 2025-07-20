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
  const [attackingCard, setAttackingCard] = useState<number | null>(null);
  const [gameEnded, setGameEnded] = useState(false);

  const currentPlayerData = gameState.currentPlayer === "player1" ? gameState.player1 : gameState.player2;
  const opponentData = gameState.currentPlayer === "player1" ? gameState.player2 : gameState.player1;

  const drawCard = () => {
    if (gameState.phase !== "draw" || currentPlayerData.deck.length === 0) return;

    setGameState(prev => {
      const newState = { ...prev };
      const currentPlayer = newState[prev.currentPlayer];
      
      if (currentPlayer.deck.length > 0) {
        const drawnCard = currentPlayer.deck[0];
        currentPlayer.hand.push(drawnCard);
        currentPlayer.deck = currentPlayer.deck.slice(1);
        
        toast({
          title: "✨ Carta Comprada!",
          description: `${drawnCard.name} foi adicionada à sua mão.`,
        });
      }

      return {
        ...newState,
        phase: "main"
      };
    });
  };

  const endTurn = () => {
    setAttackingCard(null);
    setSelectedCard(null);
    
    setGameState(prev => ({
      ...prev,
      currentPlayer: prev.currentPlayer === "player1" ? "player2" : "player1",
      phase: "draw",
      turn: prev.currentPlayer === "player2" ? prev.turn + 1 : prev.turn
    }));

    toast({
      title: "🔄 Turno Finalizado",
      description: gameState.currentPlayer === "player1" ? "Turno do oponente" : "Seu turno",
    });
  };

  const summonCard = (card: Card) => {
    if (card.type !== "monster" || currentPlayerData.field.length >= 5) return;

    setGameState(prev => {
      const newState = { ...prev };
      const currentPlayer = newState[prev.currentPlayer];
      
      const handIndex = currentPlayer.hand.findIndex(c => c.id === card.id);
      if (handIndex !== -1) {
        currentPlayer.hand.splice(handIndex, 1);
        currentPlayer.field.push(card);
        
        toast({
          title: "⚔️ Monstro Invocado!",
          description: `${card.name} entrou no campo de batalha.`,
        });
      }

      return newState;
    });
  };

  const attack = (attackerCard: Card, targetCard?: Card) => {
    if (gameState.phase !== "battle") {
      setGameState(prev => ({ ...prev, phase: "battle" }));
    }

    setAttackingCard(attackerCard.id);

    setTimeout(() => {
      if (targetCard) {
        // Attack monster
        const attackerATK = attackerCard.attack || 0;
        const targetDEF = targetCard.defense || 0;
        
        if (attackerATK > targetDEF) {
          const excessDamage = attackerATK - targetDEF;
          
          setGameState(prev => {
            const newState = { ...prev };
            const opponent = gameState.currentPlayer === "player1" ? newState.player2 : newState.player1;
            const currentPlayer = newState[prev.currentPlayer];
            
            // Remove target from field
            opponent.field = opponent.field.filter(c => c.id !== targetCard.id);
            opponent.graveyard.push(targetCard);
            
            // Deal excess damage to opponent
            opponent.health -= excessDamage;
            
            if (opponent.health <= 0) {
              setWinner(prev.currentPlayer);
              setGameEnded(true);
            }
            
            return newState;
          });
          
          toast({
            title: "💥 Ataque Devastador!",
            description: `${attackerCard.name} destruiu ${targetCard.name} e causou ${excessDamage} de dano!`,
          });
        } else {
          setGameState(prev => {
            const newState = { ...prev };
            const currentPlayer = newState[prev.currentPlayer];
            
            // Remove attacker from field
            currentPlayer.field = currentPlayer.field.filter(c => c.id !== attackerCard.id);
            currentPlayer.graveyard.push(attackerCard);
            
            return newState;
          });
          
          toast({
            title: "🛡️ Defesa Bem-Sucedida!",
            description: `${targetCard.name} defendeu o ataque!`,
          });
        }
      } else {
        // Direct attack
        const damage = attackerCard.attack || 0;
        
        setGameState(prev => {
          const newState = { ...prev };
          const opponent = gameState.currentPlayer === "player1" ? newState.player2 : newState.player1;
          
          opponent.health -= damage;
          
          if (opponent.health <= 0) {
            setWinner(prev.currentPlayer);
            setGameEnded(true);
          }
          
          return newState;
        });
        
        toast({
          title: "⚡ Ataque Direto!",
          description: `${attackerCard.name} causou ${damage} de dano direto!`,
        });
      }
      
      setAttackingCard(null);
    }, 1000);
  };

  const handleHandCardClick = (card: Card) => {
    if (card.type === "monster") {
      summonCard(card);
    }
    setSelectedCard(null);
  };

  const handleFieldCardClick = (card: Card) => {
    if (gameState.currentPlayer === "player1") {
      setSelectedCard(card);
    }
  };

  const handleOpponentFieldClick = (card: Card) => {
    if (selectedCard && gameState.currentPlayer === "player1") {
      attack(selectedCard, card);
      setSelectedCard(null);
    }
  };

  const handleDirectAttack = () => {
    if (selectedCard && opponentData.field.length === 0) {
      attack(selectedCard);
      setSelectedCard(null);
    }
  };

  // AI opponent logic
  useEffect(() => {
    if (gameState.currentPlayer === "player2" && !gameEnded) {
      const timer = setTimeout(() => {
        // AI draws card
        if (gameState.phase === "draw") {
          drawCard();
        } else {
          // AI plays a random card from hand
          const playableCards = gameState.player2.hand.filter(card => 
            card.type === "monster" && gameState.player2.field.length < 5
          );
          
          if (playableCards.length > 0) {
            const randomCard = playableCards[Math.floor(Math.random() * playableCards.length)];
            summonCard(randomCard);
          }
          
          // AI attacks if possible
          if (gameState.player2.field.length > 0) {
            const attacker = gameState.player2.field[0];
            if (gameState.player1.field.length > 0) {
              const target = gameState.player1.field[0];
              attack(attacker, target);
            } else {
              attack(attacker);
            }
          }
          
          setTimeout(() => {
            endTurn();
          }, 2000);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [gameState.currentPlayer, gameState.phase]);

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
    setAttackingCard(null);
    setGameEnded(false);
    
    toast({
      title: "⚔️ Nova Batalha Iniciada!",
      description: "Que a sorte esteja com você, guerreiro!",
    });
  };

  if (winner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/10 to-accent/10 flex items-center justify-center p-2 sm:p-4 relative overflow-hidden">
        {/* Celebration Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-fire rounded-full opacity-30 animate-victory-celebration"></div>
          <div className="absolute top-20 right-20 w-12 sm:w-24 h-12 sm:h-24 bg-gradient-holy rounded-full opacity-40 animate-victory-celebration" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-20 left-20 w-20 sm:w-40 h-20 sm:h-40 bg-gradient-ice rounded-full opacity-25 animate-victory-celebration" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-10 right-10 w-14 sm:w-28 h-14 sm:h-28 bg-gradient-primary rounded-full opacity-35 animate-victory-celebration" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        <div className="relative z-10 text-center space-y-4 sm:space-y-8 p-4 sm:p-8 bg-card/90 backdrop-blur-xl rounded-2xl border border-primary/30 shadow-mystical animate-scale-in max-w-md sm:max-w-lg mx-auto">
          <div className="space-y-2 sm:space-y-4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-victory-celebration">
              {winner === "player1" ? (
                <Crown className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              ) : (
                <Skull className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              )}
            </div>
            
            <h1 className="text-3xl sm:text-6xl font-black bg-gradient-primary bg-clip-text text-transparent animate-glow">
              {winner === "player1" ? "🎉 VITÓRIA!" : "💀 DERROTA!"}
            </h1>
            
            <p className="text-lg sm:text-2xl font-bold">
              {winner === "player1" ? (
                <span className="text-accent animate-glow">
                  🏆 Campeão! 🏆
                </span>
              ) : (
                <span className="text-destructive">
                  ⚔️ Tente novamente! ⚔️
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-col gap-3 justify-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={resetGame}
              className="animate-glow text-sm sm:text-base"
            >
              <Swords className="w-4 h-4 sm:w-6 sm:h-6 mr-2" />
              {winner === "player1" ? "NOVA CONQUISTA" : "REVANCHE"}
            </Button>
            <Button 
              variant="magical" 
              size="lg"
              onClick={() => navigate("/")}
              className="text-sm sm:text-base"
            >
              <Crown className="w-4 h-4 sm:w-6 sm:h-6 mr-2" />
              Menu Principal
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* Animated Background - Mobile Optimized */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-fire rounded-full opacity-20 animate-magical-float"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-ice rounded-full opacity-20 animate-magical-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Mobile-Optimized Header */}
      <div className="relative z-10 flex items-center justify-between p-2 sm:p-6 bg-card/80 backdrop-blur-sm border-b border-border/50">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="flex items-center gap-1 sm:gap-2 hover:bg-primary/10 text-xs sm:text-sm p-1 sm:p-2"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Menu Principal</span>
          <span className="sm:hidden">Menu</span>
        </Button>
        
        <div className="text-center space-y-1">
          <h1 className="text-lg sm:text-3xl font-black bg-gradient-primary bg-clip-text text-transparent animate-glow">
            DUNGEONS® ARENA
          </h1>
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <Badge variant="outline" className="animate-pulse text-xs">
              Turno {gameState.turn}
            </Badge>
            <span className="text-muted-foreground hidden sm:inline">
              {currentPlayerData.name}
            </span>
            <Badge 
              variant={gameState.phase === "battle" ? "destructive" : "default"} 
              className="font-bold animate-glow text-xs"
            >
              {gameState.phase.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <Badge variant="secondary" className="flex items-center gap-1 text-xs">
            <Crown className="w-2 h-2 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline">Épico</span>
          </Badge>
        </div>
      </div>

      <div className="relative z-10 p-2 sm:p-6 space-y-4 sm:space-y-8">
        {/* Opponent Area - Mobile Optimized */}
        <div className="space-y-2 sm:space-y-4 animate-fade-in">
          <div className="flex items-center justify-between p-2 sm:p-4 bg-destructive/10 rounded-xl border border-destructive/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-destructive to-destructive/60 flex items-center justify-center animate-pulse">
                <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-sm sm:text-xl font-bold text-destructive">
                  {opponentData.name}
                </h2>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-16 sm:w-32 h-1 sm:h-2 bg-destructive/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-destructive to-destructive/80 transition-all duration-500 animate-glow"
                      style={{ width: `${(opponentData.health / 4000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs sm:text-lg font-bold text-destructive">
                    {opponentData.health} HP
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Badge variant="secondary" className="text-xs sm:text-lg px-2 sm:px-4 py-1 sm:py-2">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                {opponentData.hand.length}
              </Badge>
              <Badge variant="outline" className="text-xs sm:text-lg px-2 sm:px-4 py-1 sm:py-2">
                {opponentData.deck.length}
              </Badge>
            </div>
          </div>
          
          {/* Opponent Field - Mobile Optimized */}
          <div className="min-h-20 sm:min-h-32 border-2 border-dashed border-destructive/30 rounded-xl p-2 sm:p-6 bg-destructive/5 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-xs sm:text-sm font-bold text-destructive/80 mb-2 sm:mb-4 flex items-center gap-1 sm:gap-2">
                <Swords className="w-3 h-3 sm:w-4 sm:h-4" />
                CAMPO OPONENTE
              </h3>
              <div className="flex gap-1 sm:gap-3 flex-wrap justify-center">
                {opponentData.field.map((card, index) => (
                  <div 
                    key={`${card.id}-${index}`}
                    className={`animate-scale-in relative transform transition-all duration-500 hover:scale-110 cursor-pointer ${
                      attackingCard === card.id ? 'animate-pulse scale-110 border-2 sm:border-4 border-red-500 shadow-xl sm:shadow-2xl shadow-red-500/80' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleOpponentFieldClick(card)}
                  >
                    <GameCard 
                      card={card} 
                      className="transform transition-all duration-300 shadow-lg hover:shadow-destructive/50 scale-50 sm:scale-75"
                      onClick={() => handleOpponentFieldClick(card)}
                    />
                  </div>
                ))}
                {opponentData.field.length === 0 && selectedCard && (
                  <div className="flex items-center justify-center h-20 sm:h-32 w-full">
                    <Button
                      variant="destructive"
                      onClick={handleDirectAttack}
                      className="animate-pulse text-xs sm:text-sm"
                    >
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Ataque Direto
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Player Field - Mobile Optimized */}
        <div className="min-h-20 sm:min-h-32 border-2 border-dashed border-primary/30 rounded-xl p-2 sm:p-6 bg-primary/5 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <h3 className="text-xs sm:text-sm font-bold text-primary/80 mb-2 sm:mb-4 flex items-center gap-1 sm:gap-2">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
              SEU CAMPO
            </h3>
            <div className="flex gap-1 sm:gap-3 flex-wrap justify-center">
              {currentPlayerData.field.map((card, index) => (
                <div 
                  key={`${card.id}-${index}`}
                  className={`animate-scale-in relative transform transition-all duration-500 hover:scale-110 cursor-pointer ${
                    selectedCard?.id === card.id ? 'scale-110 border-2 sm:border-4 border-accent shadow-xl sm:shadow-2xl shadow-accent/80' : ''
                  } ${
                    attackingCard === card.id ? 'animate-pulse scale-110 border-2 sm:border-4 border-yellow-500 shadow-xl sm:shadow-2xl shadow-yellow-500/80' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleFieldCardClick(card)}
                >
                  <GameCard 
                    card={card} 
                    className="transform transition-all duration-300 shadow-lg hover:shadow-primary/50 scale-50 sm:scale-75"
                    onClick={() => handleFieldCardClick(card)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Player Area - Mobile Optimized */}
        <div className="space-y-2 sm:space-y-4">
          <div className="flex items-center justify-between p-2 sm:p-4 bg-primary/10 rounded-xl border border-primary/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center animate-pulse">
                <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-sm sm:text-xl font-bold text-primary">
                  {currentPlayerData.name}
                </h2>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-16 sm:w-32 h-1 sm:h-2 bg-primary/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 animate-glow"
                      style={{ width: `${(currentPlayerData.health / 4000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs sm:text-lg font-bold text-primary">
                    {currentPlayerData.health} HP
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Badge variant="secondary" className="text-xs sm:text-lg px-2 sm:px-4 py-1 sm:py-2">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                {currentPlayerData.hand.length}
              </Badge>
              <Badge variant="outline" className="text-xs sm:text-lg px-2 sm:px-4 py-1 sm:py-2">
                {currentPlayerData.deck.length}
              </Badge>
            </div>
          </div>
          
          {/* Player Hand - Mobile Optimized */}
          <div className="p-2 sm:p-4 bg-card/80 rounded-xl border border-border/50 backdrop-blur-sm">
            <h3 className="text-xs sm:text-sm font-bold text-foreground/80 mb-2 sm:mb-4 flex items-center gap-1 sm:gap-2">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              SUA MÃO
            </h3>
            <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 sm:pb-4 px-1">
              {currentPlayerData.hand.map((card, index) => (
                <div 
                  key={`hand-${card.id}-${index}`}
                  className="flex-shrink-0 animate-scale-in cursor-pointer transform transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleHandCardClick(card)}
                >
                  <GameCard 
                    card={card} 
                    className="shadow-lg hover:shadow-accent/50 scale-50 sm:scale-75"
                    onClick={() => handleHandCardClick(card)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons - Mobile Optimized */}
        <div className="flex justify-center gap-2 sm:gap-4 pb-4">
          <Button
            onClick={drawCard}
            disabled={gameState.phase !== "draw" || gameState.currentPlayer !== "player1"}
            variant="magical"
            size="sm"
            className="text-xs sm:text-sm px-3 sm:px-6 py-2"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Comprar Carta</span>
            <span className="sm:hidden">Comprar</span>
          </Button>
          
          <Button
            onClick={endTurn}
            disabled={gameState.currentPlayer !== "player1"}
            variant="destructive"
            size="sm"
            className="text-xs sm:text-sm px-3 sm:px-6 py-2"
          >
            <Swords className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Finalizar Turno</span>
            <span className="sm:hidden">Finalizar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}