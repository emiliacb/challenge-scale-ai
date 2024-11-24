import React, { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Edges, Html } from "@react-three/drei";
import { Cuboid } from "@/types/frames";

import "./styles.css";

type CubeidsProps = {
  frameIndex?: number;
  cuboids?: Cuboid[];
};

export function Cubeid({ cuboid }: { cuboid: Cuboid }) {
  const [hovered, setHovered] = useState(false);

  function handleHover() {
    setHovered(true);
  }

  function handleLeave() {
    setHovered(false);
  }

  return (
    <mesh
      position={[
        cuboid["position.x"],
        cuboid["position.y"],
        cuboid["position.z"],
      ]}
      rotation={[0, 0, cuboid.yaw]}
      onPointerEnter={handleHover}
      onPointerLeave={handleLeave}
    >
      <boxGeometry
        args={[
          cuboid["dimensions.x"],
          cuboid["dimensions.y"],
          cuboid["dimensions.z"],
        ]}
      />
      <meshBasicMaterial
        transparent
        opacity={0.5}
        depthWrite={false}
        depthTest={false}
      />
      <Edges
        linewidth={hovered ? 1.3 : 1}
        color={hovered ? new THREE.Color(0x000000) : new THREE.Color(0x0066ff)}
        opacity={cuboid.stationary ? 0.8 : 1}
      />
      <Html distanceFactor={100} sprite>
        <div className={hovered ? "cubeid-label" : "cubeid-label-hidden"}>
          {cuboid.label}
        </div>
      </Html>
    </mesh>
  );
}

export default function Cubeids({ frameIndex, cuboids = [] }: CubeidsProps) {
  const { invalidate } = useThree();

  useEffect(() => {
    return () => invalidate();
  }, [frameIndex]);

  return (
    <group>
      {cuboids.map((cuboid) => (
        <Cubeid key={cuboid.uuid} cuboid={cuboid} />
      ))}
    </group>
  );
}
