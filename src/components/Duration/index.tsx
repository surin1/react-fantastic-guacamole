import React, { useState, useRef } from "react";
import { useMusicPlayer } from "../../hooks";
import { formatToMMSS } from "../../utils/helpers/time";

const Duration = () => {
  const { duration } = useMusicPlayer();

  return <div>{formatToMMSS(duration)}</div>;
};

export default Duration;
