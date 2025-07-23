import { Card } from "@/types/Card";

export interface BattleResult {
  winner: 'player' | 'opponent' | null;
  damage: number;
  destroyed: boolean;
  counterDamage?: number;
  specialEffect?: string;
}

export interface PointsCalculation {
  basePoints: number;
  bonusPoints: number;
  totalPoints: number;
  breakdown: {
    winBonus: number;
    damageBonus: number;
    speedBonus: number;
    elementalBonus: number;
    rarityBonus: number;
    comboBonus: number;
  };
}

// Calcula vantagem elemental (multiplicador de dano)
export function getElementalAdvantage(attacker: Card, defender: Card): number {
  if (!attacker.element || !defender.element) return 1.0;
  
  const advantages: { [key: string]: string[] } = {
    fire: ['ice', 'earth'],
    ice: ['lightning', 'fire'],
    lightning: ['holy', 'ice'], 
    holy: ['shadow', 'lightning'],
    shadow: ['earth', 'holy'],
    earth: ['fire', 'shadow']
  };
  
  if (advantages[attacker.element]?.includes(defender.element)) {
    return 1.5; // 50% de bônus
  }
  
  if (advantages[defender.element]?.includes(attacker.element)) {
    return 0.7; // 30% de redução
  }
  
  return 1.0; // Neutro
}

// Verifica se o jogador tem energia suficiente para invocar a carta
export function canSummonCard(card: Card, currentEnergy: number): boolean {
  return currentEnergy >= card.cost;
}

// Sistema de batalha melhorado
export function calculateBattle(
  attackerCard: Card, 
  defenderCard?: Card, 
  isDirectAttack: boolean = false
): BattleResult {
  if (isDirectAttack || !defenderCard) {
    return {
      winner: 'player',
      damage: attackerCard.attack || 0,
      destroyed: false
    };
  }

  const elementalMultiplier = getElementalAdvantage(attackerCard, defenderCard);
  const finalAttack = Math.floor((attackerCard.attack || 0) * elementalMultiplier);
  const defenderDefense = defenderCard.defense || 0;
  
  let result: BattleResult = {
    winner: null,
    damage: 0,
    destroyed: false
  };

  // Atacante destrói defensor
  if (finalAttack > defenderDefense) {
    result.winner = 'player';
    result.damage = finalAttack - defenderDefense;
    result.destroyed = true;
    
    // Efeito especial baseado no elemento
    if (elementalMultiplier > 1.0) {
      result.specialEffect = `Vantagem elemental! ${attackerCard.element} vs ${defenderCard.element}`;
    }
  }
  // Defensor destrói atacante
  else if (defenderDefense > finalAttack) {
    result.winner = 'opponent';
    result.counterDamage = defenderDefense - finalAttack;
    result.destroyed = true;
  }
  // Empate - ambos são destruídos
  else {
    result.winner = null;
    result.destroyed = true;
  }

  return result;
}

// Sistema de pontos avançado
export function calculateBattlePoints(
  gameState: {
    winner: 'player' | 'opponent' | null;
    turnCount: number;
    playerHealth: number;
    totalDamageDealt: number;
    cardsUsed: Card[];
    combosUsed: number;
  }
): PointsCalculation {
  const breakdown = {
    winBonus: 0,
    damageBonus: 0,
    speedBonus: 0,
    elementalBonus: 0,
    rarityBonus: 0,
    comboBonus: 0
  };

  // Bônus de vitória
  if (gameState.winner === 'player') {
    breakdown.winBonus = 1000;
    
    // Bônus de velocidade (menos turnos = mais pontos)
    if (gameState.turnCount <= 5) breakdown.speedBonus = 500;
    else if (gameState.turnCount <= 10) breakdown.speedBonus = 300;
    else if (gameState.turnCount <= 15) breakdown.speedBonus = 100;
    
    // Bônus de saúde restante
    const healthBonus = Math.floor(gameState.playerHealth / 100) * 50;
    breakdown.winBonus += healthBonus;
  }

  // Bônus de dano
  breakdown.damageBonus = Math.floor(gameState.totalDamageDealt / 100) * 10;

  // Bônus de raridade das cartas usadas
  gameState.cardsUsed.forEach(card => {
    switch (card.rarity) {
      case 'legendary': breakdown.rarityBonus += 100; break;
      case 'epic': breakdown.rarityBonus += 50; break;
      case 'rare': breakdown.rarityBonus += 25; break;
      case 'uncommon': breakdown.rarityBonus += 10; break;
      default: breakdown.rarityBonus += 5; break;
    }
  });

  // Bônus de variedade elemental
  const uniqueElements = new Set(
    gameState.cardsUsed
      .filter(card => card.element)
      .map(card => card.element)
  );
  breakdown.elementalBonus = uniqueElements.size * 50;

  // Bônus de combos
  breakdown.comboBonus = gameState.combosUsed * 100;

  const basePoints = Object.values(breakdown).reduce((sum, points) => sum + points, 0);
  const bonusPoints = Math.floor(basePoints * 0.1); // 10% de bônus
  const totalPoints = basePoints + bonusPoints;

  return {
    basePoints,
    bonusPoints,
    totalPoints,
    breakdown
  };
}

// Sistema de AI melhorado
export function getAIStrategy(
  aiHand: Card[], 
  playerField: Card[], 
  aiHealth: number,
  playerHealth: number
): { action: 'summon' | 'attack' | 'direct', card?: Card, target?: Card } {
  
  // Se a vida está baixa, priorizar cura ou defesa
  if (aiHealth <= 2000) {
    const healingCard = aiHand.find(card => card.type === 'magic' && card.description.includes('vida'));
    if (healingCard) {
      return { action: 'summon', card: healingCard };
    }
    
    const defensiveCard = aiHand
      .filter(card => card.type === 'monster')
      .sort((a, b) => (b.defense || 0) - (a.defense || 0))[0];
    if (defensiveCard) {
      return { action: 'summon', card: defensiveCard };
    }
  }

  // Se pode vencer com ataque direto
  if (playerField.length === 0) {
    const strongestCard = aiHand
      .filter(card => card.type === 'monster')
      .sort((a, b) => (b.attack || 0) - (a.attack || 0))[0];
    if (strongestCard && (strongestCard.attack || 0) >= playerHealth) {
      return { action: 'direct', card: strongestCard };
    }
  }

  // Estratégia de contra-ataque
  if (playerField.length > 0) {
    const weakestPlayerCard = playerField.sort((a, b) => (a.defense || 0) - (b.defense || 0))[0];
    const counterCard = aiHand
      .filter(card => card.type === 'monster' && (card.attack || 0) > (weakestPlayerCard.defense || 0))
      .sort((a, b) => (a.attack || 0) - (b.attack || 0))[0];
    
    if (counterCard) {
      return { action: 'attack', card: counterCard, target: weakestPlayerCard };
    }
  }

  // Estratégia padrão: invocar carta mais forte
  const bestCard = aiHand
    .filter(card => card.type === 'monster')
    .sort((a, b) => ((b.attack || 0) + (b.defense || 0)) - ((a.attack || 0) + (a.defense || 0)))[0];
  
  if (bestCard) {
    return { action: 'summon', card: bestCard };
  }

  return { action: 'summon' };
}