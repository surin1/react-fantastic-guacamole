import React, { useState, useEffect, useReducer } from "react";

type Props = {
  children: JSX.Element;
};
type Track = {
  title: string;
  artist: string;
};

interface InitialState {
  player: HTMLAudioElement;
  currentTrackId: number;
  currentTrackUrl: string;
  isPlaying: boolean;
  trackData: Track;
}
const PlayerContext = React.createContext([{} as InitialState, {} as any]);

enum PLAYER_ACTIONS {
  PLAYER_SET = "PLAYER_SET",
  CURRENT_TRACK_ID_SET = "CURRENT_TRACK_ID_SET",
  CURRENT_TRACK_URL_SET = "CURRENT_TRACK_URL_SET",
  IS_PLAYING_SET = "IS_PLAYING_SET",
  CURRENT_TRACK_DATA_SET = "CURRENT_TRACK_DATA_SET",
}
interface SetPlayerAction {
  type: PLAYER_ACTIONS;
  payload: HTMLAudioElement | number | boolean;
}
function playerReducer(state: InitialState, action: SetPlayerAction) {
  const { type, payload } = action;
  switch (type) {
    case PLAYER_ACTIONS.PLAYER_SET:
      return {
        ...state,
        player: payload,
      };
    case PLAYER_ACTIONS.CURRENT_TRACK_ID_SET:
      return {
        ...state,
        currentTrackId: payload,
      };
    case PLAYER_ACTIONS.CURRENT_TRACK_URL_SET:
      return {
        ...state,
        currentTrackUrl: payload,
      };
    case PLAYER_ACTIONS.IS_PLAYING_SET:
      return {
        ...state,
        isPlaying: payload,
      };
    case PLAYER_ACTIONS.CURRENT_TRACK_DATA_SET:
      return {
        ...state,
        trackData: payload,
      };
    default:
      return state;
  }
}

const initialState = {
  player: new Audio(),
  isPlaying: false,
  currentTrackId: 0,
  currentTrackUrl: "",
  trackData: {
    title: "",
    artist: "",
  },
};
const PlayerProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  return (
    <PlayerContext.Provider value={[state, dispatch]}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
