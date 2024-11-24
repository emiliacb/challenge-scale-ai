import { useEffect } from "react";

export function useTimelineAnimation({
  isPlaying,
  frameIndex,
  maxFrame,
  minFrame,
  setFrameIndex,
  fps,
}: {
  isPlaying: boolean;
  frameIndex: number;
  maxFrame: number;
  minFrame: number;
  setFrameIndex: (frame: number) => void;
  fps: number;
}) {
  useEffect(() => {
    let timeoutId: number;
    const frameDelay = 1000 / fps;

    const animate = () => {
      if (isPlaying) {
        if (frameIndex < maxFrame) {
          setFrameIndex(frameIndex + 1);
        } else {
          setFrameIndex(minFrame);
        }
        timeoutId = window.setTimeout(animate, frameDelay);
      }
    };

    if (isPlaying) {
      timeoutId = window.setTimeout(animate, frameDelay);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [frameIndex, maxFrame, minFrame, isPlaying, setFrameIndex, fps]);
}
