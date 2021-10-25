import React, { useState } from "react";
import { useMusicPlayer } from "../hooks";

import SeekSlider from "../components/SeekSlider";
import Duration from "../components/Duration";
import CurrentTime from "../components/CurrentTime";
import VideoFrame from "../components/VideoFrame";

const Demo = () => {
  const { onTrackPlay, onTrackPause, duration, isPlaying } = useMusicPlayer();
  const [link, setLink] = useState("");
  const [id, setId] = useState("");

  return (
    <div>
      <VideoFrame />
      <SeekSlider />
      <div style={{ display: "flex" }}>
        <CurrentTime /> - <Duration />
      </div>
      <input placeholder="link" onChange={(e) => setLink(e.target.value)} />
      <input placeholder="id" onChange={(e) => setId(e.target.value)} />
      <button
        onClick={() =>
          onTrackPlay({
            id,
            url: link,
          })
        }
      >
        play track
      </button>
      <button onClick={() => onTrackPause()}>pause track</button>
    </div>
  );
};

export default Demo;
