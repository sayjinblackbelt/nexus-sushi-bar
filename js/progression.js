export const FISHING_RANKS = ["Pescador iniciante", "Pescador aprendiz", "Pescador experiente", "Pescador especialista", "Mestre das marés"];
export function fishingLevel(xp = 0) { return Math.min(5, Math.floor(Math.max(0, Number(xp) || 0) / 100) + 1); }
export function fishingRank(xp = 0) { return FISHING_RANKS[fishingLevel(xp) - 1]; }
export function barShiftTarget(level = 1) { return 5 + (Math.min(5, Math.max(1, level)) - 1) * 2; }
export function equipmentStats(level = 1) { const tier = Math.min(5, Math.max(1, level)); return { level: tier, capacity: 8 + (tier - 1) * 2, speed: 190 + (tier - 1) * 18, oxygenDrain: 2.5 - (tier - 1) * .22 }; }
export const CHARACTERS = { kai: { id: "kai", name: "Kai", gender: "masculino" }, yuna: { id: "yuna", name: "Yuna", gender: "feminino" } };
