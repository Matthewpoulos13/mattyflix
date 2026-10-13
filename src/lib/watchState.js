// My List and playback progress, kept on the device so viewing picks up
// exactly where it left off.
const LIST_KEY = "mattflix-list";
const PROGRESS_KEY = "mattflix-video-progress-v3";
const COMPLETION_THRESHOLD = 0.985;

const listeners = new Set();

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getMyList() {
  const list = readJson(LIST_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function isInMyList(title) {
  return getMyList().includes(title);
}

export function toggleMyList(title) {
  const list = getMyList();
  const next = list.includes(title)
    ? list.filter((entry) => entry !== title)
    : [...list, title];
  localStorage.setItem(LIST_KEY, JSON.stringify(next));
  emit();
  return next.includes(title);
}

export function getProgressStore() {
  const store = readJson(PROGRESS_KEY, {});
  return store && typeof store === "object" ? store : {};
}

export function saveProgress(title, seconds, duration) {
  if (!title || !isFinite(seconds) || !isFinite(duration) || duration <= 0) return;
  const percent = Math.max(0, Math.min(100, (seconds / duration) * 100));
  const store = getProgressStore();
  if (percent >= COMPLETION_THRESHOLD * 100) {
    store[title] = { seconds: duration, duration, percent: 100, completed: true, updated: Date.now() };
  } else if (seconds > 0.25) {
    store[title] = {
      seconds: Math.min(seconds, duration),
      duration,
      percent,
      completed: false,
      updated: Date.now(),
    };
  } else {
    return;
  }
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(store));
  emit();
}

export function markCompleted(title, duration) {
  if (!title) return;
  const store = getProgressStore();
  const total = isFinite(duration) && duration > 0 ? duration : store[title]?.duration || 0;
  store[title] = { seconds: total, duration: total, percent: 100, completed: true, updated: Date.now() };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(store));
  emit();
}

export function progressPercent(title) {
  const saved = getProgressStore()[title];
  if (!saved || saved.completed || !saved.duration) return 0;
  return Math.max(0, Math.min(100, (saved.seconds / saved.duration) * 100));
}

export function getResumeTime(title) {
  const saved = getProgressStore()[title];
  if (!saved || saved.completed || !saved.seconds || saved.percent >= 98.5) return 0;
  return saved.seconds;
}

export function continueWatchingTitles() {
  return Object.entries(getProgressStore())
    .filter(([, saved]) => saved && !saved.completed && saved.seconds > 0 && saved.duration > 0 && saved.percent < 98.5)
    .sort((a, b) => (b[1].updated || 0) - (a[1].updated || 0))
    .map(([title]) => title);
}