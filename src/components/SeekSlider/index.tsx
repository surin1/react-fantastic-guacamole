import React, { useState, useRef } from "react";
import { useMusicPlayer } from "../../hooks";

import styles from "./index.module.css";

const SeekSlider = ({
  trackColor = "#ffe29e",
  fillColor = "#dc9300",
}: {
  trackColor?: string;
  fillColor?: string;
}) => {
  const { duration, seekTo, currentTime } = useMusicPlayer();
  const barRef = useRef(null);

  const fillWidth = barRef.current
    ? (currentTime / duration) * barRef.current.offsetWidth + "px"
    : 0;

  return (
    <div>
      <div
        className={styles.track}
        ref={barRef}
        style={{ backgroundColor: trackColor }}
      >
        <input
          min="0"
          value={currentTime}
          max={duration}
          type="range"
          className={styles.seekSlider}
          onChange={(e) => seekTo(Number(e.target.value))}
        />
        <div
          className={styles.seekSliderFill}
          style={{
            backgroundColor: fillColor,
            width: fillWidth,
          }}
        />
      </div>
    </div>
  );
};

export default SeekSlider;
