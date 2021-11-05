import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  useMusicPlayer,
  useMusicPlayerCurrentTime,
  useMusicPlayerDuration,
} from "../../hooks";

import styles from "./index.module.css";

const SeekSlider = ({
  trackColor = "#ffe29e",
  fillColor = "#dc9300",
}: {
  trackColor?: string;
  fillColor?: string;
}) => {
  const duration = useMusicPlayerDuration();
  const currentTime = useMusicPlayerCurrentTime();
  const { seekTo } = useMusicPlayer();
  const [fillWidth, setFillWidth] = useState("0");
  const barRef = useRef(null);

  useEffect(() => {
    const value = barRef.current
      ? (currentTime / duration) * barRef.current.offsetWidth + "px"
      : "0";

    setFillWidth(value);
  }, [currentTime, duration, barRef.current]);

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
