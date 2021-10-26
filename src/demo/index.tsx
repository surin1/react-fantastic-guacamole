import React, { useState } from "react";
import { useMusicPlayer } from "../hooks";

import SeekSlider from "../components/SeekSlider";
import Duration from "../components/Duration";
import CurrentTime from "../components/CurrentTime";
import VideoFrame from "../components/VideoFrame";
import PlayPauseButton from "../components/PlayPauseButton";

import List from "./List";
import Player from "./Player";

const Demo = () => {
  const [link, setLink] = useState("");
  const [id, setId] = useState("");

  return (
    <div>
      <Player />
      <List />
    </div>
  );
};

export default Demo;
