import React from "react";
import Demo from "./demo/index";

import { PlayerProvider } from "./context";

const App = () => (
  <PlayerProvider>
    <Demo />
  </PlayerProvider>
);

export default App;
