import React, { useState, useRef } from "react";
import { useMusicPlayer } from "../../hooks";

const CurrentTime = () => {
  const { currentTime } = useMusicPlayer();
  console.log(123, currentTime);
  return <div>{currentTime}</div>;
};

export default CurrentTime;
