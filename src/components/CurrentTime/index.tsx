import React from "react";
import { useMusicPlayer } from "../../hooks";
import { formatToMMSS } from "../../utils/helpers/time";

const CurrentTime = ({}) => {
  const { currentTime } = useMusicPlayer();

  return <div>{formatToMMSS(currentTime)}</div>;
};

export default CurrentTime;
