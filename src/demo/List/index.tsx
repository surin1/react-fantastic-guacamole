import React, { useEffect } from "react";

import { useMusicPlayer } from "../../hooks";

import { TRACKS_LIST } from "./listData";

import styles from "./index.module.css";

const List = () => {
  const { onTrackLoad } = useMusicPlayer();
  const { id, link, title, artist } = TRACKS_LIST[1];

  useEffect(() => {
    onTrackLoad({ id: id, url: link, title, artist, isAutoPlay: false });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.cell}>id</div>
        <div className={styles.cell}>title</div>
        <div className={styles.cell}>artist</div>
      </div>
      {TRACKS_LIST.map(({ id, title, link, artist }: any) => {
        return (
          <div
            className={styles.track}
            key={id}
            onClick={() => {
              onTrackLoad({ id, url: link, title, artist, isAutoPlay: true });
            }}
          >
            <div className={styles.cell}>{id}</div>
            <div className={styles.cell}>{title}</div>
            <div className={styles.cell}>{artist}</div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
