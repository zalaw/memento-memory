import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import { GameProvider } from "./contexts/GameContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <GameProvider>
      <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </GameProvider>
  </React.StrictMode>
);
