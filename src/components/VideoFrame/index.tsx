import React, { useEffect } from "react";

import { useMusicPlayerUi } from "../../hooks";

const VideoFrame = ({ width, height }: { width: number; height: number }) => {
  const { player } = useMusicPlayerUi();

  useEffect(() => {
    if (player.setSize) {
      player.setSize(width, height);
    }
  }, [player]);

  return <div id="player" />;
};

export default VideoFrame;
