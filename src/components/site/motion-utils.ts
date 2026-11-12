/** Deterministic pseudo-random (same on server and client, so no hydration mismatch). */
export function seeded(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export const cinematicEase = [0.16, 1, 0.3, 1] as const;
