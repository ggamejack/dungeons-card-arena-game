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

  // Epic Monsters
  {
    id: 5,
    name: "Águia de Cristal Mística",
    type: "monster",
    element: "ice",
    attack: 2500,
    defense: 1800,
    level: 8,
    description: "Ave celestial que comanda os ventos gelados.",
    image: "/lovable-uploads/45960009-c804-445d-92ab-cdf27c4b9c3c.png",
    rarity: "epic",
    cost: 6
  },
  {
    id: 6,
    name: "Falcão do Trovão Supremo",
    type: "monster",
    element: "lightning",
    attack: 2400,
    defense: 1900,
    level: 8,
    description: "Senhor dos céus tempestuosos e dos raios.",
    image: "/lovable-uploads/62b17c0b-1bf5-408c-af13-58d64764e32f.png",
    rarity: "epic",
    cost: 6
  },
  {
    id: 7,
    name: "Águia do Raio Celeste",
    type: "monster",
    element: "lightning",
    attack: 2300,
    defense: 2000,
    level: 7,
    description: "Majestosa ave que controla as tempestades.",
    image: "/lovable-uploads/a68e61f3-3c2a-4ee4-ad80-e41ea7e8849b.png",
    rarity: "epic",
    cost: 6
  },
  {
    id: 8,
    name: "Raposa Espírito de Fogo",
    type: "monster",
    element: "fire",
    attack: 2200,
    defense: 1600,
    level: 7,
    description: "Espírito ardente das chamas eternas.",
    image: "/lovable-uploads/5d26b512-6c40-4b73-9488-03629396725d.png",
    rarity: "epic",
    cost: 5
  },
  {
    id: 9,
    name: "Guardião Golem Tóxico",
    type: "monster",
    element: "earth",
    attack: 2400,
    defense: 2200,
    level: 8,
    description: "Protetor corrompido dos pântanos venenosos.",
    image: "/lovable-uploads/69bb1658-a919-4241-89d8-52078eaffa14.png",
    rarity: "epic",
    cost: 6
  },
  {
    id: 10,
    name: "Feiticeiro das Sombras",
    type: "monster",
    element: "shadow",
    attack: 2100,
    defense: 1800,
    level: 7,
    description: "Mago supremo das artes sombrias.",
    image: "/lovable-uploads/40fcbbd3-dda9-4bcb-b26d-a431cd6c5a4c.png",
    rarity: "epic",
    cost: 5
  },

  // Epic Heroes 
  {
    id: 11,
    name: "Titan Golem Supremo",
    type: "monster",
    element: "earth",
    attack: 2600,
    defense: 2500,
    level: 9,
    description: "O guardião ancestral das montanhas. Força lendária.",
    image: "/lovable-uploads/5f0e9482-2619-4088-95c5-070d7faa0f57.png",
    rarity: "epic",
    cost: 7
  },
  {
    id: 12,
    name: "Dragão de Fogo Ancestral",
    type: "monster",
    element: "fire",
    attack: 2800,
    defense: 2000,
    level: 9,
    description: "O senhor das chamas eternas. Sua ira consome tudo.",
    image: "/lovable-uploads/896816f6-7b9a-4f82-9500-6ec8d0310dbf.png",
    rarity: "epic",
    cost: 7
  },
  {
    id: 13,
    name: "Águia do Trovão",
    type: "monster",
    element: "lightning",
    attack: 2300,
    defense: 1700,
    level: 7,
    description: "Majestosa ave dos céus tempestuosos.",
    image: "/lovable-uploads/6677bc0e-5f71-4b9f-915f-754252d854ee.png",
    rarity: "rare",
    cost: 5
  },
  {
    id: 14,
    name: "Valquíria Celestial",
    type: "monster",
    element: "holy",
    attack: 2200,
    defense: 2400,
    level: 8,
    description: "Guerreira divina que protege os justos.",
    image: "/lovable-uploads/23989923-ed6f-49f6-b57f-b40351d604b7.png",
    rarity: "epic",
    cost: 6
  },
  {
    id: 15,
    name: "Guardião de Cristal",
    type: "monster",
    element: "ice",
    attack: 1900,
    defense: 2600,
    level: 8,
    description: "Protetor eterno dos reinos gelados.",
    image: "/lovable-uploads/1cd11615-c80b-4c55-a474-ee5ff09beee9.png",
    rarity: "epic",
    cost: 6
  },

  // Rare Monsters
  {
    id: 16,
    name: "Unicórnio Místico",
    type: "monster",
    element: "holy",
    attack: 2000,
    defense: 1800,
    level: 7,
    description: "Criatura pura que traz esperança aos desesperados.",
    image: "/lovable-uploads/8de2352d-900e-425b-aa51-e51555110dae.png",
    rarity: "rare",
    cost: 5
  },
  {
    id: 17,
    name: "Raposa de Fogo",
    type: "monster",
    element: "fire",
    attack: 1800,
    defense: 1200,
    level: 6,
    description: "Espírito ardente das florestas encantadas.",
    image: "/lovable-uploads/93317688-6a84-4d58-bc8c-63aaec1d9fe5.png",
    rarity: "rare",
    cost: 4
  },
  {
    id: 18,
    name: "Golem de Guerra",
    type: "monster",
    element: "earth",
    attack: 2000,
    defense: 2200,
    level: 7,
    description: "Construto de batalha forjado para destruição.",
    image: "/lovable-uploads/b5125cfc-584e-484d-a7f8-284c98849d8d.png",
    rarity: "rare",
    cost: 5
  },
  {
    id: 19,
    name: "Senhor das Sombras",
    type: "monster",
    element: "shadow",
    attack: 2100,
    defense: 1600,
    level: 7,
    description: "Mestre das trevas que consome a luz.",
    image: "/lovable-uploads/b2134732-27f5-4692-b93d-e70e66db1b0c.png",
    rarity: "rare",
    cost: 5
  },
  {
    id: 20,
    name: "Demônio Verde",
    type: "monster",
    element: "earth",
    attack: 1900,
    defense: 1500,
    level: 6,
    description: "Fera corrupta dos pântanos sombrios.",
    image: "/lovable-uploads/2c61cf96-b77a-4370-ad5d-d32857869774.png",
    rarity: "rare",
    cost: 4
  },

  // Magic Cards
  {
    id: 50,
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
    id: 51,
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
    id: 52,
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
    id: 53,
    name: "Tempestade de Raios",
    type: "magic",
    element: "lightning",
    level: 5,
    description: "Destroi todos os monstros com ATK menor que 1500.",
    image: "",
    rarity: "rare",
    cost: 4
  },
  {
    id: 54,
    name: "Terremoto Devastador",
    type: "magic",
    element: "earth",
    level: 6,
    description: "Causa 400 de dano a todos os monstros no campo.",
    image: "",
    rarity: "rare",
    cost: 4
  },
  {
    id: 55,
    name: "Ventania Glacial",
    type: "magic",
    element: "ice",
    level: 4,
    description: "Congela um monstro por 1 turno.",
    image: "",
    rarity: "uncommon",
    cost: 3
  },
  {
    id: 56,
    name: "Luz Purificadora",
    type: "magic",
    element: "holy",
    level: 5,
    description: "Destrói todos os monstros de elemento sombra.",
    image: "",
    rarity: "rare",
    cost: 4
  },
  {
    id: 57,
    name: "Meteoro Flamejante",
    type: "magic",
    element: "fire",
    level: 7,
    description: "Causa 1200 de dano a um alvo específico.",
    image: "",
    rarity: "epic",
    cost: 5
  },
  {
    id: 58,
    name: "Escuridão Eterna",
    type: "magic",
    element: "shadow",
    level: 6,
    description: "Reduz o ATK de todos os monstros inimigos em 500.",
    image: "",
    rarity: "rare",
    cost: 4
  },
  {
    id: 59,
    name: "Revitalizar",
    type: "magic",
    element: "earth",
    level: 3,
    description: "Ressuscita um monstro do cemitério com metade do ATK.",
    image: "",
    rarity: "uncommon",
    cost: 3
  },

  // Trap Cards
  {
    id: 70,
    name: "Armadilha Explosiva",
    type: "trap",
    level: 3,
    description: "Quando um monstro ataca, ele recebe 600 de dano.",
    image: "",
    rarity: "common",
    cost: 2
  },
  {
    id: 71,
    name: "Espelho Mágico",
    type: "trap",
    level: 4,
    description: "Reflete o próximo feitiço de volta ao oponente.",
    image: "",
    rarity: "uncommon",
    cost: 3
  },
  {
    id: 72,
    name: "Prisão das Sombras",
    type: "trap",
    level: 5,
    description: "Impede um monstro de atacar por 2 turnos.",
    image: "",
    rarity: "rare",
    cost: 4
  },
  {
    id: 73,
    name: "Buraco Negro",
    type: "trap",
    level: 6,
    description: "Destrói o monstro mais forte do campo inimigo.",
    image: "",
    rarity: "rare",
    cost: 4
  },
  {
    id: 74,
    name: "Campo de Força",
    type: "trap",
    level: 4,
    description: "Anula o próximo ataque direcionado ao jogador.",
    image: "",
    rarity: "uncommon",
    cost: 3
  },
  {
    id: 75,
    name: "Retaliação",
    type: "trap",
    level: 3,
    description: "Quando você recebe dano, o oponente recebe o mesmo.",
    image: "",
    rarity: "common",
    cost: 2
  },
  {
    id: 76,
    name: "Inversão de Poder",
    type: "trap",
    level: 5,
    description: "Troca ATK e DEF de todos os monstros no campo.",
    image: "",
    rarity: "rare",
    cost: 4
  },
  {
    id: 77,
    name: "Portal Dimensional",
    type: "trap",
    level: 6,
    description: "Bane um monstro para outra dimensão por 3 turnos.",
    image: "",
    rarity: "epic",
    cost: 5
  },
  {
    id: 78,
    name: "Chuva de Meteoros",
    type: "magic",
    level: 7,
    description: "Causa 500 de dano a todos os monstros no campo.",
    image: meteorRain,
    rarity: "epic",
    cost: 5
  },
  {
    id: 79,
    name: "Regeneração Suprema",
    type: "trap",
    level: 4,
    description: "Restaura 2000 HP quando ativada.",
    image: "",
    rarity: "uncommon",
    cost: 3
  }
];

// Generate additional cards to reach 99 total
const generateAdditionalCards = (): Card[] => {
  const additionalCards: Card[] = [];
  const names = [
    "Soldado Élfico", "Mago Aprendiz", "Guerreiro Orc", "Arqueiro Sombrio",
    "Cavaleiro Nobre", "Assassino Ninja", "Bárbaro Furioso", "Paladino Santo",
    "Necromante", "Druida Ancião", "Caçador de Dragões", "Mercenário",
    "Gladiador", "Berserker", "Xamã Tribal", "Monge Sábio",
    "Piromante", "Criomante", "Geomante", "Eletrificador",
    "Anjo Guerreiro", "Demônio Menor", "Espírito da Floresta", "Golem de Ferro",
    "Esqueleto Guerreiro", "Zumbi Pútrido", "Fantasma Errante", "Lich Supremo",
    "Fênix Renascida", "Grifo Majestoso", "Hidra de Três Cabeças", "Minotauro",
    "Centauro Archer", "Ciclope Gigante", "Lobisomem", "Vampiro Nobre",
    "Sereia Encantadora", "Tritão Guerreiro", "Kraken dos Abissos", "Leviatã",
    "Espírito do Vento", "Elemental de Fogo", "Gigante de Pedra", "Ser das Névoas"
  ];

  for (let i = 0; i < 39; i++) {
    const id = 100 + i;
    const name = names[i % names.length] || `Criatura Mística ${i + 1}`;
    const elements: Array<"fire" | "ice" | "earth" | "lightning" | "holy" | "shadow"> = ["fire", "ice", "earth", "lightning", "holy", "shadow"];
    const rarities: Array<"common" | "uncommon" | "rare" | "epic" | "legendary"> = ["common", "uncommon", "rare", "epic", "legendary"];
    
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    const level = Math.floor(Math.random() * 8) + 1;
    const baseAttack = 300 + (level * 200) + Math.floor(Math.random() * 400);
    const baseDefense = 300 + (level * 150) + Math.floor(Math.random() * 300);

    additionalCards.push({
      id,
      name,
      type: "monster",
      element: elements[Math.floor(Math.random() * elements.length)],
      attack: Math.min(baseAttack, 2800),
      defense: Math.min(baseDefense, 2800),
      level,
      description: `${name} - Uma criatura poderosa dos reinos místicos.`,
      image: "",
      rarity,
      cost: Math.max(1, Math.floor(level / 2))
    });
  }

  return additionalCards;
};

const newCards: Card[] = [
  {
    id: 1000,
    name: "Dragão Ancestral de Fogo",
    type: "monster",
    element: "fire",
    attack: 15,
    defense: 12,
    level: 10,
    description: "O mais poderoso dos dragões, guardião das chamas eternas.",
    image: "/lovable-uploads/8de2352d-900e-425b-aa51-e51555110dae.png",
    rarity: "legendary",
    cost: 12
  },
  {
    id: 1001,
    name: "Cavaleiro da Luz Divina",
    type: "monster",
    element: "holy",
    attack: 11,
    defense: 10,
    level: 8,
    description: "Um paladino abençoado com poderes celestiais.",
    image: "/lovable-uploads/93317688-6a84-4d58-bc8c-63aaec1d9fe5.png",
    rarity: "epic",
    cost: 9
  },
  {
    id: 1002,
    name: "Elemental do Gelo Eterno",
    type: "monster",
    element: "ice",
    attack: 9,
    defense: 13,
    level: 7,
    description: "Criatura gelada que congela tudo ao seu redor.",
    image: "/lovable-uploads/896816f6-7b9a-4f82-9500-6ec8d0310dbf.png",
    rarity: "rare",
    cost: 8
  },
  {
    id: 1003,
    name: "Mestre dos Trovões",
    type: "monster",
    element: "lightning",
    attack: 13,
    defense: 6,
    level: 8,
    description: "Controla os raios e tempestades com maestria.",
    image: "/lovable-uploads/6677bc0e-5f71-4b9f-915f-754252d854ee.png",
    rarity: "epic",
    cost: 9
  },
  {
    id: 1004,
    name: "Guardião da Terra",
    type: "monster",
    element: "earth",
    attack: 8,
    defense: 14,
    level: 7,
    description: "Protetor rochoso das montanhas sagradas.",
    image: "/lovable-uploads/b2134732-27f5-4692-b93d-e70e66db1b0c.png",
    rarity: "rare",
    cost: 7
  },
  {
    id: 1005,
    name: "Fênix Renascida",
    type: "monster",
    element: "fire",
    attack: 10,
    defense: 8,
    level: 9,
    description: "Ave lendária que renasce das próprias cinzas.",
    image: "/lovable-uploads/5f0e9482-2619-4088-95c5-070d7faa0f57.png",
    rarity: "legendary",
    cost: 11
  },
  {
    id: 1006,
    name: "Sombra Assassina",
    type: "monster",
    element: "shadow",
    attack: 12,
    defense: 5,
    level: 6,
    description: "Assassino das trevas que ataca pelas sombras.",
    image: "/lovable-uploads/b5125cfc-584e-484d-a7f8-284c98849d8d.png",
    rarity: "uncommon",
    cost: 6
  },
  {
    id: 1007,
    name: "Anjo da Justiça",
    type: "monster",
    element: "holy",
    attack: 14,
    defense: 9,
    level: 9,
    description: "Servo celestial que pune os ímpios.",
    image: "/lovable-uploads/1cd11615-c80b-4c55-a474-ee5ff09beee9.png",
    rarity: "legendary",
    cost: 12
  },
  {
    id: 1008,
    name: "Espírito da Natureza",
    type: "monster",
    element: "earth",
    attack: 7,
    defense: 11,
    level: 5,
    description: "Entidade verde que protege as florestas.",
    image: "/lovable-uploads/23989923-ed6f-49f6-b57f-b40351d604b7.png",
    rarity: "common",
    cost: 5
  }
];

const premiumCards: Card[] = [
  {
    id: 2000,
    name: "Arcanjo Gabriel",
    type: "monster",
    element: "holy",
    attack: 18,
    defense: 15,
    level: 12,
    description: "O mais poderoso dos arcanjos, mensageiro divino com força celestial.",
    image: "/lovable-uploads/43109396-a769-44b4-818f-1f797ee22f52.png",
    rarity: "legendary",
    cost: 15
  },
  {
    id: 2001,
    name: "Serafim da Justiça",
    type: "monster",
    element: "holy",
    attack: 16,
    defense: 13,
    level: 11,
    description: "Guardião celestial que pune os pecadores com luz divina.",
    image: "/lovable-uploads/93e1cfb2-1a99-42de-b3f1-c70a260bd479.png",
    rarity: "legendary",
    cost: 14
  },
  {
    id: 2002,
    name: "Lorde das Trevas",
    type: "monster",
    element: "shadow",
    attack: 20,
    defense: 12,
    level: 12,
    description: "Senhor supremo das sombras, corruptor de almas.",
    image: "/lovable-uploads/9eecb997-c318-4245-8002-492ea0f546bf.png",
    rarity: "legendary",
    cost: 16
  },
  {
    id: 2003,
    name: "Demônio do Abismo",
    type: "monster",
    element: "shadow",
    attack: 17,
    defense: 10,
    level: 10,
    description: "Criatura infernal que emerge das profundezas do abismo.",
    image: "/lovable-uploads/b745b9a0-bb80-4788-92ff-04357d1d3a69.png",
    rarity: "epic",
    cost: 13
  },
  {
    id: 2004,
    name: "Titã do Gelo Eterno",
    type: "monster",
    element: "ice",
    attack: 15,
    defense: 18,
    level: 11,
    description: "Gigante ancestral das terras geladas com poder congelante.",
    image: "/lovable-uploads/15a8d434-2b12-4b22-8537-31e198cdcdd8.png",
    rarity: "legendary",
    cost: 14
  },
  {
    id: 2005,
    name: "Deusa da Luna",
    type: "monster",
    element: "holy",
    attack: 14,
    defense: 16,
    level: 10,
    description: "Divindade lunar que controla as marés e o destino.",
    image: "/lovable-uploads/38499ffe-dbfa-4b49-a357-8cac32af8b3c.png",
    rarity: "legendary",
    cost: 13
  },
  {
    id: 2006,
    name: "Águia do Trovão",
    type: "monster",
    element: "lightning",
    attack: 19,
    defense: 8,
    level: 9,
    description: "Ave lendária que cavalga as tempestades com velocidade divina.",
    image: "/lovable-uploads/699b67df-94bc-415d-abb4-9d688ef5e6d1.png",
    rarity: "epic",
    cost: 12
  },
  {
    id: 2007,
    name: "Raposa de Fogo Mística",
    type: "monster",
    element: "fire",
    attack: 12,
    defense: 14,
    level: 8,
    description: "Espírito vulpino com chamas sagradas que purificam.",
    image: "/lovable-uploads/e6a6b15b-2a22-46aa-ae00-6b2eb3c6fb65.png",
    rarity: "rare",
    cost: 10
  },
  {
    id: 2008,
    name: "Golem de Magma",
    type: "monster",
    element: "fire",
    attack: 16,
    defense: 20,
    level: 10,
    description: "Construto de rocha e magma com força devastadora.",
    image: "/lovable-uploads/d80aaac7-9c5c-409c-86c1-990916520fba.png",
    rarity: "epic",
    cost: 13
  },
  {
    id: 2009,
    name: "Feiticeiro das Sombras",
    type: "monster",
    element: "shadow",
    attack: 13,
    defense: 11,
    level: 9,
    description: "Mago negro que manipula as trevas para invocar poderes proibidos.",
    image: "/lovable-uploads/bdeb866c-9a3f-45cb-bbbd-b8b78da78cba.png",
    rarity: "epic",
    cost: 11
  }
];

export const allCards = [...gameCards, ...generateAdditionalCards(), ...newCards, ...premiumCards];