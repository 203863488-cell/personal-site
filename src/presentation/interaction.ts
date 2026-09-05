export interface SwipePoint {
  x: number;
  y: number;
  time: number;
}

/** Vertical reading, taps, and pinch gestures must never turn a slide. */
export function swipeDirection(start: SwipePoint, end: SwipePoint, width: number): -1 | 0 | 1 {
  const x = end.x - start.x;
  const y = end.y - start.y;
  const threshold = Math.max(48, Math.min(90, width * 0.075));
  if (end.time - start.time > 1600 || Math.abs(x) < threshold || Math.abs(x) < Math.abs(y) * 1.5) return 0;
  return x < 0 ? 1 : -1;
}

export function isPresentationDevice(handheld: boolean, width: number, height: number) {
  const portraitPhone = width < 768 && height >= width;
  const landscapeTablet = width >= 768 && height >= 500 && width > height;
  return handheld && (portraitPhone || landscapeTablet);
}

export function readSession(key: string, fallback = "") {
  try { return sessionStorage.getItem(key) ?? fallback; } catch { return fallback; }
}

export function writeSession(key: string, value: string) {
  try { sessionStorage.setItem(key, value); } catch { /* Private browsing can disable storage. */ }
}
