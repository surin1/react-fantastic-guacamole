import React, { useState, memo } from "react";

import SeekSlider from "../../components/SeekSlider";
import Duration from "../../components/Duration";
import CurrentTime from "../../components/CurrentTime";
import VideoFrame from "../../components/VideoFrame";
import PlayPauseButton from "../../components/PlayPauseButton";

import { useMusicPlayer, useMusicPlayerUi } from "../../hooks";

import { TRACKS_LIST as tracksList } from "../List/listData";

import styles from "./index.module.css";

const Player = () => {
  const { trackData } = useMusicPlayerUi();
  const { onTrackLoad } = useMusicPlayer();
  const currentTrackIndex = tracksList.findIndex(({ id }) => {
    return id === trackData.id;
  });
  const prevTrack = tracksList[currentTrackIndex - 1];
  const nextTrack = tracksList[currentTrackIndex + 1];

  return (
    <div className={styles.container}>
      <div className={styles.videoFrameWrapper}>
        <VideoFrame width={234} height={132} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <div className={styles.title}>{trackData.title}</div>
            <div className={styles.artist}>{trackData.artist}</div>
          </div>

          <div>
            <div
              onClick={() =>
                onTrackLoad({
                  id: prevTrack.id,
                  url: prevTrack.link,
                  title: prevTrack.title,
                  artist: prevTrack.artist,
                  isAutoPlay: true,
                })
              }
            >
              prev
            </div>
            <PlayPauseButton
              playButtonClass={styles.playButton}
              pauseButtonClass={styles.pauseButton}
            />
            <div
              onClick={() => {
                onTrackLoad({
                  id: nextTrack.id,
                  url: nextTrack.link,
                  title: nextTrack.title,
                  artist: nextTrack.artist,
                  isAutoPlay: true,
                });
              }}
            >
              next
            </div>
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
