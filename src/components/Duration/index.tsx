import React, { useState, useRef } from "react";
import { useMusicPlayer } from "../../hooks";

const Duration = () => {
  const { duration } = useMusicPlayer();

  return <div>{duration}</div>;
};

export default Duration;
