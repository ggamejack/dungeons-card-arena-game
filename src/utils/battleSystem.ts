import { Card } from "@/types/Card";

export interface BattleResult {
  winner: 'player' | 'opponent' | null;
  damage: number;
  destroyed: boolean;
  counterDamage?: number;
  specialEffect?: string;
  freezeEffect?: boolean;
  healingEffect?: number;
  energyDrain?: number;
  multiAttack?: boolean;
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

// Calcula o custo de energia baseado na raridade da carta
export function getEnergyCostByRarity(rarity: string): number {
  switch (rarity) {
    case 'common': return Math.floor(Math.random() * 3) + 1; // 1-3
    case 'rare': return Math.floor(Math.random() * 3) + 3; // 3-5
    case 'epic': return Math.floor(Math.random() * 3) + 5; // 5-7
    case 'legendary': return Math.floor(Math.random() * 4) + 7; // 7-10
    default: return 1;
  }
}

// Verifica se a energia está no limite máximo (10)
export function isEnergyAtMax(currentEnergy: number): boolean {
  return currentEnergy >= 10;
}

// Adiciona energia respeitando o limite máximo
export function addEnergy(currentEnergy: number, amount: number): number {
  return Math.min(currentEnergy + amount, 10);
}

// Sistema de batalha melhorado com efeitos especiais
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

  // Efeitos especiais baseados na descrição das cartas
  const attackerEffects = getCardEffects(attackerCard);
  const defenderEffects = getCardEffects(defenderCard);

  // Aplicar modificadores de efeitos especiais
  let modifiedAttack = finalAttack;
  let modifiedDefense = defenderDefense;

  // Efeitos do atacante
  if (attackerEffects.attackBonus) {
    modifiedAttack += attackerEffects.attackBonus;
  }
  if (attackerEffects.freezeAttack && attackerCard.element === 'ice') {
    result.freezeEffect = true;
    result.specialEffect = `${attackerCard.name} congela o oponente!`;
  }
  if (attackerEffects.multiAttack) {
    result.multiAttack = true;
    result.specialEffect = `${attackerCard.name} ataca múltiplas vezes!`;
  }
  if (attackerEffects.drainEnergy) {
    result.energyDrain = 2;
    result.specialEffect = `${attackerCard.name} drena energia do oponente!`;
  }

  // Efeitos do defensor
  if (defenderEffects.defenseBonus) {
    modifiedDefense += defenderEffects.defenseBonus;
  }
  if (defenderEffects.healing) {
    result.healingEffect = defenderEffects.healing;
  }

  // Batalha principal
  if (modifiedAttack > modifiedDefense) {
    result.winner = 'player';
    result.damage = modifiedAttack - modifiedDefense;
    result.destroyed = true;
    
    // Efeito especial baseado no elemento se não houver outro
    if (!result.specialEffect && elementalMultiplier > 1.0) {
      result.specialEffect = `Vantagem elemental! ${attackerCard.element} vs ${defenderCard.element}`;
    }
  }
  // Defensor destrói atacante
  else if (modifiedDefense > modifiedAttack) {
    result.winner = 'opponent';
    result.counterDamage = modifiedDefense - modifiedAttack;
    result.destroyed = true;
  }
  // Empate - ambos são destruídos
  else {
    result.winner = null;
    result.destroyed = true;
  }

  return result;
}

// Analisa os efeitos especiais das cartas baseado na descrição
export function getCardEffects(card: Card): {
  attackBonus?: number;
  defenseBonus?: number;
  freezeAttack?: boolean;
  multiAttack?: boolean;
  drainEnergy?: boolean;
  healing?: number;
  directAttack?: boolean;
} {
  const effects: any = {};
  const description = card.description.toLowerCase();

  // Efeitos de ataque
  if (description.includes('sacrifica') || description.includes('ganha')) {
    effects.attackBonus = 1000;
  }
  if (description.includes('+500') || description.includes('aumenta')) {
    effects.attackBonus = 500;
  }
  if (description.includes('+300')) {
    effects.attackBonus = 300;
  }
  if (description.includes('+200')) {
    effects.attackBonus = 200;
  }

  // Efeitos de defesa
  if (description.includes('protege') || description.includes('imune')) {
    effects.defenseBonus = 500;
  }
  if (description.includes('não pode ser destruído')) {
    effects.defenseBonus = 1000;
  }

  // Efeitos especiais
  if (description.includes('congela') || description.includes('gelado')) {
    effects.freezeAttack = true;
  }
  if (description.includes('duas vezes') || description.includes('múltiplas')) {
    effects.multiAttack = true;
  }
  if (description.includes('drena') || description.includes('energia')) {
    effects.drainEnergy = true;
  }
  if (description.includes('cura') || description.includes('vida')) {
    effects.healing = 500;
  }
  if (description.includes('diretamente') || description.includes('ignorando')) {
    effects.directAttack = true;
  }

  return effects;
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