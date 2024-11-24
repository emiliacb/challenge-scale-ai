import { clamp } from "@/lib/helpers/clamp";

export function interpolateColor(
  r: number,
  g: number,
  b: number,
  factor: number
): [number, number, number] {
  return [clamp(r + factor, 0, 1), g, clamp(b - factor, 0, 1)];
}

export function getPointsColors(
  positions: [number, number, number][]
): [number, number, number][] {
  return positions.map((position) => {
    const color = interpolateColor(0, 0, 0.8, position[2] / 100);
    return color;
  });
}
