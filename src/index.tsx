import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GameProvider } from "./contexts/GameContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GameProvider>
        <MantineProvider
          theme={{
            colorScheme: "dark",
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <App />
        </MantineProvider>
      </GameProvider>
    </BrowserRouter>
  </React.StrictMode>
);
