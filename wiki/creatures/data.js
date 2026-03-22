const CREATURE_PLACEHOLDER = "../../assets/images/creatures/creature_placeholder_1024.png";

/* =========================
   HELPERS
   ========================= */

function padId(value) {
  return String(value).padStart(3, "0");
}

function createAssets(id, custom = {}) {
  return {
    normal: {
      portrait: custom.normal || `/assets/images/creatures/${id}.png`
    },
    shiny: {
      portrait: custom.shiny || `/assets/images/creatures/${id}_shiny.png`
    }
  };
}

function evo3(a, b, c) {
  return [
    { id: a, name: `Creature ${a}` },
    { id: b, name: `Creature ${b}` },
    { id: c, name: `Creature ${c}` }
  ];
}

function evo1(id) {
  return [{ id, name: `Creature ${id}` }];
}

function createCreature(data) {
  const id = padId(data.id);
  const evoChain = data.evoChain || [];

  let stage = "Stage 1";

  if (evoChain.length > 0) {
    const stageIndex = evoChain.findIndex(entry => padId(entry.id) === id);
    if (stageIndex !== -1) {
      stage = `Stage ${stageIndex + 1}`;
    }
  }

  return {
  id,
  name: data.name || `Creature ${id}`,
  rarity: data.rarity || "Common",
  essence: data.essence || "Verdant",
  stage,
  ability: data.ability || "Unknown",

  stats: {
    attack: data.attack ?? 0,
    hp: data.hp ?? 0,
    defense: data.defense ?? 0
  },

  description: data.description || "Description here.",
  dropSource: data.dropSource || "Unknown Source",
  dropPool: data.dropPool || "Unknown Pool",

  assets: createAssets(id, {
    normal: data.portrait,
    shiny: data.shinyPortrait
  }),

  prev: data.prev ?? null,
  next: data.next ?? null,
  evoChain
};
}

const CREATURES = {};

/* =========================
   001–093 (3-STAGE LINES)
   ========================= */

for (let i = 1; i <= 93; i += 3) {
  const a = padId(i);
  const b = padId(i + 1);
  const c = padId(i + 2);

  CREATURES[a] = createCreature({
    id: a,
    prev: i === 1 ? null : padId(i - 1),
    next: b,
    evoChain: evo3(a, b, c)
  });

  CREATURES[b] = createCreature({
    id: b,
    prev: a,
    next: c,
    dropSource: `Evolve from #${a}`,
    dropPool: "Not directly hatchable",
    evoChain: evo3(a, b, c)
  });

  CREATURES[c] = createCreature({
    id: c,
    prev: b,
    next: i + 2 === 93 ? "094" : padId(i + 3),
    dropSource: `Evolve from #${b}`,
    dropPool: "Not directly hatchable",
    evoChain: evo3(a, b, c)
  });
}

/* =========================
   094–100 (SINGLE STAGE)
   ========================= */

for (let i = 94; i <= 100; i++) {
  const id = padId(i);

  CREATURES[id] = createCreature({
    id,
    prev: i === 94 ? "093" : padId(i - 1),
    next: i === 100 ? null : padId(i + 1),
    dropSource: "Direct Encounter",
    dropPool: "Standalone Pool",
    evoChain: evo1(id)
  });
}

/* =========================
       REAL CREATURES
   ========================= */

CREATURES["001"] = createCreature({
  id: "001",
  name: "Sprouty",
  rarity: "Common",
  essence: "Verdant",
  ability: "Growth",

  attack: 8,
  hp: 12,
  defense: 6,

  description: "Sprouty is a calm creature tied to natural energy.",
  dropSource: "Common Egg",
  dropPool: "Standard Hatch Pool",
  portrait: "../../assets/images/creatures/001_sprouty.png",
  shinyPortrait: "../../assets/images/creatures/001_sprouty_shiny.png",

  prev: null,
  next: "002",

  evoChain: [
    { id: "001", name: "Sprouty" },
    { id: "002", name: "Bloomjaw" },
    { id: "003", name: "Verdanox" }
  ]
});

CREATURES["002"] = createCreature({
  id: "002",
  name: "Bloomjaw",
  rarity: "Common",
  essence: "Verdant",
  ability: "Growth",

  attack: 18,
  hp: 22,
  defense: 14,

  description: "Bloomjaw has begun to mature, channeling stronger natural energy through its body. Its leafy crown expands and hardens, while its form becomes more defined and resilient. It’s more active than its earlier stage, using its growing power to defend itself and assert its place in the wild.",
  dropSource: "Evolve from #001",
  dropPool: "Not directly hatchable",
  portrait: "../../assets/images/creatures/002_bloomjaw.png",
  shinyPortrait: "../../assets/images/creatures/002_bloomjaw_shiny.png",

  prev: "001",
  next: "003",

  evoChain: [
    { id: "001", name: "Sprouty" },
    { id: "002", name: "Bloomjaw" },
    { id: "003", name: "Verdanox" }
  ]
});

CREATURES["003"] = createCreature({
  id: "003",
  name: "Verdanox",
  rarity: "Rare",
  essence: "Verdant",
  ability: "Growth",

  attack: 32,
  hp: 34,
  defense: 26,

  description: "Verdanox represents the full realization of its natural potential. Its body is reinforced with dense, life-infused structure, and its presence radiates controlled, overwhelming vitality. Every movement carries strength, and the energy it stores can reshape the environment around it. What began as a fragile sprout has become a dominant force of growth.",
  dropSource: "Evolve from #002",
  dropPool: "Not directly hatchable",
  portrait: "../../assets/images/creatures/003_verdanox.png",
  shinyPortrait: "../../assets/images/creatures/003_verdanox_shiny.png",

  prev: "002",
  next: "004",

  evoChain: [
    { id: "001", name: "Sprouty" },
    { id: "002", name: "Bloomjaw" },
    { id: "003", name: "Verdanox" }
  ]
});

CREATURES["004"] = createCreature({
  id: "004",
  name: "Emberbit",
  rarity: "Common",
  essence: "Ember",
  ability: "Kindle",

  attack: 0,
  hp: 0,
  defense: 0,

  description: "Emberbit slowly builds heat over time, increasing its power the longer it remains active.",
  dropSource: "Common Egg",
  dropPool: "Standard Hatch Pool",
  portrait: "../../assets/images/creatures/004_emberbit.png",
  shinyPortrait: "../../assets/images/creatures/004_emberbit_shiny.png",

  prev: "003",
  next: "005",

  evoChain: [
    { id: "004", name: "Emberbit" },
    { id: "005", name: "IDK" },
    { id: "006", name: "IDK" }
  ]
});

CREATURES["094"] = createCreature({
  id: "094",
  name: "Solrael",
  rarity: "Legendary",
  essence: "Radiant",
  ability: "Solar Ascendance",

  attack: 42,
  hp: 35,
  defense: 30,

  description: `A radiant being formed from concentrated solar energy.
Solrael exists in a constant state of ascension, growing brighter and more powerful with every moment it remains in the world.
Its presence alone bends light, and when its power peaks, it releases a surge capable of overwhelming everything around it.`,

  dropSource: "Legendary Egg",
  dropPool: "Celestial Pool",

  portrait: "../../assets/images/creatures/094_solrael.png",
  shinyPortrait: "../../assets/images/creatures/094_solrael_shiny.png",

  prev: "093",
  next: "095",

  evoChain: [
    { id: "094", name: "Solrael" }
  ]
});

function getCreatureById(id) {
  return CREATURES[padId(id)] || null;
}

function getPortraitPath(creature, variant = "normal") {
  if (!creature) return CREATURE_PLACEHOLDER;
  return creature.assets?.[variant]?.portrait || CREATURE_PLACEHOLDER;
}

function getCodexPortraitPath(creature) {
  if (!creature) return CREATURE_PLACEHOLDER;
  return creature.assets?.normal?.portrait || CREATURE_PLACEHOLDER;
}