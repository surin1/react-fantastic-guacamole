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
  title: string;
  artist: string;
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

  // current time handlers
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
    if (isYoutubeLink && isLoaded) {
      state.player.on("timeupdate", () => {
        setCurrentTime(state.player.getCurrentTime());
      });
    }
  }, [isLoaded, state.currentTrackId]);

  // @HANDLERS

  function onTrackLoad({ id, url, title, artist }: TrackPlayArgs) {
    // pause because we want to pause previous track was playing
    // so we will not have two tracks playing together
    const isYoutubeLink = state.currentTrackUrl.match(youtubeRegExp);

    if (isYoutubeLink && state.player.destroy) {
      seekTo(0);
      setCurrentTime(0);
      state.player.destroy();
    }

    state.player.pause();
    setIsLoaded(false);
    dispatchTrackData({ dispatch, id, url, title, artist });
  }

  function onTrackPlay() {
    dispatchPlayTrack({ dispatch });
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
      setIsLoaded(true);
      // if regular media element get duration from it
    } else {
      state.player.addEventListener("canplay", handleCanPlay);

      if (state.player.duration) {
        setDuration(state.player.duration);
      }

      return () => {
        state.player.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [state.player, state.player.duration, state.currentTrackId]);

  return {
    state,
    duration,
    currentTime,
    trackData: state.trackData,
    seekTo,
    isPlaying: state.isPlaying,
    onTrackLoad,
    onTrackPlay,
    onTrackPause,
  };
};

export { useMusicPlayer };
