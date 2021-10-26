import React, { useState } from "react";

import SeekSlider from "../../components/SeekSlider";
import Duration from "../../components/Duration";
import CurrentTime from "../../components/CurrentTime";
import VideoFrame from "../../components/VideoFrame";
import PlayPauseButton from "../../components/PlayPauseButton";

import { useMusicPlayer } from "../../hooks";

import styles from "./index.module.css";

const Player = () => {
  const { trackData } = useMusicPlayer();
  console.log("trackData: ", trackData);
  return (
    <div className={styles.container}>
      <div className={styles.videoFrameWrapper}>
        <VideoFrame />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <div className={styles.title}>{trackData.title}</div>
            <div className={styles.artist}>{trackData.artist}</div>
          </div>

          <div>
            <PlayPauseButton />
          </div>
        </div>
        <div className={styles.timeTrack}>
          <SeekSlider />
          <div className={styles.timeValues}>
            <CurrentTime />
            <Duration />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;