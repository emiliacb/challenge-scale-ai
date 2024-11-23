export type Cuboid = {
  uuid: string;
  center: [number, number, number];
  dimensions: [number, number, number];
  yaw: number;
};

export type AssetData = {
  points: Float32Array;
  cuboids: Cuboid[];
};
