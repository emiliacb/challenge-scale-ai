export interface TimelineContext {
  frameIndex: number;
  setFrameIndex: (id: number) => void;
  nextFrame: () => void;
  previousFrame: () => void;
  minFrame: number;
  maxFrame: number;
}
