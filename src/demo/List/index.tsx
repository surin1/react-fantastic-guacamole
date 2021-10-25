import React from "react";

import { useMusicPlayer } from "../../hooks";

import { TRACKS_LIST } from "./listData";

const List = () => {
  const { onTrackLoad, onTrackPause, isPlaying } = useMusicPlayer();

  return (
    <div>
      {TRACKS_LIST.map(({ id, title, link, artist }: any) => (
        <div
          key={id}
          onClick={() => onTrackLoad({ id, url: link })}
        >{`${title} - ${artist}`}</div>
      ))}
    </div>
  );
};

export default List;
