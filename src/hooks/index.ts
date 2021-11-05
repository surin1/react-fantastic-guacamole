import { useRef, useEffect, useState, useContext, useMemo } from "react";
import getYouTubeID from "get-youtube-id";

import { PlayerContext } from "../context";
import {
  dispatchTrackData,
  dispatchPauseTrack,
  dispatchPlayTrack,
} from "./actions";
import { youtubeRegExp } from "../utils/regexp";

type TrackPlayArgs = {
  id: number;
  url: string;
  title: string;
  artist: string;
  isAutoPlay: boolean;
};

function useInterval(callback: any, delay: any) {
  const savedCallback = useRef(null);

  if (!savedCallback) {
    return;
  }

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const useMusicPlayerDuration = () => {
  const [state] = useContext(PlayerContext);

  if (!state.player) {
    return;
  }

  const [duration, setDuration] = useState(0);

  function handleMediaDuration() {
    if (state.player.duration) {
      setDuration(state.player.duration);
    }
  }
  useEffect(() => {
    if (!state.currentTrackUrl) {
      return;
    }

    const isYoutubeLink = state.currentTrackUrl.match(youtubeRegExp);
    if (isYoutubeLink) {
      state.player.on("playing", () => {
        setDuration(state.player.getDuration());
      });
      return () => {
        setDuration(0);
      };
    }

    state.player.addEventListener("durationchange", handleMediaDuration);

    return () => {
      state.player.removeEventListener("durationchange", handleMediaDuration);
    };
  }, [state.currentTrackUrl]);

  return duration;
};

export const useMusicPlayerCurrentTime = () => {
  const [state] = useContext(PlayerContext);

  if (!state.player) {
    return;
  }

  const [currentTime, setCurrentTime] = useState(0);

  useInterval(
    () => {
      const isYoutubeLink = state.currentTrackUrl.match(youtubeRegExp);

      if (!isYoutubeLink) {
        setCurrentTime(state.player.currentTime);
      }
    },
    state.isPlaying ? 1000 : null
  );
  useEffect(() => {
    const isYoutubeLink = state.currentTrackUrl.match(youtubeRegExp);
    if (isYoutubeLink) {
      state.player.on("timeupdate", () => {
        setCurrentTime(state.player.getCurrentTime());
      });
    }

    return () => {
      setCurrentTime(0);
    };
  }, [state.currentTrackUrl]);

  return currentTime;
};

export const useMusicPlayerUi = () => {
  const [state] = useContext(PlayerContext);

  if (!state.player) {
    return;
  }

  return {
    trackData: {
      id: state.currentTrackId,
      url: state.currentTrackUrl,
      ...state.trackData,
    },
    isPlaying: state.isPlaying,
    player: state.player,
  };
};

export const useMusicPlayer = () => {
  const [state, dispatch] = useContext(PlayerContext);

  if (!state.player) {
    return;
  }

  useEffect(() => {
    () => {
      if (state.player.destroy) {
        state.player.destroy();
      }
    };
  }, [state.player]);

  function seekTo(time: Number) {
    if (!state.player) {
      return;
    }

    const isYoutubeLink = state.currentTrackUrl.match(youtubeRegExp);
    if (isYoutubeLink) {
      state.player.seek(time);
    } else {
      state.player.currentTime = time;
    }
    onTrackPlay();
  }

  function onTrackPlay() {
    dispatchPlayTrack({ dispatch });
  }

  function onTrackPause() {
    dispatchPauseTrack({ dispatch });
  }

  function onTrackLoad({ id, url, title, artist, isAutoPlay }: TrackPlayArgs) {
    const isYoutubeLink = state.currentTrackUrl.match(youtubeRegExp);

    if (isYoutubeLink && state.player.destroy) {
      state.player.destroy();
    } else if (!isYoutubeLink) {
      state.player.pause();
    }

    dispatchTrackData({
      dispatch,
      id,
      url,
      title,
      artist,
      isAutoPlay,
    });
  }

  useEffect(() => {
    const isYoutubeLink = state.currentTrackUrl.match(youtubeRegExp);

    if (isYoutubeLink) {
      const id = getYouTubeID(state.currentTrackUrl);
      state.player.load(id, state.isAutoPlay);
    }

    if (state.isAutoPlay) {
      onTrackPlay();
    }

    return () => {
      onTrackPause();
    };
  }, [state.currentTrackUrl, state.isAutoPlay]);

  useEffect(() => {
    if (state.isPlaying) {
      state.player.play();
    } else {
      state.player.pause();
    }

    return () => {
      state.player.pause();
    };
  }, [state.isPlaying, state.currentTrackUrl]);

  return {
    seekTo,
    onTrackLoad,
    onTrackPlay,
    onTrackPause,
  };
};
