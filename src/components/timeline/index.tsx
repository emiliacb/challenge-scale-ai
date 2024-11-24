import React from "react";

import { useTimeline } from "@/context/timeline";
import { Icon } from "@/components/icon";

import "./styles.css";

/**
 * Timeline component provides a user interface for navigating through frames of a timeline.
 */
export default function Timeline() {
  const {
    frameIndex,
    setFrameIndex,
    nextFrame,
    previousFrame,
    minFrame,
    maxFrame,
    isPlaying,
    togglePlay,
    isLoadingFrame,
  } = useTimeline();

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoadingFrame) return;
    setFrameIndex?.(parseInt(event.target.value));
  };

  return (
    <div className="timeline_container">
      <div className="timeline_wrapper">
        <div className="timeline_slider_wrapper">
          <span
            tabIndex={-1}
            id="timeline_frame_count"
            role="alert"
            aria-live="assertive"
            className="sr-only"
          >
            {`Frame ${frameIndex} of ${maxFrame}`}
          </span>
          <input
            type="range"
            min={minFrame}
            max={maxFrame}
            value={frameIndex}
            onChange={handleSliderChange}
            className="timeline_slider"
            aria-label={`Frame ${frameIndex} of ${maxFrame}`}
            aria-valuemin={minFrame}
            aria-valuemax={maxFrame}
            aria-valuenow={frameIndex}
            aria-valuetext={`Frame ${frameIndex} of ${maxFrame}`}
          />
          <span className="timeline_frame_count" aria-hidden>
            {`${frameIndex}/${maxFrame}`}
          </span>
        </div>
        <div className="timeline_controls">
          <button
            onClick={previousFrame}
            className="secondary"
            title="Previous frame"
          >
            <Icon id="backward" />
          </button>
          <button onClick={togglePlay} className="primary" title="Play/Pause">
            <Icon id={isPlaying ? "pause" : "play"} />
          </button>
          <button onClick={nextFrame} className="secondary" title="Next frame">
            <Icon id="forward" />
          </button>
        </div>
      </div>
    </div>
  );
}
