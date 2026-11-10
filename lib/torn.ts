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

/** A thin horizontal scrap, torn along both edges and tapering at the ends. */
export function tornBand(seed: number) {
  const random = mulberry32(seed);
  const steps = 90;
  const top: string[] = [];
  const bottom: string[] = [];
  let up = 0;
  let down = 0;

  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * 100;
    const envelope = Math.pow(Math.sin((Math.PI * i) / steps), 0.45);
    up = up * 0.6 + (random() - 0.5) * 26;
    down = down * 0.6 + (random() - 0.5) * 26;
    top.push(`${pct(x, 1)} ${pct(50 - (24 + up) * envelope, 1)}`);
    bottom.unshift(`${pct(x, 1)} ${pct(50 + (24 + down) * envelope, 1)}`);
  }

  return `polygon(${[...top, ...bottom].join(",")})`;
}

/** A rectangle whose four sides are slightly torn. */
export function tornRect(seed: number, ampX = 0.7, ampY = 2.4) {
  const random = mulberry32(seed);
  const long = 70;
  const short = 16;
  const jag = (amp: number) => random() * amp + (random() < 0.12 ? random() * amp : 0);
  const out: string[] = [];

  for (let i = 0; i <= long; i++) out.push(`${pct((i / long) * 100, 1)} ${pct(jag(ampY))}`);
  for (let i = 1; i < short; i++) out.push(`${pct(100 - jag(ampX))} ${pct((i / short) * 100, 1)}`);
  for (let i = long; i >= 0; i--) out.push(`${pct((i / long) * 100, 1)} ${pct(100 - jag(ampY))}`);
  for (let i = short - 1; i >= 1; i--) out.push(`${pct(jag(ampX))} ${pct((i / short) * 100, 1)}`);

  return `polygon(${out.join(",")})`;
}
