import React, { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";

type PointsComponentProps = {
  frameIndex?: number;
  positions?: Float32Array | undefined;
};

/**
 * This component renders the points in the scene.
 * It uses the useThree hook to invalidate the scene when the positions change.
 */
export default function PointsComponent({
  frameIndex,
  positions,
}: PointsComponentProps) {
  const pointsRef = useRef<any>(null);
  const { invalidate } = useThree();

  useEffect(() => {
    if (pointsRef.current && positions) {
      pointsRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      invalidate();
    }
  }, [frameIndex, invalidate, positions]);

  return (
    <Points
      ref={pointsRef}
      positions={positions || new Float32Array([0, 0, 0])}
    >
      <PointMaterial
        transparent
        size={0.005}
        sizeAttenuation={true}
        depthWrite={false}
        color="darkblue"
      />
    </Points>
  );
}
