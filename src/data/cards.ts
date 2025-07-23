import { Card } from "@/types/Card";

// Deck cover images
export const deckCovers = {
  dragonsFire: "/dungeons-card-arena-game/lovable-uploads/43109396-a769-44b4-818f-1f797ee22f52.png",
  celestialGuardians: "/dungeons-card-arena-game/lovable-uploads/b745b9a0-bb80-4788-92ff-04357d1d3a69.png",
  eternalShadows: "/dungeons-card-arena-game/lovable-uploads/9eecb997-c318-4245-8002-492ea0f546bf.png",
  pureElements: "/dungeons-card-arena-game/lovable-uploads/15a8d434-2b12-4b22-8537-31e198cdcdd8.png"
};

// Card images using public URLs for GitHub Pages compatibility
const phoenixScarlet = "/dungeons-card-arena-game/lovable-uploads/43109396-a769-44b4-818f-1f797ee22f52.png";
const leviathanAbyss = "/dungeons-card-arena-game/lovable-uploads/93e1cfb2-1a99-42de-b3f1-c70a260bd479.png";
const demonEternalNight = "/dungeons-card-arena-game/lovable-uploads/9eecb997-c318-4245-8002-492ea0f546bf.png";
const guardianAngel = "/dungeons-card-arena-game/lovable-uploads/b745b9a0-bb80-4788-92ff-04357d1d3a69.png";
const crystalGolem = "/dungeons-card-arena-game/lovable-uploads/15a8d434-2b12-4b22-8537-31e198cdcdd8.png";
const meteorRain = "/dungeons-card-arena-game/lovable-uploads/38499ffe-dbfa-4b49-a357-8cac32af8b3c.png";

export const gameCards: Card[] = [
  // LEGENDARY MONSTERS BASED ON DETAILED PROMPTS
  {
    id: 1,
    name: "Fênix Escarlate",
    type: "monster",
    element: "fire",
    attack: 2400,
    defense: 1600,
    level: 6,
    description: "Renasce com metade do ATK após ser destruída.",
    image: phoenixScarlet,
    rarity: "legendary",
    cost: 6
  },
  {
    id: 2,
    name: "Leviatã do Abismo",
    type: "monster",
    element: "ice",
    attack: 2800,
    defense: 2200,
    level: 8,
    description: "Reduz o ATK de monstros de fogo em 1000.",
    image: leviathanAbyss,
    rarity: "legendary",
    cost: 8
  },
  {
    id: 3,
    name: "Demônio da Noite Eterna",
    type: "monster",
    element: "shadow",
    attack: 3000,
    defense: 1800,
    level: 9,
    description: "Sacrifica 1 carta do campo para ganhar +1000 ATK até o fim do turno.",
    image: demonEternalNight,
    rarity: "legendary",
    cost: 9
  },
  {
    id: 4,
    name: "Anjo Guardião",
    type: "monster",
    element: "holy",
    attack: 2300,
    defense: 2700,
    level: 7,
    description: "Protege monstros aliados por 1 turno.",
    image: guardianAngel,
    rarity: "legendary",
    cost: 7
  },
  {
    id: 5,
    name: "Golem de Cristal",
    type: "monster",
    element: "earth",
    attack: 1800,
    defense: 3000,
    level: 7,
    description: "Não pode ser destruído por monstros com ATK < 2000.",
    image: crystalGolem,
    rarity: "legendary",
    cost: 7
  },

  // EXISTING LEGENDARY DEFENDERS
  {
    id: 6,
    name: "Titã de Pedra Ancestral",
    type: "monster",
    element: "earth",
    attack: 2000,
    defense: 3000,
    level: 9,
    description: "Guardião colossal das montanhas sagradas.",
    image: "/dungeons-card-arena-game/lovable-uploads/3833f380-167f-4450-8c55-edd75f89573a.png",
    rarity: "legendary",
    cost: 7
  },
  {
    id: 7,
    name: "Mestre do Vazio Eterno",
    type: "monster",
    element: "shadow",
    attack: 2200,
    defense: 3000,
    level: 9,
    description: "Senhor supremo das dimensões sombrias.",
    image: "/dungeons-card-arena-game/lovable-uploads/517299d0-5067-485f-a545-b3c3f3310e94.png",
    rarity: "legendary",
    cost: 7
  },

  // FIRE ELEMENT MONSTERS
  {
    id: 11,
    name: "Dragão Flamejante",
    type: "monster",
    element: "fire",
    attack: 2800,
    defense: 2000,
    level: 9,
    description: "Destrói uma carta de auxílio inimiga ao atacar.",
    image: "/dungeons-card-arena-game/lovable-uploads/896816f6-7b9a-4f82-9500-6ec8d0310dbf.png",
    rarity: "epic",
    cost: 7
  },
  {
    id: 12,
    name: "Salamandra das Chamas",
    type: "monster",
    element: "fire",
    attack: 2200,
    defense: 1600,
    level: 7,
    description: "Aumenta o ATK de todos os monstros de Fogo em 500.",
    image: "/dungeons-card-arena-game/lovable-uploads/5d26b512-6c40-4b73-9488-03629396725d.png",
    rarity: "epic",
    cost: 5
  },
  {
    id: 13,
    name: "Raposa de Fogo",
    type: "monster",
    element: "fire",
    attack: 1800,
    defense: 1200,
    level: 6,
    description: "Espírito ardente das florestas encantadas.",
    image: "/dungeons-card-arena-game/lovable-uploads/93317688-6a84-4d58-bc8c-63aaec1d9fe5.png",
    rarity: "rare",
    cost: 4
  },

  // WATER ELEMENT MONSTERS  
  {
    id: 21,
    name: "Tubarão das Profundezas",
    type: "monster",
    element: "ice",
    attack: 2300,
    defense: 2000,
    level: 8,
    description: "Pode atacar diretamente uma vez por jogo.",
    image: "/dungeons-card-arena-game/lovable-uploads/1cd11615-c80b-4c55-a474-ee5ff09beee9.png",
    rarity: "epic",
    cost: 6
  },
  {
    id: 22,
    name: "Águia de Cristal Mística",
    type: "monster",
    element: "ice",
    attack: 2500,
    defense: 1800,
    level: 8,
    description: "Ave celestial que comanda os ventos gelados.",
    image: "/dungeons-card-arena-game/lovable-uploads/45960009-c804-445d-92ab-cdf27c4b9c3c.png",
    rarity: "epic",
    cost: 6
  },

  // AIR ELEMENT MONSTERS
  {
    id: 31,
    name: "Grifo Veloz",
    type: "monster",
    element: "lightning",
    attack: 2200,
    defense: 1800,
    level: 8,
    description: "Pode atacar duas vezes por jogo.",
    image: "/dungeons-card-arena-game/lovable-uploads/6677bc0e-5f71-4b9f-915f-754252d854ee.png",
    rarity: "rare",
    cost: 5
  },
  {
    id: 32,
    name: "Águia do Trovão",
    type: "monster",
    element: "lightning",
    attack: 2400,
    defense: 1900,
    level: 8,
    description: "Senhor dos céus tempestuosos e dos raios.",
    image: "/dungeons-card-arena-game/lovable-uploads/62b17c0b-1bf5-408c-af13-58d64764e32f.png",
    rarity: "epic",
    cost: 6
  },
  {
    id: 33,
    name: "Águia do Raio Celeste",
    type: "monster",
    element: "lightning",
    attack: 2300,
    defense: 2000,
    level: 7,
    description: "Majestosa ave que controla as tempestades.",
    image: "/dungeons-card-arena-game/lovable-uploads/a68e61f3-3c2a-4ee4-ad80-e41ea7e8849b.png",
    rarity: "epic",
    cost: 6
  },

  // EARTH ELEMENT MONSTERS
  {
    id: 41,
    name: "Troll de Rocha",
    type: "monster",
    element: "earth",
    attack: 2100,
    defense: 2400,
    level: 8,
    description: "Imune a efeitos de monstros de Ar.",
    image: "/dungeons-card-arena-game/lovable-uploads/b5125cfc-584e-484d-a7f8-284c98849d8d.png",
    rarity: "rare",
    cost: 5
  },
  {
    id: 42,
    name: "Golem de Guerra",
    type: "monster",
    element: "earth",
    attack: 2000,
    defense: 2200,
    level: 7,
    description: "Construto de batalha forjado para destruição.",
    image: "/dungeons-card-arena-game/lovable-uploads/5f0e9482-2619-4088-95c5-070d7faa0f57.png",
    rarity: "rare",
    cost: 5
  },
  {
    id: 43,
    name: "Guardião Golem Tóxico",
    type: "monster",
    element: "earth",
    attack: 2400,
    defense: 2200,
    level: 8,
    description: "Protetor corrompido dos pântanos venenosos.",
    image: "/dungeons-card-arena-game/lovable-uploads/69bb1658-a919-4241-89d8-52078eaffa14.png",
    rarity: "epic",
    cost: 6
  },

  // HOLY ELEMENT MONSTERS
  {
    id: 51,
    name: "Paladino Solar",
    type: "monster",
    element: "holy",
    attack: 2600,
    defense: 2000,
    level: 8,
    description: "+200 ATK para cada monstro inimigo.",
    image: "/dungeons-card-arena-game/lovable-uploads/23989923-ed6f-49f6-b57f-b40351d604b7.png",
    rarity: "epic",
    cost: 6
  },
  {
    id: 52,
    name: "Unicórnio Místico",
    type: "monster",
    element: "holy",
    attack: 2000,
    defense: 1800,
    level: 7,
    description: "Criatura pura que traz esperança aos desesperados.",
    image: "/dungeons-card-arena-game/lovable-uploads/8de2352d-900e-425b-aa51-e51555110dae.png",
    rarity: "rare",
    cost: 5
  },

  // SHADOW ELEMENT MONSTERS
  {
    id: 61,
    name: "Cavaleiro das Trevas",
    type: "monster",
    element: "shadow",
    attack: 2400,
    defense: 2300,
    level: 8,
    description: "Diminui o ATK dos monstros de Luz em 500.",
    image: "/dungeons-card-arena-game/lovable-uploads/b2134732-27f5-4692-b93d-e70e66db1b0c.png",
    rarity: "rare",
    cost: 5
  },
  {
    id: 62,
    name: "Feiticeiro das Sombras",
    type: "monster",
    element: "shadow",
    attack: 2100,
    defense: 1800,
    level: 7,
    description: "Mago supremo das artes sombrias.",
    image: "/dungeons-card-arena-game/lovable-uploads/40fcbbd3-dda9-4bcb-b26d-a431cd6c5a4c.png",
    rarity: "epic",
    cost: 5
  },
  {
    id: 63,
    name: "Demônio Verde",
    type: "monster",
    element: "earth",
    attack: 1900,
    defense: 1500,
    level: 6,
    description: "Fera corrupta dos pântanos sombrios.",
    image: "/dungeons-card-arena-game/lovable-uploads/2c61cf96-b77a-4370-ad5d-d32857869774.png",
    rarity: "rare",
    cost: 4
  },

  // NOVAS CARTAS LENDÁRIAS ADICIONADAS
  {
    id: 71,
    name: "Titã Sombrio",
    type: "monster",
    element: "shadow",
    attack: 3200,
    defense: 2800,
    level: 10,
    description: "Colosso das trevas eternas. Não pode ser destruído por efeitos que reduzem DEF.",
    image: "/lovable-uploads/6ac1858c-5ff8-46e8-bdf7-4282d1709156.png",
    rarity: "legendary",
    cost: 10
  },
  {
    id: 72,
    name: "Cyborg Destruidor",
    type: "monster",
    element: "lightning",
    attack: 2900,
    defense: 2400,
    level: 9,
    description: "Máquina de guerra. Ganha +300 ATK para cada carta mágica no cemitério.",
    image: "/lovable-uploads/f718c075-7904-46ce-8868-6190329e7083.png",
    rarity: "legendary",
    cost: 9
  },
  {
    id: 73,
    name: "Cavaleiro Real",
    type: "monster",
    element: "holy",
    attack: 2700,
    defense: 2600,
    level: 8,
    description: "Nobre guerreiro montado. Pode atacar diretamente se não houver monstros no campo.",
    image: "/lovable-uploads/2f780a0b-9aed-47b4-8db5-7bf1c6bdb2b4.png",
    rarity: "legendary",
    cost: 8
  },
  {
    id: 74,
    name: "Dragão de Gelo Ancestral",
    type: "monster",
    element: "ice",
    attack: 3100,
    defense: 2700,
    level: 10,
    description: "Senhor dos ventos gelados. Congela monstros inimigos por 1 turno ao atacar.",
    image: "/lovable-uploads/2f9962ee-f232-44d8-bd8e-8261cd9db4ed.png",
    rarity: "legendary",
    cost: 10
  },
  {
    id: 75,
    name: "Tigre do Raio",
    type: "monster",
    element: "lightning",
    attack: 2800,
    defense: 2200,
    level: 9,
    description: "Felino elemental. Ataca duas vezes por turno se o oponente tiver mais de 3 cartas na mão.",
    image: "/lovable-uploads/c201c4ce-832e-429c-934d-c0b9d57f2210.png",
    rarity: "legendary",
    cost: 9
  },
  {
    id: 76,
    name: "Anjo Dourado",
    type: "monster",
    element: "holy",
    attack: 2500,
    defense: 2800,
    level: 8,
    description: "Arqueira celestial. Pode atirar em qualquer monstro no campo inimigo.",
    image: "/lovable-uploads/a659e78d-b68a-427f-982c-9b7d53be6164.png",
    rarity: "legendary",
    cost: 8
  },
  {
    id: 77,
    name: "Serafim de Prata",
    type: "monster",
    element: "holy",
    attack: 2600,
    defense: 2900,
    level: 9,
    description: "Guardião dos céus. Monstros sagrados aliados ganham +500 ATK/DEF.",
    image: "/lovable-uploads/78ff5764-386d-4c04-b141-b4b63f40440f.png",
    rarity: "legendary",
    cost: 9
  },
  {
    id: 78,
    name: "Serafim de Fogo",
    type: "monster",
    element: "fire",
    attack: 2800,
    defense: 2500,
    level: 9,
    description: "Anjo das chamas eternas. Causa 300 de dano a todos os inimigos quando invocado.",
    image: "/lovable-uploads/f520c635-15d5-4491-b2e8-bbe52212b1ae.png",
    rarity: "legendary",
    cost: 9
  },
  {
    id: 79,
    name: "Guerreiro do Deserto",
    type: "monster",
    element: "fire",
    attack: 2400,
    defense: 2100,
    level: 7,
    description: "Nomade das areias ardentes. Imune a efeitos de monstros de gelo.",
    image: "/lovable-uploads/b5c21ad4-acff-4185-a9b6-86c751533e62.png",
    rarity: "epic",
    cost: 7
  },
  {
    id: 80,
    name: "Fênix de Cristal",
    type: "monster",
    element: "ice",
    attack: 2700,
    defense: 2400,
    level: 8,
    description: "Ave mística dos picos gelados. Revive com metade dos pontos quando destruída.",
    image: "/lovable-uploads/9ff041c9-40e5-4ca2-8f11-2c7a9bc8b5cb.png",
    rarity: "legendary",
    cost: 8
  },

  // Magic Cards
  {
    id: 100,
    name: "Chuva de Meteoros",
    type: "magic",
    element: "fire",
    level: 7,
    description: "Causa 500 de dano a todos os monstros no campo.",
    image: meteorRain,
    rarity: "epic",
    cost: 5
  },
  {
    id: 101,
    name: "Explosão de Fogo",
    type: "magic",
    element: "fire",
    level: 3,
    description: "Causa 800 de dano direto ao oponente.",
    image: "",
    rarity: "common",
    cost: 2
  },
  {
    id: 102,
    name: "Escudo de Gelo",
    type: "magic",
    element: "ice",
    level: 2,
    description: "Aumenta a defesa de um monstro em 500 pontos.",
    image: "",
    rarity: "common",
    cost: 1
  },
  {
    id: 103,
    name: "Cura Divina",
    type: "magic",
    element: "holy",
    level: 4,
    description: "Restaura 1000 pontos de vida.",
    image: "",
    rarity: "uncommon",
    cost: 3
  },
  {
    id: 104,
    name: "Tempestade de Raios",
    type: "magic",
    element: "lightning",
    level: 5,
    description: "Destroi todos os monstros com ATK menor que 1500.",
    image: "",
    rarity: "rare",
    cost: 4
  },

  // Trap Cards
  {
    id: 200,
    name: "Armadilha Explosiva",
    type: "trap",
    level: 3,
    description: "Quando um monstro ataca, ele recebe 600 de dano.",
    image: "",
    rarity: "common",
    cost: 2
  },
  {
    id: 201,
    name: "Espelho Mágico",
    type: "trap",
    level: 4,
    description: "Reflete o próximo feitiço de volta ao oponente.",
    image: "",
    rarity: "uncommon",
    cost: 3
  },
  {
    id: 202,
    name: "Prisão das Sombras",
    type: "trap",
    level: 5,
    description: "Impede um monstro de atacar por 2 turnos.",
    image: "",
    rarity: "rare",
    cost: 4
  }
];

// Convenience exports
export const allCards = gameCards;
export const monsterCards = gameCards.filter(card => card.type === "monster");
export const magicCards = gameCards.filter(card => card.type === "magic");
export const trapCards = gameCards.filter(card => card.type === "trap");

// Premium marketplace cards  
export const premiumCards: Card[] = [
  {
    id: 2001,
    name: "Serafim da Paz",
    type: "monster",
    element: "holy",
    attack: 1800,
    defense: 2000,
    level: 7,
    description: "Pode reviver um monstro do cemitério ao ser destruída.",
    image: "/dungeons-card-arena-game/lovable-uploads/43109396-a769-44b4-818f-1f797ee22f52.png",
    rarity: "legendary",
    cost: 7
  },
  {
    id: 2002,
    name: "Dragão da Aurora",
    type: "monster",
    element: "holy",
    attack: 3000,
    defense: 2500,
    level: 9,
    description: "Destrói um monstro do tipo Dark sempre que ataca.",
    image: "/dungeons-card-arena-game/lovable-uploads/93e1cfb2-1a99-42de-b3f1-c70a260bd479.png",
    rarity: "legendary",
    cost: 9
  },
  {
    id: 2003,
    name: "Vampira Sanguinária",
    type: "monster",
    element: "shadow",
    attack: 2200,
    defense: 2000,
    level: 7,
    description: "Recupera 300 de vida sempre que ataca.",
    image: "/dungeons-card-arena-game/lovable-uploads/9eecb997-c318-4245-8002-492ea0f546bf.png",
    rarity: "legendary",
    cost: 7
  },
  {
    id: 2004,
    name: "Kraken do Abismo",
    type: "monster",
    element: "ice",
    attack: 2900,
    defense: 2700,
    level: 9,
    description: "Imune a monstros de Fogo.",
    image: "/dungeons-card-arena-game/lovable-uploads/b745b9a0-bb80-4788-92ff-04357d1d3a69.png",
    rarity: "legendary",
    cost: 8
  },
  {
    id: 2005,
    name: "Espírito da Terra",
    type: "monster",
    element: "earth",
    attack: 2000,
    defense: 2000,
    level: 7,
    description: "Imune a efeitos negativos de monstros de Ar.",
    image: "/dungeons-card-arena-game/lovable-uploads/15a8d434-2b12-4b22-8537-31e198cdcdd8.png",
    rarity: "legendary",
    cost: 7
  },
  {
    id: 2006,
    name: "Poção de Energia",
    type: "magic",
    element: "lightning",
    level: 4,
    description: "Aumenta o ATK de um monstro em +1000 até o fim do turno.",
    image: "/dungeons-card-arena-game/lovable-uploads/38499ffe-dbfa-4b49-a357-8cac32af8b3c.png",
    rarity: "epic",
    cost: 3
  },
  {
    id: 2007,
    name: "Ressurreição Arcana",
    type: "magic",
    element: "holy",
    level: 6,
    description: "Revive um monstro do cemitério com metade de seu ATK e DEF.",
    image: "/dungeons-card-arena-game/lovable-uploads/699b67df-94bc-415d-abb4-9d688ef5e6d1.png",
    rarity: "epic",
    cost: 4
  },
  {
    id: 2008,
    name: "Buraco Negro Dimensional",
    type: "trap",
    level: 8,
    description: "Destroi todos os monstros no campo.",
    image: "/dungeons-card-arena-game/lovable-uploads/e6a6b15b-2a22-46aa-ae00-6b2eb3c6fb65.png",
    rarity: "legendary",
    cost: 6
  },
  {
    id: 2009,
    name: "Correntes Paralisantes",
    type: "trap",
    level: 5,
    description: "Todos os monstros inimigos ficam imobilizados por 1 turno.",
    image: "/dungeons-card-arena-game/lovable-uploads/d80aaac7-9c5c-409c-86c1-990916520fba.png",
    rarity: "rare",
    cost: 4
  },
  {
    id: 2010,
    name: "Espelho do Caos",
    type: "trap",
    level: 6,
    description: "Copia o efeito da última carta ativada (auxílio ou armadilha).",
    image: "/dungeons-card-arena-game/lovable-uploads/bdeb866c-9a3f-45cb-bbbd-b8b78da78cba.png",
    rarity: "epic",
    cost: 5
  }
];
