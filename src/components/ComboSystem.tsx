import React, { useState, useEffect } from 'react';
import { Card } from '@/types/Card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Flame, Snowflake, Crown, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ComboEffect {
  id: string;
  name: string;
  description: string;
  cards: string[];
  effect: {
    type: 'damage' | 'heal' | 'energyBoost' | 'attackBoost' | 'defenseBoost';
    value: number;
  };
  icon: React.ReactNode;
}

const COMBO_DEFINITIONS: ComboEffect[] = [
  {
    id: 'elemental_fury',
    name: 'Fúria Elemental',
    description: 'Use 3 cartas do mesmo elemento para +500 ATK',
    cards: [], // Will be populated dynamically
    effect: { type: 'attackBoost', value: 500 },
    icon: <Flame className="w-4 h-4" />
  },
  {
    id: 'divine_trinity',
    name: 'Trindade Divina',
    description: 'Use 3 cartas Holy para curar 15 HP',
    cards: [], // Will be populated dynamically  
    effect: { type: 'heal', value: 15 },
    icon: <Crown className="w-4 h-4" />
  },
  {
    id: 'shadow_drain',
    name: 'Drenar Sombrio',
    description: 'Use 2 cartas Shadow para +3 energia',
    cards: [], // Will be populated dynamically
    effect: { type: 'energyBoost', value: 3 },
    icon: <Zap className="w-4 h-4" />
  },
  {
    id: 'ice_wall',
    name: 'Muralha de Gelo',
    description: 'Use 2 cartas Ice para +300 DEF em todas criaturas',
    cards: [], // Will be populated dynamically
    effect: { type: 'defenseBoost', value: 300 },
    icon: <Snowflake className="w-4 h-4" />
  }
];

interface ComboSystemProps {
  cardsPlayed: Card[];
  onComboActivated: (combo: ComboEffect) => void;
}

export const ComboSystem: React.FC<ComboSystemProps> = ({
  cardsPlayed,
  onComboActivated
}) => {
  const { toast } = useToast();
  const [activeCombo, setActiveCombo] = useState<ComboEffect | null>(null);
  const [comboProgress, setComboProgress] = useState<{[key: string]: number}>({});

  // Detectar combos baseados nas cartas jogadas
  useEffect(() => {
    const elementCount: {[key: string]: number} = {};
    
    // Contar elementos das cartas jogadas nos últimos 3 turnos
    cardsPlayed.slice(-6).forEach(card => {
      if (card.element) {
        elementCount[card.element] = (elementCount[card.element] || 0) + 1;
      }
    });

    // Verificar combos
    checkElementalFury(elementCount);
    checkDivineTrinity(elementCount);
    checkShadowDrain(elementCount);
    checkIceWall(elementCount);

  }, [cardsPlayed]);

  const checkElementalFury = (elementCount: {[key: string]: number}) => {
    Object.entries(elementCount).forEach(([element, count]) => {
      if (count >= 3) {
        activateCombo(COMBO_DEFINITIONS[0]);
      } else if (count >= 2) {
        updateComboProgress('elemental_fury', count, 3);
      }
    });
  };

  const checkDivineTrinity = (elementCount: {[key: string]: number}) => {
    if (elementCount.holy >= 3) {
      activateCombo(COMBO_DEFINITIONS[1]);
    } else if (elementCount.holy >= 1) {
      updateComboProgress('divine_trinity', elementCount.holy, 3);
    }
  };

  const checkShadowDrain = (elementCount: {[key: string]: number}) => {
    if (elementCount.shadow >= 2) {
      activateCombo(COMBO_DEFINITIONS[2]);
    } else if (elementCount.shadow >= 1) {
      updateComboProgress('shadow_drain', elementCount.shadow, 2);
    }
  };

  const checkIceWall = (elementCount: {[key: string]: number}) => {
    if (elementCount.ice >= 2) {
      activateCombo(COMBO_DEFINITIONS[3]);
    } else if (elementCount.ice >= 1) {
      updateComboProgress('ice_wall', elementCount.ice, 2);
    }
  };

  const updateComboProgress = (comboId: string, current: number, required: number) => {
    setComboProgress(prev => ({
      ...prev,
      [comboId]: current
    }));
  };

  const activateCombo = (combo: ComboEffect) => {
    if (activeCombo?.id === combo.id) return; // Evitar duplicação

    setActiveCombo(combo);
    onComboActivated(combo);

    toast({
      title: `🌟 COMBO ATIVADO!`,
      description: `${combo.name}: ${combo.description}`,
      duration: 4000,
    });

    // Reset combo após ativação
    setTimeout(() => {
      setActiveCombo(null);
      setComboProgress(prev => ({
        ...prev,
        [combo.id]: 0
      }));
    }, 3000);
  };

  const getComboProgressBar = (comboId: string, required: number) => {
    const current = comboProgress[comboId] || 0;
    const percentage = (current / required) * 100;
    
    return (
      <div className="w-full bg-muted/20 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Combo Ativo */}
      {activeCombo && (
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-4 border border-primary/40 animate-glow">
          <div className="flex items-center gap-3">
            {activeCombo.icon}
            <div>
              <h3 className="text-lg font-bold text-primary">{activeCombo.name}</h3>
              <p className="text-sm text-muted-foreground">{activeCombo.description}</p>
            </div>
            <Badge variant="default" className="ml-auto">
              ATIVO
            </Badge>
          </div>
        </div>
      )}

      {/* Progresso dos Combos */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Progresso dos Combos
        </h4>
        
        {COMBO_DEFINITIONS.map(combo => {
          const required = combo.id === 'elemental_fury' || combo.id === 'divine_trinity' ? 3 : 2;
          const current = comboProgress[combo.id] || 0;
          
          return (
            <div key={combo.id} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {combo.icon}
                  <span className="font-medium">{combo.name}</span>
                </div>
                <span className="text-muted-foreground">
                  {current}/{required}
                </span>
              </div>
              {getComboProgressBar(combo.id, required)}
            </div>
          );
        })}
      </div>

      {/* Dica de Combo */}
      <div className="bg-card/30 rounded-lg p-3 border border-border/50">
        <p className="text-xs text-muted-foreground">
          💡 <strong>Dica:</strong> Use cartas do mesmo elemento em sequência para ativar combos poderosos!
        </p>
      </div>
    </div>
  );
};