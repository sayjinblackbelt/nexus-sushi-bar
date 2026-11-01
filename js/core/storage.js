const SAVE_KEY = "nexus-save";
const SAVE_VERSION = 1;
let memorySave = { version: SAVE_VERSION, coins: 0, bestCatch: 0 };

function safeCount(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.floor(number)) : 0;
}

export function readProgress() {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.version === SAVE_VERSION) {
        memorySave = {
          version: SAVE_VERSION,
          coins: safeCount(parsed.coins),
          bestCatch: safeCount(parsed.bestCatch)
        };
        return { coins: memorySave.coins, bestCatch: memorySave.bestCatch };
      }
    }

    // Migrate values saved by the first prototype without losing player progress.
    const legacy = {
      coins: safeCount(window.localStorage.getItem("nexus-coins")),
      bestCatch: safeCount(window.localStorage.getItem("nexus-best-catch"))
    };
    writeProgress(legacy);
    return legacy;
  } catch {
    return { coins: memorySave.coins, bestCatch: memorySave.bestCatch };
  }
}

export function writeProgress(progress) {
  memorySave = {
    version: SAVE_VERSION,
    coins: safeCount(progress.coins),
    bestCatch: safeCount(progress.bestCatch)
  };
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(memorySave));
  } catch {
    // The current session remains playable when persistent storage is blocked.
  }
}
