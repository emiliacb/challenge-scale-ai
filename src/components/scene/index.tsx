import React, { Suspense, lazy, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import FramesService from "@/services/frames";
import useFrame from "@/hooks/use-frame";
import useConfig from "@/hooks/use-config";
import Spinner from "@/components/spinner";
import { useTimeline } from "@/context/timeline";
import { RequestClient } from "@/clients/request";

const PointsComponent = lazy(() => import("@/components/points"));

const requestClient = new RequestClient();

/**
 * This component represents the 3D visualization scene.
 * It uses the useAsset hook to fetch the asset data for the given frame ID.
 * The fetched data is then used to render the points and cuboids in the scene.
 */
export function Scene() {
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
    <div style={{ width: "50vw", height: "50vh", border: "1px solid red" }}>
      <Suspense fallback={<Spinner />}>
        <Canvas camera={{ position: [0, 0, 50], fov: 40 }}>
          <OrbitControls />
          <PointsComponent
            frameIndex={throttledFrameIndex ?? 0}
            positions={data?.points}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
