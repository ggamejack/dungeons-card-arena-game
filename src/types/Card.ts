export type CardType = 'monster' | 'magic' | 'trap';
export type Element = 'fire' | 'ice' | 'earth' | 'lightning' | 'holy' | 'shadow';

export interface Card {
  id: number;
  name: string;
  type: CardType;
  element?: Element;
  attack?: number;
  defense?: number;
  level: number;
  description: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  cost: number;
}

export interface Player {
  id: string;
  name: string;
  health: number;
  hand: Card[];
  deck: Card[];
  field: Card[];
  graveyard: Card[];
}

export interface GameState {
  player1: Player;
  player2: Player;
  currentPlayer: string;
  phase: 'draw' | 'main' | 'battle' | 'end';
  turn: number;
}