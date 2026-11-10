import { tornBand } from "@/lib/torn";

/** A scrap of the wine paper from the cover, torn along both edges. */
export default function Divider({ seed = 1 }: { seed?: number }) {
  return (
    <div className="torn-divider" style={{ clipPath: tornBand(seed) }} aria-hidden="true" />
  );
}
