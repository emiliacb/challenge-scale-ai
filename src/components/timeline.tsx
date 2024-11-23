import React from "react";
import { useTimeline } from "@/context/timeline";

export function Timeline() {
  const {
    frameIndex,
    setFrameIndex,
    nextFrame,
    previousFrame,
    minFrame,
    maxFrame,
  } = useTimeline();

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrameIndex(parseInt(event.target.value));
  };

  return (
    <div className="timeline">
      <div className="timeline-controls">
        <button onClick={previousFrame} className="timeline-button">
          Previous
        </button>
        <input
          type="range"
          min={minFrame}
          max={maxFrame}
          value={frameIndex}
          onChange={handleSliderChange}
          className="timeline-slider"
        />
        <button onClick={nextFrame} className="timeline-button">
          Next
        </button>
      </div>
    </div>
  );
}
