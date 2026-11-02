const DAILY = [
  { id: "daily-catch", title: "Coleta do dia", description: "Capture 5 peixes em suas expedições.", event: "fish", goal: 5, reward: 25 },
  { id: "daily-quality", title: "Olho de mestre", description: "Faça 2 capturas impecáveis.", event: "premium", goal: 2, reward: 25 },
  { id: "daily-service", title: "Hospitalidade diária", description: "Atenda 3 clientes no Sushi Bar.", event: "service", goal: 3, reward: 25 }
];
const WEEKLY = [
  { id: "weekly-catch", title: "Explorador da semana", description: "Capture 25 peixes.", event: "fish", goal: 25, reward: 100 },
  { id: "weekly-service", title: "Casa movimentada", description: "Atenda 15 clientes.", event: "service", goal: 15, reward: 100 },
  { id: "weekly-quality", title: "Excelência submarina", description: "Faça 10 capturas impecáveis.", event: "premium", goal: 10, reward: 100 }
];
function dayKey(date) { return date.toISOString().slice(0, 10); }
function weekKey(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}
function pick(list, key) {
  let hash = 0;
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return list[hash % list.length];
}
function makeChallenge(definition) { return { ...definition, progress: 0, completed: false, claimed: false }; }
export function ensureChallenges(progress, now = new Date()) {
  const date = dayKey(now), week = weekKey(now);
  const daily = progress.dailyChallenge?.period === date
    ? progress.dailyChallenge
    : { period: date, challenge: makeChallenge(pick(DAILY, date)) };
  const weekly = progress.weeklyChallenge?.period === week
    ? progress.weeklyChallenge
    : { period: week, challenge: makeChallenge(pick(WEEKLY, week)) };
  return { ...progress, dailyChallenge: daily, weeklyChallenge: weekly };
}
export function recordChallengeEvent(progress, event, amount = 1, now = new Date()) {
  const next = ensureChallenges(progress, now);
  const increment = Math.max(0, Math.floor(Number(amount) || 0));
  let reward = 0;
  for (const key of ["dailyChallenge", "weeklyChallenge"]) {
    const challenge = next[key].challenge;
    if (challenge.event !== event || challenge.completed) continue;
    challenge.progress = Math.min(challenge.goal, challenge.progress + increment);
    challenge.completed = challenge.progress >= challenge.goal;
    if (challenge.completed && !challenge.claimed) {
      challenge.claimed = true;
      reward += challenge.reward;
    }
  }
  next.coins = Math.max(0, Number(next.coins) || 0) + reward;
  return { progress: next, reward };
}
export function challengeCards(progress, now = new Date()) {
  const active = ensureChallenges(progress, now);
  return [
    { type: "Diário", ...active.dailyChallenge.challenge },
    { type: "Semanal", ...active.weeklyChallenge.challenge }
  ].map(item => ({ ...item, percent: Math.round(item.progress / item.goal * 100) }));
}
