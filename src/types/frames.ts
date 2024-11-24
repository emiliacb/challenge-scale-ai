export type Cuboid = {
  uuid: string;
  label: string;
  yaw: number;
  stationary: boolean;
  camera_used: number;
  sibling_id: string;
  sensor_id: number;
  "position.x": number;
  "position.y": number;
  "position.z": number;
  "dimensions.x": number;
  "dimensions.y": number;
  "dimensions.z": number;
};

export type FrameData = {
  frameId: string;
  points: Float32Array;
  cuboids: Cuboid[];
};
