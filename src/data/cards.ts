import { Card } from "@/types/Card";

export const gameCards: Card[] = [
  // Legendary Monsters (3000 ATK)
  {
    id: 1,
    name: "Titan Golem Supremo",
    type: "monster",
    element: "earth",
    attack: 3000,
    defense: 2500,
    level: 10,
    description: "O guardião ancestral das montanhas. Sua força é lendária.",
    image: "/lovable-uploads/5f0e9482-2619-4088-95c5-070d7faa0f57.png",
    rarity: "legendary",
    cost: 8
  },
  {
    id: 2,
    name: "Dragão de Fogo Ancestral",
    type: "monster",
    element: "fire",
    attack: 3000,
    defense: 2000,
    level: 10,
    description: "O senhor das chamas eternas. Sua ira consome tudo.",
    image: "/lovable-uploads/896816f6-7b9a-4f82-9500-6ec8d0310dbf.png",
    rarity: "legendary",
    cost: 8
  },

  // Legendary Defenders (3000 DEF)
  {
    id: 3,
    name: "Guardião de Cristal",
    type: "monster",
    element: "ice",
    attack: 2000,
    defense: 3000,
    level: 9,
    description: "Protetor eterno dos reinos gelados.",
    image: "/lovable-uploads/1cd11615-c80b-4c55-a474-ee5ff09beee9.png",
    rarity: "legendary",
    cost: 7
  },
  {
    id: 4,
    name: "Valquíria Celestial",
    type: "monster",
    element: "holy",
    attack: 2200,
    defense: 3000,
    level: 9,
    description: "Guerreira divina que protege os justos.",
    image: "/lovable-uploads/23989923-ed6f-49f6-b57f-b40351d604b7.png",
    rarity: "legendary",
    cost: 7
  },

  // Epic Monsters
  {
    id: 5,
    name: "Águia do Trovão",
    type: "monster",
    element: "lightning",
    attack: 2500,
    defense: 1800,
    level: 8,
    description: "Majestosa ave dos céus tempestuosos.",
    image: "/lovable-uploads/6677bc0e-5f71-4b9f-915f-754252d854ee.png",
    rarity: "epic",
    cost: 6
  },
  {
    id: 6,
    name: "Unicórnio Místico",
    type: "monster",
    element: "holy",
    attack: 2000,
    defense: 2200,
    level: 7,
    description: "Criatura pura que traz esperança aos desesperados.",
    image: "/lovable-uploads/8de2352d-900e-425b-aa51-e51555110dae.png",
    rarity: "epic",
    cost: 5
  },
  {
    id: 7,
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
    id: 8,
    name: "Golem de Guerra",
    type: "monster",
    element: "earth",
    attack: 2200,
    defense: 2000,
    level: 7,
    description: "Construto de batalha forjado para destruição.",
    image: "/lovable-uploads/b5125cfc-584e-484d-a7f8-284c98849d8d.png",
    rarity: "epic",
    cost: 5
  },
  {
    id: 9,
    name: "Senhor das Sombras",
    type: "monster",
    element: "shadow",
    attack: 2400,
    defense: 1600,
    level: 8,
    description: "Mestre das trevas que consome a luz.",
    image: "/lovable-uploads/b2134732-27f5-4692-b93d-e70e66db1b0c.png",
    rarity: "epic",
    cost: 6
  },
  {
    id: 10,
    name: "Demônio Verde",
    type: "monster",
    element: "earth",
    attack: 2100,
    defense: 1500,
    level: 7,
    description: "Fera corrupta dos pântanos sombrios.",
    image: "/lovable-uploads/2c61cf96-b77a-4370-ad5d-d32857869774.png",
    rarity: "rare",
    cost: 5
  },

  // Epic Heroes
  {
    id: 11,
    name: "Paladino da Luz Eterna",
    type: "monster",
    element: "holy",
    attack: 2300,
    defense: 2100,
    level: 8,
    description: "Cavaleiro sagrado que protege os inocentes.",
    image: "",
    rarity: "epic",
    cost: 6
  },
  {
    id: 12,
    name: "Assassino Sombrio",
    type: "monster",
    element: "shadow",
    attack: 2600,
    defense: 1400,
    level: 8,
    description: "Mestre das sombras que strike from darkness.",
    image: "",
    rarity: "epic",
    cost: 6
  },
  {
    id: 13,
    name: "Elemental de Raio",
    type: "monster",
    element: "lightning",
    attack: 2400,
    defense: 1700,
    level: 7,
    description: "Ser de energia pura dos céus.",
    image: "",
    rarity: "rare",
    cost: 5
  },
  {
    id: 14,
    name: "Gigante de Ferro",
    type: "monster",
    element: "earth",
    attack: 2100,
    defense: 2300,
    level: 7,
    description: "Colosso metálico forjado nas profundezas.",
    image: "",
    rarity: "rare",
    cost: 5
  },
  {
    id: 15,
    name: "Fênix Renascida",
    type: "monster",
    element: "fire",
    attack: 2000,
    defense: 1800,
    level: 8,
    description: "Ave imortal que renasce das cinzas.",
    image: "",
    rarity: "epic",
    cost: 6
  },

  // Rare Monsters
  {
    id: 16,
    name: "Lobo Ártico",
    type: "monster",
    element: "ice",
    attack: 1600,
    defense: 1400,
    level: 5,
    description: "Predador das terras geladas.",
    image: "",
    rarity: "rare",
    cost: 3
  },
  {
    id: 17,
    name: "Mago Ancião",
    type: "monster",
    element: "lightning",
    attack: 1500,
    defense: 1700,
    level: 6,
    description: "Sábio mestre das artes arcanas.",
    image: "",
    rarity: "rare",
    cost: 4
  },
  {
    id: 18,
    name: "Guerreiro Bárbaro",
    type: "monster",
    element: "fire",
    attack: 1900,
    defense: 1200,
    level: 5,
    description: "Lutador feroz das tribos selvagens.",
    image: "",
    rarity: "uncommon",
    cost: 3
  },
  {
    id: 19,
    name: "Druida da Natureza",
    type: "monster",
    element: "earth",
    attack: 1300,
    defense: 1800,
    level: 5,
    description: "Guardião das florestas ancestrais.",
    image: "",
    rarity: "uncommon",
    cost: 3
  },
  {
    id: 20,
    name: "Sacerdotisa da Lua",
    type: "monster",
    element: "holy",
    attack: 1400,
    defense: 1600,
    level: 6,
    description: "Clériga que canaliza o poder lunar.",
    image: "",
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
    type: "trap",
    level: 7,
    description: "Causa 300 de dano para cada monstro no campo.",
    image: "",
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
    "Sereia Encantadora", "Tritão Guerreiro", "Kraken dos Abismos", "Leviatã",
    "Espírito do Vento", "Elemental de Fogo", "Gigante de Pedra", "Ser das Névoas"
  ];

  for (let i = 0; i < 57; i++) {
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

export const allCards = [...gameCards, ...generateAdditionalCards()];