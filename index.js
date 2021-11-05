import {
  useMusicPlayer,
  useMusicPlayerUi,
  useMusicPlayerCurrentTime,
  useMusicPlayerDuration,
} from "./src/hooks";
import CurrentTime from "./src/components/CurrentTime";
import Duration from "./src/components/Duration";
import PlayPauseButton from "./src/components/PlayPauseButton";
import SeekSlider from "./src/components/SeekSlider";
import VideoFrame from "./src/components/VideoFrame";
import { PlayerProvider } from "./src/context";

export {
  useMusicPlayer,
  useMusicPlayerUi,
  useMusicPlayerCurrentTime,
  useMusicPlayerDuration,
  CurrentTime,
  Duration,
  PlayPauseButton,
  SeekSlider,
  VideoFrame,
  PlayerProvider,
};
