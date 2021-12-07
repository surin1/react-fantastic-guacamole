## First steps

- npm install --save react-musiio-player
- wrap your root component with

```js
import { PlayerProvider } from "react-musiio-player";

<PlayerProvider>
  <Root />
</PlayerProvider>;
```

## Usage

```js
import {
  useMusicPlayer,
  useMusicPlayerUi,
  Duration,
  PlayPauseButton,
  SeekSlider,
} from "react-musiio-player";

const { onTrackLoad } = useMusicPlayer();
const { trackData } = useMusicPlayerUi();

<div>
  <div>
    <div>{trackData.title}</div>
    <div>{trackData.artist}</div>
  </div>
  <PlayPauseButton />
  <div
    id="play-next-track-button"
    onClick={() =>
      onTrackLoad({
        id: newTrack.id,
        url: newTrack.link,
        title: newTrack.title,
        artist: newTrack.artist,
        isAutoPlay: true,
      })
    }
  />
  <div>
    <SeekSlider />
    <Duration />
  </div>
</div>;
```

<br/>

## API

#### `1. useMusicPlayer`

React hook that lets you get parameters that are related to audio playing.

```js
const { seekTo, onTrackLoad, onTrackPlay, onTrackPause } = useMusicPlayer();
```

##### `seekTo` - seek to a specific time in seconds

##### `onTrackLoad` - load new track into player. Accepted arguments:

- id,
- url,
- title,
- artist,
- isAutoPlay (if true track will automatically play after it was loaded)

##### `onTrackPlay` - play loaded track

##### `onTrackPause` - pause current track

<br/>

#### `2. useMusicPlayerUi`

React hook that lets you get parameters that are related to player UI.

```js
const { trackData, isPlaying, player } = useMusicPlayerUi();
```

##### `trackData` - has loaded track data inside. Fields:

- id,
- url,
- title,
- artist,

##### `isPlaying` (bool) - is current track playing or on pause

##### `player` (bool) - player instance

<br/>

#### `3. CurrentTime`

Component that has current time of track that currently playing. You can wrap it with your own component to customize style.

```js
<CurrentTime />
```

<br/>

#### `4. Duration`

Component that has duration of loaded track. You can wrap it with your own component to customize style.

```js
<Duration />
```

<br/>

#### `5. SeekSlider`

Component that shows track seek slider. You can customize colors with `trackColor` and `fillColor` props.

```js
<SeekSlider trackColor={"#ffe29e"} fillColor={"#dc9300"} />
```

<br/>

#### `6. VideoFrame`

Component that shows music video. (works only with youtube links) You can customize size with `width` and `height` props.

```js
<VideoFrame width={100} height={100} />
```

<br/>

#### `7. PlayerProvider`

Provider component. Wrap your root component with it.

```js
<PlayerProvider>
  <Root />
</PlayerProvider>
```

<br/>

#### `8. PlayPauseButton`

Play/Pause button component. You can customize it by using `playButtonClass` and `pauseButtonClass` props, that should have your own css class.<br/><br/>
Button will play or pause track depending on `isPlaying` state.

```js
<PlayPauseButton />
```
