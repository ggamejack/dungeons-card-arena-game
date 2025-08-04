import React, { useState, useRef } from 'react';
import { GameCard } from './GameCard';
import { Card } from '@/types/Card';
import { cn } from '@/lib/utils';
import { Target, Crosshair, Swords } from 'lucide-react';

interface DragDropBattleFieldProps {
  playerHand: Card[];
  playerField: Card[];
  opponentField: Card[];
  onCardPlayed: (card: Card) => void;
  onCardAttack: (attackerCard: Card, targetCard?: Card) => void;
  onDirectAttack: (attackerCard: Card) => void;
  isPlayerTurn: boolean;
  canPlayCard: (card: Card) => boolean;
}

interface DragState {
  isDragging: boolean;
  draggedCard: Card | null;
  dragSource: 'hand' | 'field';
  mousePosition: { x: number; y: number };
}

export default function DragDropBattleField({
  playerHand,
  playerField,
  opponentField,
  onCardPlayed,
  onCardAttack,
  onDirectAttack,
  isPlayerTurn,
  canPlayCard
}: DragDropBattleFieldProps) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedCard: null,
    dragSource: 'hand',
    mousePosition: { x: 0, y: 0 }
  });
  
  const [targetHighlight, setTargetHighlight] = useState<string | null>(null);
  const [showTargetSelector, setShowTargetSelector] = useState(false);
  const battleFieldRef = useRef<HTMLDivElement>(null);
  const opponentAreaRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (card: Card, source: 'hand' | 'field', event: React.MouseEvent) => {
    if (!isPlayerTurn) return;
    
    event.preventDefault();
    setDragState({
      isDragging: true,
      draggedCard: card,
      dragSource: source,
      mousePosition: { x: event.clientX, y: event.clientY }
    });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (dragState.isDragging) {
      setDragState(prev => ({
        ...prev,
        mousePosition: { x: event.clientX, y: event.clientY }
      }));

      // Check if we're over the battlefield or opponent area for highlighting
      if (battleFieldRef.current) {
        const battleFieldRect = battleFieldRef.current.getBoundingClientRect();
        const isOverBattleField = (
          event.clientX >= battleFieldRect.left &&
          event.clientX <= battleFieldRect.right &&
          event.clientY >= battleFieldRect.top &&
          event.clientY <= battleFieldRect.bottom
        );

        if (isOverBattleField && dragState.dragSource === 'hand' && dragState.draggedCard?.type === 'monster') {
          setTargetHighlight('battlefield');
        } else {
          setTargetHighlight(null);
        }
      }

      if (opponentAreaRef.current) {
        const opponentRect = opponentAreaRef.current.getBoundingClientRect();
        const isOverOpponent = (
          event.clientX >= opponentRect.left &&
          event.clientX <= opponentRect.right &&
          event.clientY >= opponentRect.top &&
          event.clientY <= opponentRect.bottom
        );

        if (isOverOpponent && dragState.dragSource === 'field') {
          setTargetHighlight('opponent');
        }
      }
    }
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    if (!dragState.isDragging || !dragState.draggedCard) return;

    const card = dragState.draggedCard;

    // Check if dropped on battlefield (for summoning)
    if (battleFieldRef.current && dragState.dragSource === 'hand') {
      const battleFieldRect = battleFieldRef.current.getBoundingClientRect();
      const isOverBattleField = (
        event.clientX >= battleFieldRect.left &&
        event.clientX <= battleFieldRect.right &&
        event.clientY >= battleFieldRect.top &&
        event.clientY <= battleFieldRect.bottom
      );

      if (isOverBattleField && card.type === 'monster' && canPlayCard(card)) {
        onCardPlayed(card);
      }
    }

    // Check if dropped on opponent area (for attacking)
    if (opponentAreaRef.current && dragState.dragSource === 'field') {
      const opponentRect = opponentAreaRef.current.getBoundingClientRect();
      const isOverOpponent = (
        event.clientX >= opponentRect.left &&
        event.clientX <= opponentRect.right &&
        event.clientY >= opponentRect.top &&
        event.clientY <= opponentRect.bottom
      );

      if (isOverOpponent) {
        if (opponentField.length === 0) {
          // Direct attack
          onDirectAttack(card);
        } else {
          // Show target selector
          setShowTargetSelector(true);
          return; // Don't reset drag state yet
        }
      }
    }

    // Reset drag state
    setDragState({
      isDragging: false,
      draggedCard: null,
      dragSource: 'hand',
      mousePosition: { x: 0, y: 0 }
    });
    setTargetHighlight(null);
    setShowTargetSelector(false);
  };

  const handleTargetSelect = (target: Card) => {
    if (dragState.draggedCard) {
      onCardAttack(dragState.draggedCard, target);
    }
    setShowTargetSelector(false);
    setDragState({
      isDragging: false,
      draggedCard: null,
      dragSource: 'hand',
      mousePosition: { x: 0, y: 0 }
    });
    setTargetHighlight(null);
  };

  const handleDirectAttackFromSelector = () => {
    if (dragState.draggedCard) {
      onDirectAttack(dragState.draggedCard);
    }
    setShowTargetSelector(false);
    setDragState({
      isDragging: false,
      draggedCard: null,
      dragSource: 'hand',
      mousePosition: { x: 0, y: 0 }
    });
    setTargetHighlight(null);
  };

  return (
    <div 
      className="relative w-full h-full select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setDragState({
          isDragging: false,
          draggedCard: null,
          dragSource: 'hand',
          mousePosition: { x: 0, y: 0 }
        });
        setTargetHighlight(null);
        setShowTargetSelector(false);
      }}
    >
      {/* Opponent Field */}
      <div 
        ref={opponentAreaRef}
        className={cn(
          "p-4 mb-4 rounded-xl border-2 transition-all duration-300",
          "bg-destructive/5 border-destructive/20",
          targetHighlight === 'opponent' && "bg-destructive/20 border-destructive/60 shadow-lg animate-pulse"
        )}
      >
        <h3 className="text-sm font-bold text-destructive mb-2 flex items-center gap-2">
          <Swords className="w-4 h-4" />
          Campo Inimigo {opponentField.length > 0 && `(${opponentField.length}/5)`}
        </h3>
        <div className="grid grid-cols-5 gap-2 min-h-[100px]">
          {Array.from({ length: 5 }, (_, index) => {
            const card = opponentField[index];
            return (
              <div key={index} className="relative">
                {card ? (
                  <div className="transform scale-75 origin-center">
                    <GameCard 
                      card={card}
                      className={cn(
                        "transition-all duration-200",
                        showTargetSelector && "ring-2 ring-destructive/50 cursor-pointer hover:ring-destructive hover:scale-110"
                      )}
                      onClick={() => showTargetSelector && handleTargetSelect(card)}
                    />
                  </div>
                ) : (
                  <div className="w-full h-24 border border-dashed border-destructive/30 rounded-lg bg-destructive/5"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Battle Field (Player Field) */}
      <div 
        ref={battleFieldRef}
        className={cn(
          "p-4 mb-4 rounded-xl border-2 transition-all duration-300",
          "bg-primary/5 border-primary/20",
          targetHighlight === 'battlefield' && "bg-primary/20 border-primary/60 shadow-lg animate-pulse"
        )}
      >
        <h3 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
          <Swords className="w-4 h-4" />
          Seu Campo {playerField.length > 0 && `(${playerField.length}/5)`}
        </h3>
        <div className="grid grid-cols-5 gap-2 min-h-[100px]">
          {Array.from({ length: 5 }, (_, index) => {
            const card = playerField[index];
            return (
              <div key={index} className="relative">
                {card ? (
                  <div 
                    className="transform scale-75 origin-center cursor-grab active:cursor-grabbing"
                    onMouseDown={(e) => handleMouseDown(card, 'field', e)}
                  >
                    <GameCard 
                      card={card}
                      className={cn(
                        "transition-all duration-200",
                        dragState.draggedCard?.id === card.id && "opacity-50"
                      )}
                    />
                  </div>
                ) : (
                  <div className="w-full h-24 border border-dashed border-primary/30 rounded-lg bg-primary/5 flex items-center justify-center">
                    {targetHighlight === 'battlefield' && (
                      <Target className="w-6 h-6 text-primary/50 animate-pulse" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Player Hand */}
      <div className="p-4 bg-card/50 rounded-xl border border-border">
        <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
          <span>Sua Mão ({playerHand.length})</span>
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {playerHand.map((card) => (
            <div
              key={card.id}
              className={cn(
                "flex-shrink-0 transform scale-75 origin-center transition-all duration-200",
                isPlayerTurn && card.type === 'monster' && canPlayCard(card) 
                  ? "cursor-grab active:cursor-grabbing hover:scale-80" 
                  : "opacity-60 cursor-not-allowed",
                dragState.draggedCard?.id === card.id && "opacity-50"
              )}
              onMouseDown={(e) => 
                isPlayerTurn && card.type === 'monster' && canPlayCard(card) 
                  ? handleMouseDown(card, 'hand', e) 
                  : undefined
              }
            >
              <GameCard card={card} />
            </div>
          ))}
        </div>
      </div>

      {/* Dragged Card Ghost */}
      {dragState.isDragging && dragState.draggedCard && (
        <div
          className="fixed pointer-events-none z-50 transform scale-75 opacity-80"
          style={{
            left: dragState.mousePosition.x - 96, // Half card width
            top: dragState.mousePosition.y - 144, // Half card height
          }}
        >
          <GameCard card={dragState.draggedCard} />
        </div>
      )}

      {/* Target Selector Modal */}
      {showTargetSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-xl border border-border max-w-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Crosshair className="w-5 h-5" />
              Escolha o Alvo para Atacar
            </h3>
            
            <div className="space-y-4">
              {/* Direct Attack Option */}
              {opponentField.length === 0 && (
                <button
                  onClick={handleDirectAttackFromSelector}
                  className="w-full p-4 bg-destructive/10 hover:bg-destructive/20 rounded-lg border border-destructive/30 transition-colors"
                >
                  <div className="text-center">
                    <Swords className="w-8 h-8 mx-auto mb-2 text-destructive" />
                    <p className="font-bold text-destructive">Ataque Direto</p>
                    <p className="text-sm text-muted-foreground">Atacar diretamente o oponente</p>
                  </div>
                </button>
              )}

              {/* Monster Targets */}
              {opponentField.length > 0 && (
                <>
                  <p className="text-sm text-muted-foreground">Escolha um monstro inimigo para atacar:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {opponentField.map((card) => (
                      <button
                        key={card.id}
                        onClick={() => handleTargetSelect(card)}
                        className="p-3 bg-destructive/5 hover:bg-destructive/15 rounded-lg border border-destructive/20 hover:border-destructive/40 transition-all transform hover:scale-105"
                      >
                        <div className="transform scale-50 origin-center">
                          <GameCard card={card} />
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={handleDirectAttackFromSelector}
                    className="w-full p-3 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/30 transition-colors"
                  >
                    <div className="text-center">
                      <Target className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <p className="font-bold text-primary">Ataque Direto</p>
                      <p className="text-xs text-muted-foreground">Ignorar monstros e atacar diretamente</p>
                    </div>
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => setShowTargetSelector(false)}
              className="mt-4 w-full p-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg border border-secondary/30 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}