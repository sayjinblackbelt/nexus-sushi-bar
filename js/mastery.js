export const MASTERY_TIERS = [
  { id: "discovered", label: "Descoberto", threshold: 1, reward: 5 },
  { id: "familiar", label: "Familiar", threshold: 5, reward: 15 },
  { id: "expert", label: "Especialista", threshold: 15, reward: 40 }
];

export function speciesMastery(count = 0) {
  const total = Math.max(0, Math.floor(Number(count) || 0));
  const tier = [...MASTERY_TIERS].reverse().find(item => total >= item.threshold) || null;
  const next = MASTERY_TIERS.find(item => total < item.threshold) || null;
  return {
    count: total,
    tier,
    next,
    percent: next ? Math.min(100, Math.round(total / next.threshold * 100)) : 100
  };
}

export function masterySummary(progress = {}, species = []) {
  const caught = progress.speciesCaught || {};
  const entries = species.map(item => ({ ...item, ...speciesMastery(caught[item.id] || 0) }));
  return {
    entries,
    discovered: entries.filter(item => item.count > 0).length,
    mastered: entries.filter(item => item.tier?.id === "expert").length,
    total: entries.reduce((sum, item) => sum + item.count, 0)
  };
}

export function applyMasteryRewards(progress = {}, catches = []) {
  const speciesCaught = { ...(progress.speciesCaught || {}) };
  const claimed = { ...(progress.masteryRewards || {}) };
  let coins = Math.max(0, Number(progress.coins) || 0);
  const rewards = [];
  for (const fish of catches) {
    const id = fish?.id;
    if (!id) continue;
    const count = Math.max(0, Number(speciesCaught[id]) || 0);
    for (const tier of MASTERY_TIERS) {
      const key = id + ":" + tier.id;
      if (count >= tier.threshold && !claimed[key]) {
        claimed[key] = 1;
        coins += tier.reward;
        rewards.push({ speciesId: id, tier: tier.id, label: tier.label, coins: tier.reward });
      }
    }
  }
  return { progress: { ...progress, coins, masteryRewards: claimed }, rewards };
}
