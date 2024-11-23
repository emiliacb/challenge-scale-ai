import { useThrottleFn } from "react-use";

export interface TimelineContext {
  isLoadingFrame: boolean;
  setIsLoadingFrame: (isLoading: boolean) => void;
  frameIndex: number;
  setFrameIndex: (id: number) => void;
  nextFrame: () => void;
  previousFrame: () => void;
  minFrame: number;
  maxFrame: number;
  throttledFrameIndex: number;
}
