import React, { createContext, useContext, useState } from "react";
import { TimelineContext } from "@/interfaces/timeline";
import { TimelineProviderProps } from "@/types/timeline";

const TimelineContext = createContext<TimelineContext | undefined>(undefined);

/**
 * TimelineProvider manages the state and logic for a timeline, including frame navigation.
 */
export function TimelineProvider({
  children,
  minFrame,
  maxFrame,
}: TimelineProviderProps) {
  const [frameIndex, setFrameIndex] = useState(minFrame);

  const nextFrame = () => {
    setFrame(frameIndex + 1);
  };

  const previousFrame = () => {
    setFrame(frameIndex - 1);
  };

  const setFrame = (newFrame: number) => {
    if (newFrame >= minFrame && newFrame <= maxFrame) {
      setFrameIndex(newFrame);
    }
  };

  const value = {
    frameIndex,
    setFrameIndex,
    nextFrame,
    previousFrame,
    minFrame,
    maxFrame,
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
