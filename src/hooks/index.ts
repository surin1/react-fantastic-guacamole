import { useRef, useEffect, useState, useContext } from "react";
import getYouTubeID from "get-youtube-id";

import { PlayerContext } from "../context";
import {
  dispatchTrackData,
  dispatchPauseTrack,
  dispatchPlayTrack,
} from "../utils/playerControls";
import { youtubeRegExp } from "../utils/regexp";

type TrackPlayArgs = {
  id: string;
  url: string;
};

function useInterval(callback: any, delay: any) {
  const savedCallback = useRef(null);

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

const useMusicPlayer = () => {
  const [state, dispatch] = useContext(PlayerContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useInterval(
    () => {
      const isYoutubeLink = state.currentTrackUrl.match(youtubeRegExp);
      if (isYoutubeLink) {
        state.player.on("timeupdate", () => {
          setCurrentTime(state.player.getCurrentTime());
        });
      } else {
        setCurrentTime(state.player.currentTime);
      }
    },
    state.isPlaying ? 100 : null
  );

  // @HANDLERS

  function onTrackPlay({ id, url }: TrackPlayArgs) {
    if (state.currentTrackId == id) {
      dispatchPlayTrack({ dispatch });
      return;
    }

    // because we want to pause previous track was playing
    // so we will not have two tracks playing together
    state.player.pause();
    setIsLoaded(false);
    dispatchTrackData({ dispatch, id, url });
  }
  function onTrackPause() {
    dispatchPauseTrack({ dispatch });
  }
  function seekTo(time: Number) {
    const isYoutubeLink = state.currentTrackUrl.match(youtubeRegExp);
    if (isYoutubeLink) {
      state.player.seek(time);
    } else {
      state.player.currentTime = time;
    }
  }

  // @EFFECTS

  // play pause effect
  useEffect(() => {
    if (state.isPlaying) {
      state.player.play();
    } else {
      state.player.pause();
    }
  }, [state.isPlaying, state.player]);

  // load youtube link effect
  useEffect(() => {
    const isYoutubeLink = state.currentTrackUrl.match(youtubeRegExp);
    if (isYoutubeLink) {
      const id = getYouTubeID(state.currentTrackUrl);
      state.player.load(id, true);
    }

    return () => {
      dispatchPlayTrack({ dispatch });
    };
  }, [state.currentTrackUrl]);

  // handle if player loaded and set neccessary data to state
  const handleCanPlay = () => {
    setIsLoaded(true);
  };
  useEffect(() => {
    const isYoutubeLink = state.currentTrackUrl.match(youtubeRegExp);

    // if youtube link get duration from youtubelink player and set it
    if (isYoutubeLink) {
      state.player.on("playing", () => {
        setDuration(state.player.getDuration());
      });
      // if regular media element get duration from it
    } else {
      state.player.addEventListener("canplay", handleCanPlay);

      if (isLoaded) {
        setDuration(state.player.duration);
      }
    }
  }, [state.player, state.player.duration, isLoaded, state.currentTrackUrl]);

  useEffect(() => {
    if (!state.player || !state.player.currentTime) {
      return;
    }

    setCurrentTime(state.player.currentTime);
  }, [state.player, state.player.currentTime]);

  return {
    state,
    duration,
    currentTime,
    seekTo,
    isPlaying: state.isPlaying,
    onTrackPlay,
    onTrackPause,
  };
};

export { useMusicPlayer };
