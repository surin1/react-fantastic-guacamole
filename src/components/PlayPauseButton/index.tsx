import React, { useState, useRef } from "react";
import { useMusicPlayer } from "../../hooks";

type Props = {
  id: string;
  url: string;
};

const PlayPauseButton = () => {
  const { onTrackPlay, onTrackPause, isPlaying } = useMusicPlayer();
  const handleClick = () => {
    if (isPlaying) {
      onTrackPause();
    } else {
      onTrackPlay();
    }
  };

  return (
    <div>
      <button onClick={handleClick}>{isPlaying ? "pause" : "play"}</button>
    </div>
  );
};

export default PlayPauseButton;
