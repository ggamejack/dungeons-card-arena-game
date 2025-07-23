import { Mission } from "@/types/Achievement";

export const adventureMissions: Mission[] = [
  // EASY ADVENTURE MISSIONS
  {
    id: "forest_guardian",
    name: "Guardião da Floresta",
    description: "Derrote o antigo protetor das florestas encantadas",
    type: "adventure",
    difficulty: "easy",
    opponent: {
      name: "Ent Ancestral",
      avatar: "/lovable-uploads/5f0e9482-2619-4088-95c5-070d7faa0f57.png",
      deck: [42, 43, 102, 200],
      strategy: "Foca em defesa e monstros de terra"
    },
    requirements: [
      { type: "win", target: 1, current: 0 }
    ],
    rewards: [
      { type: "coins", value: 200, amount: 1 },
      { type: "card", value: 42, amount: 1 }
    ],
    completed: false,
    unlocked: true
  },
  {
    id: "fire_caves",
    name: "Cavernas de Fogo",
    description: "Sobreviva às chamas eternas das profundezas",
    type: "adventure",
    difficulty: "easy",
    opponent: {
      name: "Salamandra Jovem",
      avatar: "/lovable-uploads/5d26b512-6c40-4b73-9488-03629396725d.png",
      deck: [13, 101, 200, 102],
      strategy: "Ataques rápidos com dano direto"
    },
    requirements: [
      { type: "win", target: 1, current: 0 }
    ],
    rewards: [
      { type: "coins", value: 200, amount: 1 },
      { type: "card", value: 101, amount: 1 }
    ],
    completed: false,
    unlocked: true
  },

  // MEDIUM ADVENTURE MISSIONS
  {
    id: "crystal_tower",
    name: "Torre de Cristal",
    description: "Escale a misteriosa torre e derrote seu guardião",
    type: "adventure",
    difficulty: "medium",
    opponent: {
      name: "Golem de Cristal Menor",
      avatar: "/lovable-uploads/15a8d434-2b12-4b22-8537-31e198cdcdd8.png",
      deck: [5, 42, 102, 103, 201],
      strategy: "Defesa massiva com cura"
    },
    requirements: [
      { type: "win", target: 1, current: 0 },
      { type: "damage", target: 3000, current: 0 }
    ],
    rewards: [
      { type: "coins", value: 400, amount: 1 },
      { type: "card", value: 5, amount: 1 }
    ],
    completed: false,
    unlocked: false
  },
  {
    id: "storm_peaks",
    name: "Picos da Tempestade",
    description: "Enfrente os ventos furiosos e suas criaturas aladas",
    type: "adventure",
    difficulty: "medium",
    opponent: {
      name: "Senhor dos Ventos",
      avatar: "/lovable-uploads/62b17c0b-1bf5-408c-af13-58d64764e32f.png",
      deck: [32, 33, 104, 202],
      strategy: "Controle do campo com raios"
    },
    requirements: [
      { type: "win", target: 1, current: 0 }
    ],
    rewards: [
      { type: "coins", value: 400, amount: 1 },
      { type: "card", value: 104, amount: 1 }
    ],
    completed: false,
    unlocked: false
  },

  // HARD ADVENTURE MISSIONS
  {
    id: "shadow_realm",
    name: "Reino das Sombras",
    description: "Adentre as trevas e derrote o Lorde Negro",
    type: "adventure",
    difficulty: "hard",
    opponent: {
      name: "Lorde das Trevas",
      avatar: "/lovable-uploads/b2134732-27f5-4692-b93d-e70e66db1b0c.png",
      deck: [3, 61, 62, 202, 2003],
      strategy: "Magia das trevas e drenagem de vida"
    },
    requirements: [
      { type: "win", target: 1, current: 0 },
      { type: "summon", target: "holy", current: 0 }
    ],
    rewards: [
      { type: "coins", value: 600, amount: 1 },
      { type: "card", value: 3, amount: 1 },
      { type: "achievement", value: "shadow_slayer", amount: 1 }
    ],
    completed: false,
    unlocked: false
  },
  {
    id: "dragon_lair",
    name: "Covil do Dragão",
    description: "Desafie o poderoso dragão ancestral em seu próprio território",
    type: "adventure",
    difficulty: "hard",
    opponent: {
      name: "Dragão Ancião",
      avatar: "/lovable-uploads/896816f6-7b9a-4f82-9500-6ec8d0310dbf.png",
      deck: [1, 11, 12, 100, 2002],
      strategy: "Poder de fogo extremo"
    },
    requirements: [
      { type: "win", target: 1, current: 0 }
    ],
    rewards: [
      { type: "coins", value: 800, amount: 1 },
      { type: "card", value: 1, amount: 1 }
    ],
    completed: false,
    unlocked: false
  },

  // LEGENDARY ADVENTURE MISSIONS
  {
    id: "void_emperor",
    name: "Imperador do Vazio",
    description: "Confronte o ser supremo das dimensões paralelas",
    type: "adventure",
    difficulty: "legendary",
    opponent: {
      name: "Imperador do Vazio",
      avatar: "/lovable-uploads/517299d0-5067-485f-a545-b3c3f3310e94.png",
      deck: [7, 71, 2008, 202, 2010],
      strategy: "Controle absoluto do campo"
    },
    requirements: [
      { type: "win", target: 1, current: 0 },
      { type: "damage", target: 5000, current: 0 }
    ],
    rewards: [
      { type: "coins", value: 1500, amount: 1 },
      { type: "card", value: 71, amount: 1 },
      { type: "achievement", value: "void_conqueror", amount: 1 }
    ],
    completed: false,
    unlocked: false
  },
  {
    id: "titan_awakening",
    name: "Despertar do Titã",
    description: "Desperte e derrote o lendário Titã de Pedra",
    type: "adventure",
    difficulty: "legendary",
    opponent: {
      name: "Titã Primordial",
      avatar: "/lovable-uploads/3833f380-167f-4450-8c55-edd75f89573a.png",
      deck: [6, 74, 43, 2005, 2008],
      strategy: "Resistência extrema e contra-ataques"
    },
    requirements: [
      { type: "win", target: 1, current: 0 }
    ],
    rewards: [
      { type: "coins", value: 2000, amount: 1 },
      { type: "card", value: 74, amount: 1 },
      { type: "achievement", value: "titan_slayer", amount: 1 }
    ],
    completed: false,
    unlocked: false
  }
];

export const dailyMissions: Mission[] = [
  {
    id: "daily_win",
    name: "Vitória Diária",
    description: "Vença 3 batalhas hoje",
    type: "daily",
    difficulty: "easy",
    requirements: [
      { type: "win", target: 3, current: 0 }
    ],
    rewards: [
      { type: "coins", value: 100, amount: 1 }
    ],
    completed: false,
    unlocked: true
  },
  {
    id: "daily_damage",
    name: "Destruição Diária",
    description: "Cause 2000 pontos de dano hoje",
    type: "daily",
    difficulty: "medium",
    requirements: [
      { type: "damage", target: 2000, current: 0 }
    ],
    rewards: [
      { type: "coins", value: 150, amount: 1 }
    ],
    completed: false,
    unlocked: true
  },
  {
    id: "daily_collection",
    name: "Coleta Diária",
    description: "Invoque 10 monstros diferentes hoje",
    type: "daily",
    difficulty: "medium",
    requirements: [
      { type: "summon", target: 10, current: 0 }
    ],
    rewards: [
      { type: "coins", value: 200, amount: 1 },
      { type: "pack", value: "basic", amount: 1 }
    ],
    completed: false,
    unlocked: true
  }
];