export const BIOMES = [
  { id: "lagoon", name: "Lagoa Azul", subtitle: "Águas tranquilas", unlockLevel: 1, depth: "12 M", colors: ["#55b7b5", "#217f91", "#14536f", "#0b2947"], mission: "Capture 3 peixes nesta expedição", reward: 20 },
  { id: "reef", name: "Recife Neon", subtitle: "Corais luminosos", unlockLevel: 3, depth: "38 M", colors: ["#7658a8", "#394b91", "#173b70", "#101d42"], mission: "Capture 3 peixes nesta expedição", reward: 35 },
  { id: "abyss", name: "Abismo Lótus", subtitle: "Profundezas misteriosas", unlockLevel: 5, depth: "85 M", colors: ["#342b68", "#25265a", "#111b42", "#080f2b"], mission: "Capture 3 peixes nesta expedição", reward: 55 }
];
export function getBiome(id) { return BIOMES.find(b => b.id === id) || BIOMES[0]; }
export function unlockedBiomes(level = 1) { return BIOMES.filter(b => b.unlockLevel <= level); }
