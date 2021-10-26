import React, { useState, useRef } from "react";
import { useMusicPlayer } from "../../hooks";

const CurrentTime = () => {
  const { currentTime } = useMusicPlayer();

  return <div>{currentTime}</div>;
};

export default CurrentTime;
