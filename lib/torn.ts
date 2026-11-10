/**
 * Deterministic torn-paper outlines, returned as CSS `polygon()` strings.
 * Seeded so the server and the client always agree on the same shape.
 */

type Point = readonly [number, number];

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Cosine interpolation through `[position, value]` control points. */
function interpolate(points: readonly Point[], position: number) {
  for (let i = 1; i < points.length; i++) {
    if (position <= points[i][0]) {
      const [p0, v0] = points[i - 1];
      const [p1, v1] = points[i];
      const t = (position - p0) / (p1 - p0);
      return v0 + (v1 - v0) * ((1 - Math.cos(Math.PI * t)) / 2);
    }
  }
  return points[points.length - 1][1];
}

const pct = (value: number, digits = 2) => `${value.toFixed(digits)}%`;

/**
 * A sheet anchored to the left edge whose right edge is torn.
 * `points` are `[y%, x%]` pairs describing where the tear runs.
 */
export function tornEdge({
  points,
  offset = 0,
  amp,
  seed,
}: {
  points: readonly Point[];
  offset?: number;
  amp: number;
  seed: number;
}) {
  const random = mulberry32(seed);
  const coarse = 120;
  const sub = 3;

  let drift = 0;
  const anchors: number[] = [];
  for (let i = 0; i <= coarse; i++) {
    drift = drift * 0.74 + (random() - 0.5) * amp;
    const notch = random() < 0.09 ? (random() - 0.5) * amp * 2.4 : 0;
    anchors.push(drift + notch);
  }

  const edge: string[] = [];
  for (let i = 0; i < coarse; i++) {
    for (let s = 0; s < sub; s++) {
      const f = s / sub;
      const y = ((i + f) / coarse) * 100;
      const fibre = s === 0 ? 0 : (random() - 0.5) * amp * 0.5;
      const x =
        interpolate(points, y) + offset + anchors[i] + (anchors[i + 1] - anchors[i]) * f + fibre;
      edge.push(`${pct(x)} ${pct(y, 1)}`);
    }
  }
  edge.push(`${pct(interpolate(points, 100) + offset + anchors[coarse])} 100%`);

  return `polygon(0% 0%,${edge.join(",")},0% 100%)`;
}

/** A full-width band whose top edge is torn; the other three sides stay straight. */
export function tornTop(seed: number, amp = 9) {
  const random = mulberry32(seed);
  const steps = 110;
  const edge: string[] = [];
  let drift = 0;

  for (let i = 0; i <= steps; i++) {
    drift = drift * 0.7 + (random() - 0.5) * amp;
    const notch = random() < 0.1 ? random() * amp * 0.9 : 0;
    edge.push(`${pct((i / steps) * 100, 1)} ${pct(Math.max(0, amp * 0.9 + drift + notch))}`);
  }

  return `polygon(${edge.join(",")},100% 100%,0% 100%)`;
}
