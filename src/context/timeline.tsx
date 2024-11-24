import React, { createContext, useContext, useState } from "react";
import { TimelineContext } from "@/interfaces/timeline";
import { useThrottleFn } from "react-use";
import { useTimelineAnimation } from "@/hooks/use-timeline-animation";
import useConfig from "@/hooks/use-config";

const TimelineContext = createContext<TimelineContext | undefined>(undefined);

/**
 * TimelineProvider manages the state and logic for a timeline, including frame navigation.
 */
export function TimelineProvider({ children }: { children: React.ReactNode }) {
  const config = useConfig();
  const { timeline_min_frame, timeline_max_frame, timeline_fps } = config;
  const [isLoadingFrame, setIsLoadingFrame] = useState(true);
  const [frameIndex, setFrameIndex] = useState(config?.timeline_min_frame);
  const [isPlaying, setIsPlaying] = useState(false);

  useTimelineAnimation({
    isPlaying,
    frameIndex,
    maxFrame: timeline_max_frame,
    minFrame: timeline_min_frame,
    setFrameIndex,
    fps: timeline_fps ?? 0,
  });

  const nextFrame = () => {
    setFrame(frameIndex + 1);
  };

  const previousFrame = () => {
    setFrame(frameIndex - 1);
  };

  const setFrame = (newFrame: number) => {
    if (newFrame >= timeline_min_frame && newFrame <= timeline_max_frame) {
      setFrameIndex(newFrame);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const throttledFrameIndex = useThrottleFn(
    () => {
      if (!isLoadingFrame) {
        return frameIndex;
      }
      return null;
    },
    timeline_fps,
    []
  );

  const value = {
    isLoadingFrame,
    setIsLoadingFrame,
    frameIndex,
    throttledFrameIndex,
    setFrameIndex,
    nextFrame,
    previousFrame,
    minFrame: timeline_min_frame,
    maxFrame: timeline_max_frame,
    isPlaying,
    togglePlay,
  };

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error("useTimeline must be used within a TimelineProvider");
  }
  return context;
}
