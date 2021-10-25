import React, { useState } from "react";
import { useMusicPlayer } from "../hooks";

import SeekSlider from "../components/SeekSlider";
import Duration from "../components/Duration";
import CurrentTime from "../components/CurrentTime";
import VideoFrame from "../components/VideoFrame";
import PlayPauseButton from "../components/PlayPauseButton";

import List from "./List";

const Demo = () => {
  const [link, setLink] = useState("");
  const [id, setId] = useState("");

  return (
    <div>
      <VideoFrame />
      <SeekSlider />
      <div style={{ display: "flex" }}>
        <CurrentTime /> - <Duration />
      </div>
      <PlayPauseButton />
      <List />
    </div>
  );
};

export default Demo;
