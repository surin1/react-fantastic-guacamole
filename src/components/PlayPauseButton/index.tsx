import React from "react";
import { useMusicPlayer } from "../../hooks";

const PlayPauseButton = ({
  playButtonClass,
  pauseButtonClass,
}: {
  playButtonClass: string;
  pauseButtonClass: string;
}) => {
  const { onTrackPlay, onTrackPause, isPlaying } = useMusicPlayer();
  const buttonClass = isPlaying ? pauseButtonClass : playButtonClass;
  const handleClick = () => {
    if (isPlaying) {
      onTrackPause();
    } else {
      onTrackPlay();
    }
  };

  return <div className={buttonClass} onClick={handleClick} />;
};

export default PlayPauseButton;
