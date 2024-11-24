import React, { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";

type PointsComponentProps = {
  frameIndex?: number;
  positions?: Float32Array | undefined;
  colors?: Float32Array | undefined;
};

/**
 * This component renders the points in the scene.
 * It uses the useThree hook to invalidate the scene when the positions change.
 */
export default function PointsComponent({
  frameIndex,
  positions,
  colors,
}: PointsComponentProps) {
  const pointsRef = useRef<any>(null);
  const { invalidate } = useThree();

  useMemo(() => {
    if (pointsRef.current && positions && colors) {
      pointsRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      pointsRef.current.geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3)
      );
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      invalidate();
    }
  }, [frameIndex, positions]);

  return (
    <Points
      ref={pointsRef}
      positions={positions || new Float32Array([0, 0, 0])}
      colors={colors}
    >
      <PointMaterial
        transparent
        size={0.1}
        sizeAttenuation={true}
        vertexColors
      />
    </Points>
  );
}
