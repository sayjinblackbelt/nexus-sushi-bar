const memoryFallback = new Map();

export function readNumber(key, fallback = 0) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    const value = Number(raw);
    return Number.isFinite(value) ? value : fallback;
  } catch {
    const value = Number(memoryFallback.get(key));
    return Number.isFinite(value) ? value : fallback;
  }
}

export function writeNumber(key, value) {
  const safeValue = Number.isFinite(Number(value)) ? Number(value) : 0;
  try {
    window.localStorage.setItem(key, String(safeValue));
  } catch {
    memoryFallback.set(key, String(safeValue));
  }
}
