import React, { useState, useEffect } from 'react';
import { Card, Player } from '@/types/Card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GameCard } from '@/components/GameCard';
import { Heart, Zap, Sparkles, Swords, Shield, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  calculateBattle, 
  getElementalAdvantage, 
  canSummonCard,
  getProgressiveEnergy 
} from '@/utils/battleSystem';

export interface Creature extends Card {
  currentHealth: number;
  maxHealth: number;
  canAttack: boolean;
  summoned: boolean;
}

interface TurnBasedBattleSystemProps {
  player: Player;
  opponent: Player;
  currentPlayer: 'player1' | 'player2';
  phase: 'draw' | 'main' | 'battle' | 'end';
  turn: number;
  onPlayCard: (card: Card) => void;
  onAttack: (attacker: Creature, target?: Creature) => void;
  onEndTurn: () => void;
  onDrawCard: () => void;
}

export const TurnBasedBattleSystem: React.FC<TurnBasedBattleSystemProps> = ({
  player,
  opponent,
  currentPlayer,
  phase,
  turn,
  onPlayCard,
  onAttack,
  onEndTurn,
  onDrawCard
}) => {
  const { toast } = useToast();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(null);
  const [creatures, setCreatures] = useState<{
    player: Creature[];
    opponent: Creature[];
  }>({
    player: [],
    opponent: []
  });

  // Converter cartas do campo em criaturas com HP
  useEffect(() => {
    const playerCreatures: Creature[] = player.field.map(card => ({
      ...card,
      currentHealth: card.defense || 1,
      maxHealth: card.defense || 1,
      canAttack: true,
      summoned: true
    }));

    const opponentCreatures: Creature[] = opponent.field.map(card => ({
      ...card,
      currentHealth: card.defense || 1,
      maxHealth: card.defense || 1,
      canAttack: true,
      summoned: true
    }));

    setCreatures({
      player: playerCreatures,
      opponent: opponentCreatures
    });
  }, [player.field, opponent.field]);

  const handleCardPlay = (card: Card) => {
    if (card.type === 'monster' && canSummonCard(card, player.energy)) {
      if (creatures.player.length >= 3) {
        toast({
          title: "🚫 Campo Lotado!",
          description: "Máximo de 3 criaturas no campo de batalha.",
          variant: "destructive"
        });
        return;
      }
      onPlayCard(card);
      toast({
        title: "⚔️ Criatura Invocada!",
        description: `${card.name} entrou no campo de batalha!`,
      });
    }
  };

  const handleCreatureAttack = (attacker: Creature, target?: Creature) => {
    if (!attacker.canAttack) {
      toast({
        title: "⚡ Ataque Indisponível!",
        description: "Esta criatura já atacou neste turno.",
        variant: "destructive"
      });
      return;
    }

    if (target) {
      // Ataque entre criaturas
      const result = calculateBattle(attacker, target);
      
      if (result.winner === 'player') {
        toast({
          title: "💥 Vitória em Batalha!",
          description: `${attacker.name} derrotou ${target.name}!`,
        });
      } else if (result.winner === 'opponent') {
        toast({
          title: "🛡️ Defesa Vitoriosa!",
          description: `${target.name} resistiu ao ataque!`,
        });
      } else {
        toast({
          title: "⚔️ Empate!",
          description: "Ambas as criaturas foram destruídas!",
        });
      }

      onAttack(attacker, target);
    } else {
      // Ataque direto
      const damage = attacker.attack || 0;
      toast({
        title: "⚡ Ataque Direto!",
        description: `${attacker.name} causou ${damage} de dano direto!`,
      });
      onAttack(attacker);
    }

    // Marcar criatura como já atacou
    setCreatures(prev => ({
      ...prev,
      player: prev.player.map(c => 
        c.id === attacker.id ? { ...c, canAttack: false } : c
      )
    }));
  };

  const getPhaseDescription = () => {
    switch (phase) {
      case 'draw':
        return "Fase de Compra - Compre uma carta";
      case 'main':
        return "Fase Principal - Invoque criaturas e use magias";
      case 'battle':
        return "Fase de Batalha - Ataque com suas criaturas";
      case 'end':
        return "Fase Final - Finalize seu turno";
      default:
        return "Aguardando...";
    }
  };

  const progressiveEnergy = getProgressiveEnergy(turn);

  return (
    <div className="space-y-6">
      {/* Informações da Fase */}
      <div className="text-center">
        <Badge 
          variant={phase === "battle" ? "destructive" : "default"} 
          className="text-lg px-6 py-2 animate-glow"
        >
          {phase.toUpperCase()} - Turno {turn}
        </Badge>
        <p className="text-sm text-muted-foreground mt-2">
          {getPhaseDescription()}
        </p>
        <p className="text-xs text-accent-foreground">
          Energia do Turno: {progressiveEnergy} (Máx: 10)
        </p>
      </div>

      {/* Campo de Batalha do Oponente */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-destructive flex items-center gap-2">
            <Crown className="w-5 h-5" />
            {opponent.name}
          </h3>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-destructive" />
              {opponent.health}/30
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              {opponent.energy}/10
            </Badge>
          </div>
        </div>
        
        {/* Criaturas do Oponente */}
        <div className="grid grid-cols-3 gap-3 min-h-[120px] bg-destructive/5 rounded-lg p-3 border border-destructive/20">
          {creatures.opponent.map((creature, index) => (
            <div 
              key={creature.id}
              className="relative cursor-pointer transform hover:scale-105 transition-all"
              onClick={() => selectedCreature && currentPlayer === 'player1' ? 
                handleCreatureAttack(selectedCreature, creature) : null
              }
            >
              <GameCard 
                card={creature} 
                className="h-28 text-xs"
              />
              <div className="absolute bottom-1 left-1 right-1">
                <div className="bg-black/70 rounded px-1 py-0.5 text-xs text-white">
                  HP: {creature.currentHealth}/{creature.maxHealth}
                </div>
              </div>
            </div>
          ))}
          {creatures.opponent.length === 0 && (
            <div className="col-span-3 flex items-center justify-center text-muted-foreground">
              <p className="text-sm">Campo vazio - Ataque direto disponível</p>
            </div>
          )}
        </div>
      </div>

      {/* Campo de Batalha do Jogador */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-primary flex items-center gap-2">
            <Crown className="w-5 h-5" />
            {player.name}
          </h3>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-primary" />
              {player.health}/30
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
              {player.energy}/10
            </Badge>
          </div>
        </div>

        {/* Criaturas do Jogador */}
        <div className="grid grid-cols-3 gap-3 min-h-[120px] bg-primary/5 rounded-lg p-3 border border-primary/20">
          {creatures.player.map((creature, index) => (
            <div 
              key={creature.id}
              className={`relative cursor-pointer transform hover:scale-105 transition-all ${
                selectedCreature?.id === creature.id ? 'ring-2 ring-primary' : ''
              } ${!creature.canAttack ? 'opacity-50' : ''}`}
              onClick={() => currentPlayer === 'player1' ? setSelectedCreature(creature) : null}
            >
              <GameCard 
                card={creature} 
                className="h-28 text-xs"
              />
              <div className="absolute bottom-1 left-1 right-1">
                <div className="bg-black/70 rounded px-1 py-0.5 text-xs text-white">
                  HP: {creature.currentHealth}/{creature.maxHealth}
                </div>
              </div>
              {!creature.canAttack && (
                <div className="absolute inset-0 bg-black/50 rounded flex items-center justify-center">
                  <span className="text-white text-xs">Atacou</span>
                </div>
              )}
            </div>
          ))}
          {creatures.player.length === 0 && (
            <div className="col-span-3 flex items-center justify-center text-muted-foreground">
              <p className="text-sm">Invoque criaturas para defender</p>
            </div>
          )}
        </div>
      </div>

      {/* Mão do Jogador */}
      {currentPlayer === 'player1' && (
        <div className="space-y-3">
          <h4 className="text-md font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Sua Mão ({player.hand.length} cartas)
          </h4>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {player.hand.map(card => (
              <div 
                key={card.id}
                className={`flex-shrink-0 cursor-pointer transform hover:scale-105 transition-all ${
                  selectedCard?.id === card.id ? 'ring-2 ring-accent' : ''
                } ${!canSummonCard(card, player.energy) ? 'opacity-50' : ''}`}
                onClick={() => canSummonCard(card, player.energy) ? handleCardPlay(card) : null}
              >
                <GameCard 
                  card={card} 
                  className="w-24 h-32 text-xs"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controles de Turno */}
      {currentPlayer === 'player1' && (
        <div className="flex flex-wrap gap-3 justify-center">
          {phase === 'draw' && (
            <Button 
              onClick={onDrawCard}
              className="bg-gradient-primary hover:bg-gradient-to-r hover:from-primary/90 hover:to-primary-foreground/90"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Comprar Carta
            </Button>
          )}
          
          {phase !== 'draw' && (
            <Button 
              onClick={onEndTurn}
              variant="outline"
              className="border-accent/50 hover:bg-accent/10"
            >
              <Shield className="w-4 h-4 mr-2" />
              Finalizar Turno
            </Button>
          )}

          {/* Botão de Ataque Direto */}
          {selectedCreature && creatures.opponent.length === 0 && phase === 'battle' && (
            <Button 
              onClick={() => handleCreatureAttack(selectedCreature)}
              variant="destructive"
              className="animate-glow"
            >
              <Swords className="w-4 h-4 mr-2" />
              Ataque Direto ({selectedCreature.attack} dano)
            </Button>
          )}
        </div>
      )}

      {/* Informações Selecionadas */}
      {selectedCreature && (
        <div className="bg-card/50 rounded-lg p-3 border border-border/50">
          <p className="text-sm text-muted-foreground">
            Criatura Selecionada: <span className="text-primary font-semibold">{selectedCreature.name}</span>
            {creatures.opponent.length > 0 
              ? " - Clique em uma criatura inimiga para atacar"
              : " - Clique em 'Ataque Direto' para atacar diretamente"
            }
          </p>
        </div>
      )}
    </div>
  );
};