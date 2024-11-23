import React, { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";

type PointsComponentProps = {
  frameIndex: number;
  positions: Float32Array | undefined;
};

/**
 * This component renders the points in the scene.
 * It uses the useThree hook to invalidate the scene when the positions change.
 */
export default function PointsComponent({
  frameIndex,
  positions,
}: PointsComponentProps) {
  const [renderKey, setRenderKey] = useState(0);
  const { invalidate } = useThree();

  useEffect(() => {
    invalidate();
    setRenderKey(renderKey + 1);
  }, [frameIndex, invalidate, positions]);

  return (
    <Points
      positions={positions}
      key={renderKey}
      count={positions ? positions.length / 3 : 0}
    >
      <PointMaterial
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        color="darkblue"
      />
    </Points>
  );
}
