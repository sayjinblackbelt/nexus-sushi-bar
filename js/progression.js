export const FISHING_RANKS = ["Pescador iniciante", "Pescador aprendiz", "Pescador experiente", "Pescador especialista", "Mestre das marés", "Guardião do oceano", "Lenda do Nexus"];
export function fishingLevel(xp = 0) { return Math.min(7, Math.floor(Math.max(0, Number(xp) || 0) / 100) + 1); }
export function fishingRank(xp = 0) { return FISHING_RANKS[fishingLevel(xp) - 1]; }
export function barShiftTarget(level = 1) { return 5 + (Math.min(5, Math.max(1, level)) - 1) * 2; }
export function equipmentStats(level = 1, specialization = "balanced") {
  const tier = Math.min(5, Math.max(1, level));
  const stats = { level: tier, capacity: 8 + (tier - 1) * 2, speed: 190 + (tier - 1) * 18, oxygenDrain: 2.5 - (tier - 1) * .22 };
  if (specialization === "endurance") stats.oxygenDrain *= .82;
  if (specialization === "swift") stats.speed *= 1.15;
  if (specialization === "cargo") stats.capacity += 2;
  return stats;
}
export const CHARACTERS = { kai: { id: "kai", name: "Kai", gender: "masculino" }, yuna: { id: "yuna", name: "Yuna", gender: "feminino" } };


export const ACHIEVEMENTS = [
  { id:"first-dive", title:"Primeiro mergulho", description:"Conclua sua primeira expedição.", goal:1, value:p=>p.totalDives },
  { id:"ten-dives", title:"Explorador constante", description:"Conclua 10 expedições.", goal:10, value:p=>p.totalDives },
  { id:"collector", title:"Colecionador marinho", description:"Descubra as 7 espécies.", goal:12, value:p=>Object.keys(p.speciesCaught||{}).filter(id=>(p.speciesCaught[id]||0)>0).length },
  { id:"hundred-fish", title:"Mestre pescador", description:"Capture 100 peixes.", goal:100, value:p=>p.totalFishCaught },
  { id:"first-service", title:"Casa aberta", description:"Atenda seu primeiro cliente.", goal:1, value:p=>p.customersServed },
  { id:"hundred-guests", title:"Hospitalidade exemplar", description:"Atenda 100 clientes.", goal:100, value:p=>p.customersServed },
  { id:"deep-sea", title:"Nas profundezas", description:"Alcance o nível de pesca 5.", goal:7, value:p=>fishingLevel(p.fishingXP) },
  { id:"grand-opening", title:"Império Nexus", description:"Amplie o bar até o nível 5.", goal:5, value:p=>p.barLevel }
];
export function achievementProgress(progress) {
  return ACHIEVEMENTS.map(item => { const current=Math.min(item.goal,item.value(progress)); return {...item,current,unlocked:current>=item.goal,percent:Math.round(current/item.goal*100)}; });
}
