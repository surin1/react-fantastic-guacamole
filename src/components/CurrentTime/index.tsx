import React from "react";
import { useMusicPlayerCurrentTime } from "../../hooks";
import { formatToMMSS } from "../../utils/helpers/time";

const CurrentTime = ({}) => {
  const currentTime = useMusicPlayerCurrentTime();

  return <div>{formatToMMSS(currentTime)}</div>;
};

export default CurrentTime;
