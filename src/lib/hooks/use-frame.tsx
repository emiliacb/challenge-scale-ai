import React from "react";
import { useState, useEffect } from "react";

import FramesService from "@/lib/services/frames";
import { RequestClient } from "@/clients/request";
import { FrameData } from "@/lib/types/frames";
import { useTimeline } from "@/lib/context/timeline";

const requestClient = new RequestClient();

/**
 * A React hook that fetches and manages asset data for the current frame index.
 *
 * This hook integrates with the TimelineContext to fetch asset data based on the current
 * frame index. It handles loading states and data fetching, abstracting away the complexity
 * of making API calls and managing state.
 */
export default function useFrame() {
  const { frameIndex, isLoadingFrame, setIsLoadingFrame } = useTimeline();
  const [data, setData] = useState<FrameData>();

  const fetchFrameData = async (frameIndex: number) => {
    try {
      const data = await FramesService.get(frameIndex, requestClient);
      setData(data);
      setIsLoadingFrame(false);
    } catch (error) {
      console.error("Failed to load buffer:", error);
      setIsLoadingFrame(false);
    }
  };

  useEffect(() => {
    fetchFrameData(frameIndex);
  }, [frameIndex]);

  return { data, isLoadingFrame, frameIndex };
}
