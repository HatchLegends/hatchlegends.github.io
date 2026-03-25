const LOCAL_CREATURE_PLACEHOLDER = "../../../assets/images/creatures/creature_placeholder_1024.png";
const CREATURE_PLACEHOLDER = LOCAL_CREATURE_PLACEHOLDER;

function padId(value) {
  return String(value).padStart(3, "0");
}

function createManualEntry(data = {}) {
  return {
    name: "",
    rarity: "",
    essence: "",
    ability: "",
    hasShiny: true,
    attack: 0,
    hp: 0,
    defense: 0,
    description: "",
    dropSource: "",
    dropPool: "",
    assetKey: "",
    shinyAssetKey: "",
    ...data
  };
}

function buildCreaturePath(assetKey, variant = "normal") {
  const trimmedKey = String(assetKey || "").trim();

  if (!trimmedKey) {
    return CREATURE_PLACEHOLDER;
  }

  const localPath = `../../../assets/images/creatures/${trimmedKey}.png`;

  if (variant === "shiny") {
    return window.HL_CLOUDINARY?.creatureShiny(`${trimmedKey}.png`) || localPath;
  }

  return window.HL_CLOUDINARY?.creature(`${trimmedKey}.png`) || localPath;
}

function getChainIds(id) {
  const numericId = Number(id);

  if (numericId >= 94) {
    return [padId(numericId)];
  }

  const start = Math.floor((numericId - 1) / 3) * 3 + 1;
  return [padId(start), padId(start + 1), padId(start + 2)];
}

function getStage(chainIds, id) {
  const index = chainIds.indexOf(id);
  return `Stage ${index + 1}`;
}

function getPrevId(id) {
  const numericId = Number(id);
  if (numericId === 1) return null;
  if (numericId === 94) return "093";
  return padId(numericId - 1);
}

function getNextId(id) {
  const numericId = Number(id);
  if (numericId === 100) return null;
  if (numericId === 93) return "094";
  return padId(numericId + 1);
}

function getDefaultDropSource(id, chainIds) {
  if (chainIds.length === 1) return "Direct Encounter";

  const stageIndex = chainIds.indexOf(id);
  if (stageIndex === 0) return "";
  return `Evolve from #${chainIds[stageIndex - 1]}`;
}

function getDefaultDropPool(id, chainIds) {
  if (chainIds.length === 1) return "Standalone Pool";

  const stageIndex = chainIds.indexOf(id);
  if (stageIndex === 0) return "";
  return "Not directly hatchable";
}

function getManualEntry(id) {
  return CREATURE_MANUAL_DATA[id] || createManualEntry({ assetKey: `${id}_`, shinyAssetKey: `${id}_` });
}

function getManualName(id) {
  const name = getManualEntry(id).name;
  return String(name || "").trim() || `Creature ${id}`;
}

function createCreature(id) {
  const manual = getManualEntry(id);
  const chainIds = getChainIds(id);

  return {
    id,
    name: String(manual.name || "").trim() || `Creature ${id}`,
    rarity: String(manual.rarity || "").trim() || "Common",
    essence: String(manual.essence || "").trim() || "Verdant",
    stage: getStage(chainIds, id),
    ability: String(manual.ability || "").trim() || "Unknown",
    hasShiny: manual.hasShiny !== false,
    stats: {
      attack: manual.attack ?? 0,
      hp: manual.hp ?? 0,
      defense: manual.defense ?? 0
    },
    description: String(manual.description || "").trim() || "Description here.",
    dropSource: String(manual.dropSource || "").trim() || getDefaultDropSource(id, chainIds),
    dropPool: String(manual.dropPool || "").trim() || getDefaultDropPool(id, chainIds),
    assets: {
      normal: {
        portrait: buildCreaturePath(manual.assetKey || `${id}_`, "normal")
      },
      shiny: {
        portrait: buildCreaturePath(manual.shinyAssetKey || manual.assetKey || `${id}_`, "shiny")
      }
    },
    prev: getPrevId(id),
    next: getNextId(id),
    evoChain: chainIds.map((chainId) => ({
      id: chainId,
      name: getManualName(chainId)
    }))
  };
}

const CREATURE_MANUAL_DATA = {
  "001": createManualEntry({
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

    assetKey: "001_sprouty",
    shinyAssetKey: "001_sprouty_shiny"
  }),

  "002": createManualEntry({
    name: "Bloomjaw",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #001",
    dropPool: "Not directly hatchable",

    assetKey: "002_bloomjaw",
    shinyAssetKey: "002_bloomjaw_shiny"
  }),

  "003": createManualEntry({
    name: "Verdanox",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #002",
    dropPool: "Not directly hatchable",

    assetKey: "003_verdanox",
    shinyAssetKey: "003_verdanox_shiny"
  }),

  "004": createManualEntry({
    name: "Emberbit",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "004_emberbit",
    shinyAssetKey: "004_emberbit_shiny"
  }),

  "005": createManualEntry({
    name: "Flarebit",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #004",
    dropPool: "Not directly hatchable",

    assetKey: "005_flarebit",
    shinyAssetKey: "005_flarebit_shiny"
  }),

  "006": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #005",
    dropPool: "Not directly hatchable",

    assetKey: "006_",
    shinyAssetKey: "006_"
  }),

  "007": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "007_",
    shinyAssetKey: "007_"
  }),

  "008": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #007",
    dropPool: "Not directly hatchable",

    assetKey: "008_",
    shinyAssetKey: "008_"
  }),

  "009": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #008",
    dropPool: "Not directly hatchable",

    assetKey: "009_",
    shinyAssetKey: "009_"
  }),

  "010": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "010_",
    shinyAssetKey: "010_"
  }),

  "011": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #010",
    dropPool: "Not directly hatchable",

    assetKey: "011_",
    shinyAssetKey: "011_"
  }),

  "012": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #011",
    dropPool: "Not directly hatchable",

    assetKey: "012_",
    shinyAssetKey: "012_"
  }),

  "013": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "013_",
    shinyAssetKey: "013_"
  }),

  "014": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #013",
    dropPool: "Not directly hatchable",

    assetKey: "014_",
    shinyAssetKey: "014_"
  }),

  "015": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #014",
    dropPool: "Not directly hatchable",

    assetKey: "015_",
    shinyAssetKey: "015_"
  }),

  "016": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "016_",
    shinyAssetKey: "016_"
  }),

  "017": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #016",
    dropPool: "Not directly hatchable",

    assetKey: "017_",
    shinyAssetKey: "017_"
  }),

  "018": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #017",
    dropPool: "Not directly hatchable",

    assetKey: "018_",
    shinyAssetKey: "018_"
  }),

  "019": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "019_",
    shinyAssetKey: "019_"
  }),

  "020": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #019",
    dropPool: "Not directly hatchable",

    assetKey: "020_",
    shinyAssetKey: "020_"
  }),

  "021": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #020",
    dropPool: "Not directly hatchable",

    assetKey: "021_",
    shinyAssetKey: "021_"
  }),

  "022": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "022_",
    shinyAssetKey: "022_"
  }),

  "023": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #022",
    dropPool: "Not directly hatchable",

    assetKey: "023_",
    shinyAssetKey: "023_"
  }),

  "024": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #023",
    dropPool: "Not directly hatchable",

    assetKey: "024_",
    shinyAssetKey: "024_"
  }),

  "025": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "025_",
    shinyAssetKey: "025_"
  }),

  "026": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #025",
    dropPool: "Not directly hatchable",

    assetKey: "026_",
    shinyAssetKey: "026_"
  }),

  "027": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #026",
    dropPool: "Not directly hatchable",

    assetKey: "027_",
    shinyAssetKey: "027_"
  }),

  "028": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "028_",
    shinyAssetKey: "028_"
  }),

  "029": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #028",
    dropPool: "Not directly hatchable",

    assetKey: "029_",
    shinyAssetKey: "029_"
  }),

  "030": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #029",
    dropPool: "Not directly hatchable",

    assetKey: "030_",
    shinyAssetKey: "030_"
  }),

  "031": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "031_",
    shinyAssetKey: "031_"
  }),

  "032": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #031",
    dropPool: "Not directly hatchable",

    assetKey: "032_",
    shinyAssetKey: "032_"
  }),

  "033": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #032",
    dropPool: "Not directly hatchable",

    assetKey: "033_",
    shinyAssetKey: "033_"
  }),

  "034": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "034_",
    shinyAssetKey: "034_"
  }),

  "035": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #034",
    dropPool: "Not directly hatchable",

    assetKey: "035_",
    shinyAssetKey: "035_"
  }),

  "036": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #035",
    dropPool: "Not directly hatchable",

    assetKey: "036_",
    shinyAssetKey: "036_"
  }),

  "037": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "037_",
    shinyAssetKey: "037_"
  }),

  "038": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #037",
    dropPool: "Not directly hatchable",

    assetKey: "038_",
    shinyAssetKey: "038_"
  }),

  "039": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #038",
    dropPool: "Not directly hatchable",

    assetKey: "039_",
    shinyAssetKey: "039_"
  }),

  "040": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "040_",
    shinyAssetKey: "040_"
  }),

  "041": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #040",
    dropPool: "Not directly hatchable",

    assetKey: "041_",
    shinyAssetKey: "041_"
  }),

  "042": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #041",
    dropPool: "Not directly hatchable",

    assetKey: "042_",
    shinyAssetKey: "042_"
  }),

  "043": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "043_",
    shinyAssetKey: "043_"
  }),

  "044": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #043",
    dropPool: "Not directly hatchable",

    assetKey: "044_",
    shinyAssetKey: "044_"
  }),

  "045": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #044",
    dropPool: "Not directly hatchable",

    assetKey: "045_",
    shinyAssetKey: "045_"
  }),

  "046": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "046_",
    shinyAssetKey: "046_"
  }),

  "047": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #046",
    dropPool: "Not directly hatchable",

    assetKey: "047_",
    shinyAssetKey: "047_"
  }),

  "048": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #047",
    dropPool: "Not directly hatchable",

    assetKey: "048_",
    shinyAssetKey: "048_"
  }),

  "049": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "049_",
    shinyAssetKey: "049_"
  }),

  "050": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #049",
    dropPool: "Not directly hatchable",

    assetKey: "050_",
    shinyAssetKey: "050_"
  }),

  "051": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #050",
    dropPool: "Not directly hatchable",

    assetKey: "051_",
    shinyAssetKey: "051_"
  }),

  "052": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "052_",
    shinyAssetKey: "052_"
  }),

  "053": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #052",
    dropPool: "Not directly hatchable",

    assetKey: "053_",
    shinyAssetKey: "053_"
  }),

  "054": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #053",
    dropPool: "Not directly hatchable",

    assetKey: "054_",
    shinyAssetKey: "054_"
  }),

  "055": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "055_",
    shinyAssetKey: "055_"
  }),

  "056": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #055",
    dropPool: "Not directly hatchable",

    assetKey: "056_",
    shinyAssetKey: "056_"
  }),

  "057": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #056",
    dropPool: "Not directly hatchable",

    assetKey: "057_",
    shinyAssetKey: "057_"
  }),

  "058": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "058_",
    shinyAssetKey: "058_"
  }),

  "059": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #058",
    dropPool: "Not directly hatchable",

    assetKey: "059_",
    shinyAssetKey: "059_"
  }),

  "060": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #059",
    dropPool: "Not directly hatchable",

    assetKey: "060_",
    shinyAssetKey: "060_"
  }),

  "061": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "061_",
    shinyAssetKey: "061_"
  }),

  "062": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #061",
    dropPool: "Not directly hatchable",

    assetKey: "062_",
    shinyAssetKey: "062_"
  }),

  "063": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #062",
    dropPool: "Not directly hatchable",

    assetKey: "063_",
    shinyAssetKey: "063_"
  }),

  "064": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "064_",
    shinyAssetKey: "064_"
  }),

  "065": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #064",
    dropPool: "Not directly hatchable",

    assetKey: "065_",
    shinyAssetKey: "065_"
  }),

  "066": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #065",
    dropPool: "Not directly hatchable",

    assetKey: "066_",
    shinyAssetKey: "066_"
  }),

  "067": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "067_",
    shinyAssetKey: "067_"
  }),

  "068": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #067",
    dropPool: "Not directly hatchable",

    assetKey: "068_",
    shinyAssetKey: "068_"
  }),

  "069": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #068",
    dropPool: "Not directly hatchable",

    assetKey: "069_",
    shinyAssetKey: "069_"
  }),

  "070": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "070_",
    shinyAssetKey: "070_"
  }),

  "071": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #070",
    dropPool: "Not directly hatchable",

    assetKey: "071_",
    shinyAssetKey: "071_"
  }),

  "072": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #071",
    dropPool: "Not directly hatchable",

    assetKey: "072_",
    shinyAssetKey: "072_"
  }),

  "073": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "073_",
    shinyAssetKey: "073_"
  }),

  "074": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #073",
    dropPool: "Not directly hatchable",

    assetKey: "074_",
    shinyAssetKey: "074_"
  }),

  "075": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #074",
    dropPool: "Not directly hatchable",

    assetKey: "075_",
    shinyAssetKey: "075_"
  }),

  "076": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "076_",
    shinyAssetKey: "076_"
  }),

  "077": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #076",
    dropPool: "Not directly hatchable",

    assetKey: "077_",
    shinyAssetKey: "077_"
  }),

  "078": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #077",
    dropPool: "Not directly hatchable",

    assetKey: "078_",
    shinyAssetKey: "078_"
  }),

  "079": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "079_",
    shinyAssetKey: "079_"
  }),

  "080": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #079",
    dropPool: "Not directly hatchable",

    assetKey: "080_",
    shinyAssetKey: "080_"
  }),

  "081": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #080",
    dropPool: "Not directly hatchable",

    assetKey: "081_",
    shinyAssetKey: "081_"
  }),

  "082": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "082_",
    shinyAssetKey: "082_"
  }),

  "083": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #082",
    dropPool: "Not directly hatchable",

    assetKey: "083_",
    shinyAssetKey: "083_"
  }),

  "084": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #083",
    dropPool: "Not directly hatchable",

    assetKey: "084_",
    shinyAssetKey: "084_"
  }),

  "085": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "085_",
    shinyAssetKey: "085_"
  }),

  "086": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #085",
    dropPool: "Not directly hatchable",

    assetKey: "086_",
    shinyAssetKey: "086_"
  }),

  "087": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #086",
    dropPool: "Not directly hatchable",

    assetKey: "087_",
    shinyAssetKey: "087_"
  }),

  "088": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "088_",
    shinyAssetKey: "088_"
  }),

  "089": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #088",
    dropPool: "Not directly hatchable",

    assetKey: "089_",
    shinyAssetKey: "089_"
  }),

  "090": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #089",
    dropPool: "Not directly hatchable",

    assetKey: "090_",
    shinyAssetKey: "090_"
  }),

  "091": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "091_",
    shinyAssetKey: "091_"
  }),

  "092": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #091",
    dropPool: "Not directly hatchable",

    assetKey: "092_",
    shinyAssetKey: "092_"
  }),

  "093": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #092",
    dropPool: "Not directly hatchable",

    assetKey: "093_",
    shinyAssetKey: "093_"
  }),

  "094": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Direct Encounter",
    dropPool: "Standalone Pool",

    assetKey: "094_",
    shinyAssetKey: "094_"
  }),

  "095": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Direct Encounter",
    dropPool: "Standalone Pool",

    assetKey: "095_",
    shinyAssetKey: "095_"
  }),

  "096": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Direct Encounter",
    dropPool: "Standalone Pool",

    assetKey: "096_",
    shinyAssetKey: "096_"
  }),

  "097": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Direct Encounter",
    dropPool: "Standalone Pool",

    assetKey: "097_",
    shinyAssetKey: "097_"
  }),

  "098": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Direct Encounter",
    dropPool: "Standalone Pool",

    assetKey: "098_",
    shinyAssetKey: "098_"
  }),

  "099": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Direct Encounter",
    dropPool: "Standalone Pool",

    assetKey: "099_",
    shinyAssetKey: "099_"
  }),

  "100": createManualEntry({
    name: "",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Direct Encounter",
    dropPool: "Standalone Pool",

    assetKey: "100_",
    shinyAssetKey: "100_"
  })
};

const CREATURES = {};

for (let i = 1; i <= 100; i += 1) {
  const id = padId(i);
  CREATURES[id] = createCreature(id);
}

function getCreatureById(id) {
  return CREATURES[padId(id)] || null;
}

function getPortraitPath(creature, variant = "normal") {
  if (!creature) return CREATURE_PLACEHOLDER;
  if (variant === "shiny" && creature.hasShiny === false) {
    return creature.assets?.normal?.portrait || CREATURE_PLACEHOLDER;
  }
  return creature.assets?.[variant]?.portrait || CREATURE_PLACEHOLDER;
}

function getCodexPortraitPath(creature) {
  if (!creature) return CREATURE_PLACEHOLDER;
  return creature.assets?.normal?.portrait || CREATURE_PLACEHOLDER;
}

/*
HOW TO FILL A CREATURE

"001": createManualEntry({
  name: "Sprouty",
  rarity: "Common",
  essence: "Verdant",
  ability: "Growth",
  hasShiny: true,
  attack: 8,
  hp: 12,
  defense: 6,
  description: "Description here.",
  dropSource: "Common Egg",
  dropPool: "Standard Hatch Pool",
  assetKey: "001_sprouty",
  shinyAssetKey: "001_sprouty_shiny"
})

Cloudinary folders expected by this file:
- hatchlegends/creatures
- hatchlegends/creatures/creatures_shiny
*/
