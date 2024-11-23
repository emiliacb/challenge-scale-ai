import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PointMaterial, Points } from "@react-three/drei";

import useAsset from "@/hooks/use-asset";
import Spinner from "@/components/spinner";

/**
 * This component represents the 3D visualization scene.
 * It uses the useAsset hook to fetch the asset data for the given frame ID.
 * The fetched data is then used to render the points and cuboids in the scene.
 */
export function Scene() {
  const { isLoading, data } = useAsset({ frameId: "00" });

  return (
    <div style={{ width: "50vw", height: "50vh", border: "1px solid red" }}>
      {isLoading ? <Spinner /> : null}
      <Canvas camera={{ position: [0, 0, 50], fov: 40 }}>
        <OrbitControls />
        <Points positions={data?.points}>
          <PointMaterial size={0.1} color="darkblue" />
        </Points>
      </Canvas>
    </div>
  );
}
