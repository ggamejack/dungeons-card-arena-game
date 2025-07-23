export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'bronze' | 'silver' | 'gold' | 'legendary';
  progress: number;
  maxProgress: number;
  completed: boolean;
  reward?: {
    type: 'card' | 'coins' | 'title';
    value: string | number;
  };
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  type: 'adventure' | 'pvp' | 'collection' | 'daily';
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  opponent?: {
    name: string;
    avatar: string;
    deck: number[];
    strategy: string;
  };
  requirements: {
    type: 'win' | 'damage' | 'summon' | 'collect';
    target: string | number;
    current: number;
  }[];
  rewards: {
    type: 'coins' | 'card' | 'pack' | 'achievement';
    value: string | number;
    amount: number;
  }[];
  completed: boolean;
  unlocked: boolean;
}

export interface PlayerStats {
  totalWins: number;
  totalLosses: number;
  winStreak: number;
  bestWinStreak: number;
  totalDamageDealt: number;
  cardsCollected: number;
  totalCoins: number;
  legendaryCardsOwned: number;
  achievementsUnlocked: number;
  missionsCompleted: number;
}