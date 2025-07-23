import { Achievement } from "@/types/Achievement";

export const achievements: Achievement[] = [
  // BRONZE ACHIEVEMENTS
  {
    id: "first_win",
    name: "Primeira Vitória",
    description: "Vença sua primeira batalha",
    icon: "🏆",
    rarity: "bronze",
    progress: 0,
    maxProgress: 1,
    completed: false,
    reward: { type: "coins", value: 100 }
  },
  {
    id: "card_collector",
    name: "Colecionador Iniciante",
    description: "Colete 10 cartas diferentes",
    icon: "📇",
    rarity: "bronze",
    progress: 0,
    maxProgress: 10,
    completed: false,
    reward: { type: "coins", value: 200 }
  },
  {
    id: "summoner",
    name: "Invocador",
    description: "Invoque 25 monstros em batalhas",
    icon: "🔮",
    rarity: "bronze",
    progress: 0,
    maxProgress: 25,
    completed: false,
    reward: { type: "coins", value: 150 }
  },

  // SILVER ACHIEVEMENTS
  {
    id: "win_streak_5",
    name: "Sequência Imparável",
    description: "Vença 5 batalhas consecutivas",
    icon: "⚡",
    rarity: "silver",
    progress: 0,
    maxProgress: 5,
    completed: false,
    reward: { type: "card", value: "2006" }
  },
  {
    id: "damage_dealer",
    name: "Destruidor",
    description: "Cause 10.000 pontos de dano total",
    icon: "💥",
    rarity: "silver",
    progress: 0,
    maxProgress: 10000,
    completed: false,
    reward: { type: "coins", value: 500 }
  },
  {
    id: "strategist",
    name: "Estrategista",
    description: "Vença 20 batalhas",
    icon: "🧠",
    rarity: "silver",
    progress: 0,
    maxProgress: 20,
    completed: false,
    reward: { type: "title", value: "Estrategista" }
  },

  // GOLD ACHIEVEMENTS
  {
    id: "legendary_collector",
    name: "Colecionador Lendário",
    description: "Possua 5 cartas lendárias",
    icon: "👑",
    rarity: "gold",
    progress: 0,
    maxProgress: 5,
    completed: false,
    reward: { type: "card", value: "2001" }
  },
  {
    id: "elemental_master",
    name: "Mestre Elemental",
    description: "Vença batalhas com todos os 6 elementos",
    icon: "🌟",
    rarity: "gold",
    progress: 0,
    maxProgress: 6,
    completed: false,
    reward: { type: "coins", value: 1000 }
  },
  {
    id: "champion",
    name: "Campeão",
    description: "Vença 50 batalhas",
    icon: "🏅",
    rarity: "gold",
    progress: 0,
    maxProgress: 50,
    completed: false,
    reward: { type: "title", value: "Campeão das Masmorras" }
  },

  // LEGENDARY ACHIEVEMENTS
  {
    id: "ultimate_collector",
    name: "Colecionador Supremo",
    description: "Colete todas as 100 cartas do jogo",
    icon: "💎",
    rarity: "legendary",
    progress: 0,
    maxProgress: 100,
    completed: false,
    reward: { type: "card", value: "2002" }
  },
  {
    id: "dungeon_master",
    name: "Mestre das Masmorras",
    description: "Complete todas as missões de aventura",
    icon: "🗝️",
    rarity: "legendary",
    progress: 0,
    maxProgress: 15,
    completed: false,
    reward: { type: "title", value: "Mestre das Masmorras" }
  },
  {
    id: "invincible",
    name: "Invencível",
    description: "Tenha uma sequência de 25 vitórias",
    icon: "⚔️",
    rarity: "legendary",
    progress: 0,
    maxProgress: 25,
    completed: false,
    reward: { type: "card", value: "71" }
  }
];