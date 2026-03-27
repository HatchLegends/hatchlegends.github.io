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
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

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
    name: "Infernox",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #005",
    dropPool: "Not directly hatchable",

    assetKey: "006_infernox",
    shinyAssetKey: "006_infernox_shiny"
  }),

  "007": createManualEntry({
    name: "Bubblet",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "007_bubblet",
    shinyAssetKey: "007_bubblet_shiny"
  }),

  "008": createManualEntry({
    name: "Tideroo",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #007",
    dropPool: "Not directly hatchable",

    assetKey: "008_tideroo",
    shinyAssetKey: "008_tideroo_shiny"
  }),

  "009": createManualEntry({
    name: "Abyssail",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #008",
    dropPool: "Not directly hatchable",

    assetKey: "009_abyssail",
    shinyAssetKey: "009_abyssail_shiny"
  }),

  "010": createManualEntry({
    name: "Pebblit",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "010_pebblit",
    shinyAssetKey: "010_pebblit_shiny"
  }),

  "011": createManualEntry({
    name: "Cragmite",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #010",
    dropPool: "Not directly hatchable",

    assetKey: "011_cragmite",
    shinyAssetKey: "011_cragmite_shiny"
  }),

  "012": createManualEntry({
    name: "Magmarock",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #011",
    dropPool: "Not directly hatchable",

    assetKey: "012_magmarock",
    shinyAssetKey: "012_magmarock_shiny"
  }),

  "013": createManualEntry({
    name: "Leafling",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "013_leafling",
    shinyAssetKey: "013_leafling_shiny"
  }),

  "014": createManualEntry({
    name: "Florabun",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #013",
    dropPool: "Not directly hatchable",

    assetKey: "014_florabun",
    shinyAssetKey: "014_florabun_shiny"
  }),

  "015": createManualEntry({
    name: "Verdelle",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #014",
    dropPool: "Not directly hatchable",

    assetKey: "015_verdelle",
    shinyAssetKey: "015_verdelle_shiny"
  }),

  "016": createManualEntry({
    name: "Glowdot",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "016_glowdot",
    shinyAssetKey: "016_glowdot_shiny"
  }),

  "017": createManualEntry({
    name: "Luminidra",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #016",
    dropPool: "Not directly hatchable",

    assetKey: "017_luminidra",
    shinyAssetKey: "017_luminidra_shiny"
  }),

  "018": createManualEntry({
    name: "Soluxara",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #017",
    dropPool: "Not directly hatchable",

    assetKey: "018_soluxara",
    shinyAssetKey: "018_soluxara_shiny"
  }),

  "019": createManualEntry({
    name: "Snuglet",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "019_snuglet",
    shinyAssetKey: "019_snuglet_shiny"
  }),

  "020": createManualEntry({
    name: "Cushlume",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #019",
    dropPool: "Not directly hatchable",

    assetKey: "020_cushlume",
    shinyAssetKey: "020_cushlume_shiny"
  }),

  "021": createManualEntry({
    name: "Somnara",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #020",
    dropPool: "Not directly hatchable",

    assetKey: "021_somnara",
    shinyAssetKey: "021_somnara_shiny"
  }),

  "022": createManualEntry({
    name: "Drifty",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "022_drifty",
    shinyAssetKey: "022_drifty_shiny"
  }),

  "023": createManualEntry({
    name: "Driftune",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #022",
    dropPool: "Not directly hatchable",

    assetKey: "023_driftune",
    shinyAssetKey: "023_driftune_shiny"
  }),

  "024": createManualEntry({
    name: "Nimbusara",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #023",
    dropPool: "Not directly hatchable",

    assetKey: "024_nimbusara",
    shinyAssetKey: "024_nimbusara_shiny"
  }),

  "025": createManualEntry({
    name: "Glowcap",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "025_glowcap",
    shinyAssetKey: "025_glowcap_shiny"
  }),

  "026": createManualEntry({
    name: "Lumishroom",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #025",
    dropPool: "Not directly hatchable",

    assetKey: "026_lumishroom",
    shinyAssetKey: "026_lumishroom_shiny"
  }),

  "027": createManualEntry({
    name: "Mycelux",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #026",
    dropPool: "Not directly hatchable",

    assetKey: "027_mycelux",
    shinyAssetKey: "027_mycelux_shiny"
  }),

  "028": createManualEntry({
    name: "Slimelet",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "028_slimelet",
    shinyAssetKey: "028_slimelet_shiny"
  }),

  "029": createManualEntry({
    name: "Leaflium",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #028",
    dropPool: "Not directly hatchable",

    assetKey: "029_leaflium",
    shinyAssetKey: "029_leaflium_shiny"
  }),

  "030": createManualEntry({
    name: "Verdantor",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #029",
    dropPool: "Not directly hatchable",

    assetKey: "030_verdantor",
    shinyAssetKey: "030_verdantor_shiny"
  }),

  "031": createManualEntry({
    name: "Driftpup",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "031_driftpup",
    shinyAssetKey: "031_driftpup_shiny"
  }),

  "032": createManualEntry({
    name: "Glacielle",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #031",
    dropPool: "Not directly hatchable",

    assetKey: "032_glacielle",
    shinyAssetKey: "032_glacielle_shiny"
  }),

  "033": createManualEntry({
    name: "Glaciara",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #032",
    dropPool: "Not directly hatchable",

    assetKey: "033_glaciara",
    shinyAssetKey: "033_glaciara_shiny"
  }),

  "034": createManualEntry({
    name: "Twiglet",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "034_twiglet",
    shinyAssetKey: "034_twiglet_shiny"
  }),

  "035": createManualEntry({
    name: "Branchlet",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #034",
    dropPool: "Not directly hatchable",

    assetKey: "035_branchlet",
    shinyAssetKey: "035_branchlet_shiny"
  }),

  "036": createManualEntry({
    name: "Elderoot",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #035",
    dropPool: "Not directly hatchable",

    assetKey: "036_elderoot",
    shinyAssetKey: "036_elderoot_shiny"
  }),

  "037": createManualEntry({
    name: "Thorny",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "037_thorny",
    shinyAssetKey: "037_thorny_shiny"
  }),

  "038": createManualEntry({
    name: "Bramblet",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #037",
    dropPool: "Not directly hatchable",

    assetKey: "038_bramblet",
    shinyAssetKey: "038_bramblet_shiny"
  }),

  "039": createManualEntry({
    name: "Verdantusk",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #038",
    dropPool: "Not directly hatchable",

    assetKey: "039_verdantusk",
    shinyAssetKey: "039_verdantusk_shiny"
  }),

  "040": createManualEntry({
    name: "Shellbit",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "040_shellbit",
    shinyAssetKey: "040_shellbit_shiny"
  }),

  "041": createManualEntry({
    name: "Aqualume",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #040",
    dropPool: "Not directly hatchable",

    assetKey: "041_aqualume",
    shinyAssetKey: "041_aqualume_shiny"
  }),

  "042": createManualEntry({
    name: "Pyroshell",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #041",
    dropPool: "Not directly hatchable",

    assetKey: "042_pyroshell",
    shinyAssetKey: "042_pyroshell_shiny"
  }),

  "043": createManualEntry({
    name: "Flicklet",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "043_flicklet",
    shinyAssetKey: "043_flicklet_shiny"
  }),

  "044": createManualEntry({
    name: "Voltbit",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #043",
    dropPool: "Not directly hatchable",

    assetKey: "044_voltbit",
    shinyAssetKey: "044_voltbit_shiny"
  }),

  "045": createManualEntry({
    name: "Voltmane",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #044",
    dropPool: "Not directly hatchable",

    assetKey: "045_voltmane",
    shinyAssetKey: "045_voltmane_shiny"
  }),

  "046": createManualEntry({
    name: "Dustkin",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "046_dustkin",
    shinyAssetKey: "046_dustkin_shiny"
  }),

  "047": createManualEntry({
    name: "Seraphuff",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #046",
    dropPool: "Not directly hatchable",

    assetKey: "047_seraphuff",
    shinyAssetKey: "047_seraphuff_shiny"
  }),

  "048": createManualEntry({
    name: "Nimbus",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #047",
    dropPool: "Not directly hatchable",

    assetKey: "048_nimbus",
    shinyAssetKey: "048_nimbus_shiny"
  }),

  "049": createManualEntry({
    name: "Mossnub",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "049_mossnub",
    shinyAssetKey: "049_mossnub_shiny"
  }),

  "050": createManualEntry({
    name: "Bloomble",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #049",
    dropPool: "Not directly hatchable",

    assetKey: "050_bloomble",
    shinyAssetKey: "050_bloomble_shiny"
  }),

  "051": createManualEntry({
    name: "Terragrove",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #050",
    dropPool: "Not directly hatchable",

    assetKey: "051_terragrove",
    shinyAssetKey: "051_terragrove_shiny"
  }),

  "052": createManualEntry({
    name: "Acornet",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "052_acornet",
    shinyAssetKey: "052_acornet_shiny"
  }),

  "053": createManualEntry({
    name: "Oaklet",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #052",
    dropPool: "Not directly hatchable",

    assetKey: "053_oaklet",
    shinyAssetKey: "053_oaklet_shiny"
  }),

  "054": createManualEntry({
    name: "Bramborn",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #053",
    dropPool: "Not directly hatchable",

    assetKey: "054_bramborn",
    shinyAssetKey: "054_bramborn_shiny"
  }),

  "055": createManualEntry({
    name: "Gravelimp",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "055_gravelimp",
    shinyAssetKey: "055_gravelimp_shiny"
  }),

  "056": createManualEntry({
    name: "Cragor",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #055",
    dropPool: "Not directly hatchable",

    assetKey: "056_cragor",
    shinyAssetKey: "056_cragor_shiny"
  }),

  "057": createManualEntry({
    name: "Volcarok",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #056",
    dropPool: "Not directly hatchable",

    assetKey: "057_volcarok",
    shinyAssetKey: "057_volcarok_shiny"
  }),

  "058": createManualEntry({
    name: "Dewbit",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "058_dewbit",
    shinyAssetKey: "058_dewbit_shiny"
  }),

  "059": createManualEntry({
    name: "Aquarix",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #058",
    dropPool: "Not directly hatchable",

    assetKey: "059_aquarix",
    shinyAssetKey: "059_aquarix_shiny"
  }),

  "060": createManualEntry({
    name: "Tidera",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #059",
    dropPool: "Not directly hatchable",

    assetKey: "060_tidera",
    shinyAssetKey: "060_tidera_shiny"
  }),

  "061": createManualEntry({
    name: "Gloop",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "061_gloop",
    shinyAssetKey: "061_gloop_shiny"
  }),

  "062": createManualEntry({
    name: "Verdooze",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #061",
    dropPool: "Not directly hatchable",

    assetKey: "062_verdooze",
    shinyAssetKey: "062_verdooze_shiny"
  }),

  "063": createManualEntry({
    name: "Floragoo",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #062",
    dropPool: "Not directly hatchable",

    assetKey: "063_floragoo",
    shinyAssetKey: "063_floragoo_shiny"
  }),

  "064": createManualEntry({
    name: "Puffling",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "064_puffling",
    shinyAssetKey: "064_puffling_shiny"
  }),

  "065": createManualEntry({
    name: "Seraphlume",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #064",
    dropPool: "Not directly hatchable",

    assetKey: "065_seraphlume",
    shinyAssetKey: "065_seraphlume_shiny"
  }),

  "066": createManualEntry({
    name: "Aurelo",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #065",
    dropPool: "Not directly hatchable",

    assetKey: "066_aurelo",
    shinyAssetKey: "066_aurelo_shiny"
  }),

  "067": createManualEntry({
    name: "Bouncil",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "067_bouncil",
    shinyAssetKey: "067_bouncil_shiny"
  }),

  "068": createManualEntry({
    name: "Purrcoil",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #067",
    dropPool: "Not directly hatchable",

    assetKey: "068_purrcoil",
    shinyAssetKey: "068_purrcoil_shiny"
  }),

  "069": createManualEntry({
    name: "Springtail",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #068",
    dropPool: "Not directly hatchable",

    assetKey: "069_springtail",
    shinyAssetKey: "069_springtail_shiny"
  }),

  "070": createManualEntry({
    name: "Spagato",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "070_spagato",
    shinyAssetKey: "070_spagato_shiny"
  }),

  "071": createManualEntry({
    name: "Slatlo",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #070",
    dropPool: "Not directly hatchable",

    assetKey: "071_slatlo",
    shinyAssetKey: "071_slatlo_shiny"
  }),

  "072": createManualEntry({
    name: "Salto",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #071",
    dropPool: "Not directly hatchable",

    assetKey: "072_salto",
    shinyAssetKey: "072_salto_shiny"
  }),

  "073": createManualEntry({
    name: "Tanglebud",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "073_tanglebud",
    shinyAssetKey: "073_tanglebud_shiny"
  }),

  "074": createManualEntry({
    name: "Floravine",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #073",
    dropPool: "Not directly hatchable",

    assetKey: "074_floravine",
    shinyAssetKey: "074_floravine_shiny"
  }),

  "075": createManualEntry({
    name: "Florene",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #074",
    dropPool: "Not directly hatchable",

    assetKey: "075_florene",
    shinyAssetKey: "075_florene_shiny"
  }),

  "076": createManualEntry({
    name: "Ambloop",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "076_ambloop",
    shinyAssetKey: "076_ambloop_shiny"
  }),

  "077": createManualEntry({
    name: "Melbee",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #076",
    dropPool: "Not directly hatchable",

    assetKey: "077_melbee",
    shinyAssetKey: "077_melbee_shiny"
  }),

  "078": createManualEntry({
    name: "Hivecore",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #077",
    dropPool: "Not directly hatchable",

    assetKey: "078_hivecore",
    shinyAssetKey: "078_hivecore_shiny"
  }),

  "079": createManualEntry({
    name: "Sporeling",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "079_sporeling",
    shinyAssetKey: "079_sporeling_shiny"
  }),

  "080": createManualEntry({
    name: "Glowshroom",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #079",
    dropPool: "Not directly hatchable",

    assetKey: "080_glowshroom",
    shinyAssetKey: "080_glowshroom_shiny"
  }),

  "081": createManualEntry({
    name: "Lumicrown",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #080",
    dropPool: "Not directly hatchable",

    assetKey: "081_lumicrown",
    shinyAssetKey: "081_lumicrown_shiny"
  }),

  "082": createManualEntry({
    name: "Toofle",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "082_toofle",
    shinyAssetKey: "082_toofle_shiny"
  }),

  "083": createManualEntry({
    name: "Dentra",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #082",
    dropPool: "Not directly hatchable",

    assetKey: "083_dentra",
    shinyAssetKey: "083_dentra_shiny"
  }),

  "084": createManualEntry({
    name: "Crownling",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #083",
    dropPool: "Not directly hatchable",

    assetKey: "084_crownling",
    shinyAssetKey: "084_crownling_shiny"
  }),

  "085": createManualEntry({
    name: "Glowpuff",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "085_glowpuff",
    shinyAssetKey: "085_glowpuff_shiny"
  }),

  "086": createManualEntry({
    name: "Pufflyn",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #085",
    dropPool: "Not directly hatchable",

    assetKey: "086_pufflyn",
    shinyAssetKey: "086_pufflyn_shiny"
  }),

  "087": createManualEntry({
    name: "Flumet",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #086",
    dropPool: "Not directly hatchable",

    assetKey: "087_flumet",
    shinyAssetKey: "087_flumet_shiny"
  }),

  "088": createManualEntry({
    name: "Pebloop",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "088_pebloop",
    shinyAssetKey: "088_pebloop_shiny"
  }),

  "089": createManualEntry({
    name: "Zapplet",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #088",
    dropPool: "Not directly hatchable",

    assetKey: "089_zapplet",
    shinyAssetKey: "089_zapplet_shiny"
  }),

  "090": createManualEntry({
    name: "Thundrop",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #089",
    dropPool: "Not directly hatchable",

    assetKey: "090_thundrop",
    shinyAssetKey: "090_thundrop_shiny"
  }),

  "091": createManualEntry({
    name: "Fluffit",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "",
    dropPool: "",

    assetKey: "091_fluffit",
    shinyAssetKey: "091_fluffit_shiny"
  }),

  "092": createManualEntry({
    name: "Fluffel",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #091",
    dropPool: "Not directly hatchable",

    assetKey: "092_fluffel",
    shinyAssetKey: "092_fluffel_shiny"
  }),

  "093": createManualEntry({
    name: "Flommi",
    rarity: "",
    essence: "",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Evolve from #092",
    dropPool: "Not directly hatchable",

    assetKey: "093_flommi",
    shinyAssetKey: "093_flommi_shiny"
  }),

  "094": createManualEntry({
    name: "Solrael",
    rarity: "Legendary",
    essence: "Radiant",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Direct Encounter",
    dropPool: "Standalone Pool",

    assetKey: "094_solrael",
    shinyAssetKey: "094_solrael_shiny"
  }),

  "095": createManualEntry({
    name: "Pyrael",
    rarity: "Legendary",
    essence: "Ember",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Direct Encounter",
    dropPool: "Standalone Pool",

    assetKey: "095_pyrael",
    shinyAssetKey: "095_pyrael_shiny"
  }),

  "096": createManualEntry({
    name: "Tidael",
    rarity: "Legendary",
    essence: "Tide",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Direct Encounter",
    dropPool: "Standalone Pool",

    assetKey: "096_tidael",
    shinyAssetKey: "096_tidael_shiny"
  }),

  "097": createManualEntry({
    name: "Verdael",
    rarity: "Legendary",
    essence: "Verdant",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Direct Encounter",
    dropPool: "Standalone Pool",

    assetKey: "097_verdael",
    shinyAssetKey: "097_verdael_shiny"
  }),

  "098": createManualEntry({
    name: "Voltael",
    rarity: "Legendary",
    essence: "Volt",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Direct Encounter",
    dropPool: "Standalone Pool",

    assetKey: "098_voltael",
    shinyAssetKey: "098_voltael_shiny"
  }),

  "099": createManualEntry({
    name: "Astrael",
    rarity: "Legendary",
    essence: "Void",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Direct Encounter",
    dropPool: "Standalone Pool",

    assetKey: "099_astrael",
    shinyAssetKey: "099_astrael_shiny"
  }),

  "100": createManualEntry({
    name: "Stellaris",
    rarity: "Mythical",
    essence: "Radiant",
    ability: "",

    attack: 0,
    hp: 0,
    defense: 0,

    description: "",
    dropSource: "Direct Encounter",
    dropPool: "Standalone Pool",

    assetKey: "100_stellaris",
    shinyAssetKey: "100_stellaris_shiny"
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
