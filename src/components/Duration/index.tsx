import React from "react";
import { useMusicPlayerDuration } from "../../hooks";
import { formatToMMSS } from "../../utils/helpers/time";

const Duration = () => {
  const duration = useMusicPlayerDuration();

  return <div>{formatToMMSS(duration)}</div>;
};

export default Duration;
