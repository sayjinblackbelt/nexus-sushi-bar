const MILESTONES = [{ days: 3, reward: 30 }, { days: 5, reward: 60 }, { days: 7, reward: 100 }];
export function recordActiveDay(progress, now = new Date()) {
  const key = now.toISOString().slice(0, 10);
  const days = Array.isArray(progress.activityDays) ? [...progress.activityDays] : [];
  if (days.includes(key)) return { ...progress, activityDays: days, activityStreak: days.length, streakRewards: { ...(progress.streakRewards || {}) }, streakReward: 0 };
  days.push(key);
  const rewards = { ...(progress.streakRewards || {}) };
  let reward = 0;
  for (const milestone of MILESTONES) {
    const id = String(milestone.days);
    if (days.length >= milestone.days && !rewards[id]) { rewards[id] = true; reward += milestone.reward; }
  }
  return { ...progress, activityDays: days, activityStreak: days.length, streakRewards: rewards, coins: Math.max(0, Number(progress.coins) || 0) + reward, streakReward: reward };
}
export function activitySummary(progress) {
  const days = Array.isArray(progress.activityDays) ? progress.activityDays.length : 0;
  const rewards = progress.streakRewards || {};
  const next = MILESTONES.find(item => !rewards[String(item.days)]);
  return { days, nextMilestone: next?.days || null, nextReward: next?.reward || 0, completed: MILESTONES.filter(item => rewards[String(item.days)]).length };
}
