import React from "react";
import { useState, useEffect } from "react";

import { FramesService } from "@/services/frames";
import { RequestClient } from "@/clients/request";
import { AssetData } from "@/types/assets";
import { useTimeline } from "@/context/timeline";

const requestClient = new RequestClient();

/**
 * A React hook that fetches and manages asset data for the current frame index.
 *
 * This hook integrates with the TimelineContext to fetch asset data based on the current
 * frame index. It handles loading states and data fetching, abstracting away the complexity
 * of making API calls and managing state.
 */
export default function useFrame() {
  const { frameIndex } = useTimeline();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<AssetData | null>(null);

  const fetchAssetData = async (frameIndex: number) => {
    try {
      const data = await FramesService.fetchJson(frameIndex, requestClient);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load buffer:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssetData(frameIndex);
  }, [frameIndex]);

  return { data, isLoading, frameIndex };
}
