import { clamp } from "@/lib/helpers/clamp";

export function interpolateColor(
  r: number,
  g: number,
  b: number,
  factor: number
): [number, number, number] {
  // Adjust the lightness by the factor while keeping hue and saturation constant
  return [
    Number(clamp(r * factor, 0, 0.7).toFixed(3)),
    Number(clamp(g * factor, 0, 0.5).toFixed(3)),
    Number(b.toFixed(3)),
  ];
}

export function getPointsColors(
  positions: [number, number, number][]
): [number, number, number][] {
  return positions.map((position) => {
    const color = interpolateColor(0.8, 0.2, 1, position[2] / 100);
    return color;
  });
}
