import { youtubeRegExp } from "./regexp";
import YTPlayer from "yt-player";

type PlayTrackArgTypes = {
  dispatch: ({}) => any;
  id: string;
  url: string;
  title: string;
  artist: string;
};
type PlayPauseTrackArgTypes = {
  dispatch: ({}) => any;
};

export function dispatchTrackData({
  dispatch,
  id,
  url = "",
  title = "",
  artist = "",
}: PlayTrackArgTypes) {
  if (!url) {
    return;
  }
  // need to dispatch different player depending on if it's youtube or default audio
  const isYoutubeLink = url.match(youtubeRegExp);
  if (isYoutubeLink) {
    const youtubePlayer = new YTPlayer("#player", {
      width: 100,
      height: 100,
    });
    dispatch({ type: "PLAYER_SET", payload: youtubePlayer });
  } else {
    const audio = new Audio(url);
    dispatch({ type: "PLAYER_SET", payload: audio });
  }

  dispatch({ type: "CURRENT_TRACK_URL_SET", payload: url });
  dispatch({ type: "CURRENT_TRACK_ID_SET", payload: id });
  dispatch({ type: "CURRENT_TRACK_DATA_SET", payload: { title, artist } });
}

export function dispatchPauseTrack({ dispatch }: PlayPauseTrackArgTypes) {
  dispatch({ type: "IS_PLAYING_SET", payload: false });
}
export function dispatchPlayTrack({ dispatch }: PlayPauseTrackArgTypes) {
  dispatch({ type: "IS_PLAYING_SET", payload: true });
}
