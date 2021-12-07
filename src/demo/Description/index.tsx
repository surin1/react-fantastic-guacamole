import React from "react";

const Description = () => (
  <div>
    <h2>How to use</h2>
    <p>
      1. Wrap your root component with{" "}
      <pre>{"<PlayerProvider><Root/></PlayerProvider>"}</pre>
    </p>
    <p>
      2. Import player components and react hooks that you need in your app{" "}
      <pre>{`import { useMusicPlayer, useMusicPlayerUi, Duration, PlayPauseButton, SeekSlider} from 'react-musiio-player'`}</pre>
    </p>
    <p>
      3. Use it in your app
      <pre>{`
        const { onTrackLoad } = useMusicPlayer();\n
        const { trackData } = useMusicPlayerUi();
        \n
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
        </div>
      `}</pre>
    </p>
    <p>
      4. You can wrap components with any CSS classses and styles you want to
      customize your player UI
    </p>
    <h2>Documentation</h2>
    <p>
      You can read documentation about every player component{" "}
      <a href="#">here</a>.
    </p>
  </div>
);

export default Description;
