export interface TimelineContext {
  isLoadingFrame: boolean;
  setIsLoadingFrame: (isLoading: boolean) => void;
  frameIndex: number;
  setFrameIndex: (id: number) => void;
  nextFrame: () => void;
  previousFrame: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
  minFrame: number;
  maxFrame: number;
  throttledFrameIndex: number | null;
}
