import React, { useState, useRef } from "react";
import { useMusicPlayer } from "../../hooks";

const Duration = () => {
  const { currentTime } = useMusicPlayer();

  return <div>{currentTime}</div>;
};

export default Duration;
