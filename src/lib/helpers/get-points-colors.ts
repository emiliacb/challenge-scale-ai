import { clamp } from "@/lib/helpers/clamp";

export function interpolateColor(
  r: number,
  g: number,
  b: number,
  factor: number
): [number, number, number] {
  // Adjust the lightness by the factor while keeping hue and saturation constant
  return [clamp(r * factor, 0, 0.5), clamp(g * factor, 0, 0.5), b];
}

export function getPointsColors(
  positions: [number, number, number][]
): [number, number, number][] {
  return positions.map((position) => {
    const color = interpolateColor(0.5, 0.1, 1, position[2] / 100);
    return color;
  });
}
