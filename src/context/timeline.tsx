import React, { createContext, useContext, useState } from "react";

interface TimelineContextType {
  frameIndex: number;
  setFrameIndex: (id: number) => void;
  nextFrame: () => void;
  previousFrame: () => void;
  minFrame: number;
  maxFrame: number;
}

const TimelineContext = createContext<TimelineContextType | undefined>(
  undefined
);

interface TimelineProviderProps {
  children: React.ReactNode;
  minFrame: number;
  maxFrame: number;
}

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

  return (
    <TimelineContext.Provider
      value={{
        frameIndex,
        setFrameIndex,
        nextFrame,
        previousFrame,
        minFrame,
        maxFrame,
      }}
    >
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
