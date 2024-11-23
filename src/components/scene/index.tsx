import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { useTimeline } from "@/context/timeline";
import useFrame from "@/hooks/use-frame";
import PointsComponent from "@/components/points";

/**
 * This component represents the 3D visualization scene.
 * It uses the useAsset hook to fetch the asset data for the given frame ID.
 * The fetched data is then used to render the points and cuboids in the scene.
 */
export function Scene() {
  const { throttledFrameIndex } = useTimeline();
  const { data } = useFrame();

  return (
    <div style={{ width: "50vw", height: "50vh", border: "1px solid red" }}>
      <Canvas camera={{ position: [0, 0, 50], fov: 40 }}>
        <OrbitControls />
        <PointsComponent
          frameIndex={throttledFrameIndex}
          positions={data?.points}
        />
      </Canvas>
    </div>
  );
}
