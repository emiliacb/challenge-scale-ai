import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  KeyboardControls,
} from "@react-three/drei";

import FramesService from "@/lib/services/frames";
import useFrame from "@/lib/hooks/use-frame";
import useConfig from "@/lib/hooks/use-config";
import PointsComponent from "@/components/points";
import Cubeids from "@/components/cubeids";
import { useTimeline } from "@/lib/context/timeline";
import { RequestClient } from "@/lib/clients/request";
import { Cuboid } from "@/lib/types/frames";

const requestClient = new RequestClient();

/**
 * This component represents the 3D visualization scene.
 * It uses the useAsset hook to fetch the asset data for the given frame ID.
 * The fetched data is then used to render the points and cuboids in the scene.
 */
export default function Scene() {
  const { throttledFrameIndex } = useTimeline();
  const { data } = useFrame();
  const config = useConfig();

  /**
   * While preloading all frames into memory might not be scalable in all contexts,
   * this implementation assumes we're dealing with a single timeline viewer where
   * timelines are typically up to 10x frames in length. This makes the memory
   * footprint heavy but manageable for modern RAM capacities.
   *
   * Additionally, in a B2B context where each employer has their own instance,
   * this feature could be enabled/disabled based on specific client needs.
   *
   * For scenarios beyond this scale (e.g., multiple concurrent timelines or much longer sequences),
   * more sophisticated strategies would be needed, such as:
   * - Sliding window caching
   * - LRU cache
   * - Compression
   * - Server-side streaming optimizations
   */
  useEffect(() => {
    if (config.prefetch_frames) {
      FramesService.loadAll(
        config.timeline_min_frame,
        config.timeline_max_frame,
        requestClient
      );
    }
  }, [config]);

  return (
    <KeyboardControls
      map={[
        { name: "moveForward", keys: ["w", "ArrowUp"] },
        { name: "moveBackward", keys: ["s", "ArrowDown"] },
        { name: "moveLeft", keys: ["a", "ArrowLeft"] },
        { name: "moveRight", keys: ["d", "ArrowRight"] },
      ]}
    >
      <Canvas camera={{ position: [0, -50, 50], fov: 80 }}>
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          makeDefault
        />

        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport labelColor="white" />
        </GizmoHelper>

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <PointsComponent
          frameIndex={throttledFrameIndex ?? 0}
          positions={data?.points}
        />

        <Cubeids
          frameIndex={throttledFrameIndex ?? 0}
          cuboids={data?.cuboids ?? ([] as Cuboid[])}
        />
      </Canvas>
    </KeyboardControls>
  );
}
