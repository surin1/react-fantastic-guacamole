import React, { useState } from "react";
import { useMusicPlayer } from "../hooks";
import List from "./List";
import Player from "./Player";

const Demo = () => (
  <div>
    <Player />
    <List />
  </div>
);

export default Demo;
