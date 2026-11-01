const SAVE_KEY = "nexus-save";
export const SAVE_VERSION = 9;
const EMPTY_TEA_STOCK = { matcha: 5, hojicha: 5, lotus: 3, genmaicha: 2, yuzu: 2 };
let memorySave = {
  version: SAVE_VERSION, coins: 0, bestCatch: 0, fishStock: {},
  teaStock: { ...EMPTY_TEA_STOCK }, reputation: 0, day: 1,
  character: "kai", fishingXP: 0, equipmentLevel: 1, barLevel: 1, customersServed: 0, biome: "lagoon", speciesCaught: {}, decorLevel: 1, tutorialComplete: false, qualityCaught: {}, equipmentSpecialization: "balanced", soundEnabled: true, reducedMotion: false
};

function safeCount(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.floor(number)) : 0;
}
function safeStock(value, fallback = {}) {
  const source = value && typeof value === "object" ? value : fallback;
  return Object.fromEntries(Object.entries(source).map(([key, count]) => [key, safeCount(count)]));
}
export function normalizeProgress(data = {}) {
  return {
    version: SAVE_VERSION,
    coins: safeCount(data.coins),
    bestCatch: safeCount(data.bestCatch),
    fishStock: safeStock(data.fishStock),
    teaStock: safeStock(data.teaStock, EMPTY_TEA_STOCK),
    reputation: safeCount(data.reputation),
    day: Math.max(1, safeCount(data.day) || 1),
    character: data.character === "yuna" ? "yuna" : "kai",
    fishingXP: safeCount(data.fishingXP),
    equipmentLevel: Math.min(5, Math.max(1, safeCount(data.equipmentLevel) || 1)),
    barLevel: Math.min(5, Math.max(1, safeCount(data.barLevel) || 1)),
    customersServed: safeCount(data.customersServed),
    biome: ["lagoon","reef","abyss"].includes(data.biome) ? data.biome : "lagoon",
    speciesCaught: safeStock(data.speciesCaught),
    decorLevel: Math.min(3, Math.max(1, safeCount(data.decorLevel) || 1)),
    tutorialComplete: data.tutorialComplete === true,
    qualityCaught: safeStock(data.qualityCaught),
    equipmentSpecialization: ["balanced", "endurance", "swift", "cargo"].includes(data.equipmentSpecialization) ? data.equipmentSpecialization : "balanced",
    soundEnabled: data.soundEnabled !== false,
    reducedMotion: data.reducedMotion === true
  };
}

export function readProgress() {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.version >= 1 && parsed.version <= SAVE_VERSION) {
        memorySave = normalizeProgress(parsed);
        writeProgress(memorySave);
        return { ...memorySave, fishStock: { ...memorySave.fishStock }, teaStock: { ...memorySave.teaStock } };
      }
    }
    const legacy = {
      coins: safeCount(window.localStorage.getItem("nexus-coins")),
      bestCatch: safeCount(window.localStorage.getItem("nexus-best-catch"))
    };
    memorySave = normalizeProgress(legacy);
    writeProgress(memorySave);
    return { ...memorySave, fishStock: {}, teaStock: { ...EMPTY_TEA_STOCK } };
  } catch {
    return { ...memorySave, fishStock: { ...memorySave.fishStock }, teaStock: { ...memorySave.teaStock } };
  }
}

export function writeProgress(progress = {}) {
  memorySave = normalizeProgress({ ...memorySave, ...progress });
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(memorySave));
  } catch {
    // The current session remains playable when persistent storage is blocked.
  }
  return { ...memorySave, fishStock: { ...memorySave.fishStock }, teaStock: { ...memorySave.teaStock } };
}
