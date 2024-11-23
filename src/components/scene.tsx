import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PointMaterial, Points, Stats } from "@react-three/drei";

import useFrame from "@/hooks/use-frame";
import Spinner from "@/components/spinner";

/**
 * This component represents the 3D visualization scene.
 * It uses the useAsset hook to fetch the asset data for the given frame ID.
 * The fetched data is then used to render the points and cuboids in the scene.
 */
export function Scene() {
  const [renderKey, setRenderKey] = useState(0);
  const { isLoading, data, frameIndex } = useFrame();

  useEffect(() => {
    setRenderKey(renderKey + 1);
  }, [frameIndex]);

  return (
    <div style={{ width: "50vw", height: "50vh", border: "1px solid red" }}>
      {isLoading ? <Spinner /> : null}
      <Canvas camera={{ position: [0, 0, 50], fov: 40 }}>
        <Stats />
        <OrbitControls />
        <Points key={renderKey} positions={data?.points}>
          <PointMaterial size={0.1} color="darkblue" />
        </Points>
      </Canvas>
    </div>
  );
}
