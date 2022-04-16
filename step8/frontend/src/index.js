import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { StoreProvider } from "context/StoreProvider";
import { initialState, web3Reducer } from "context/web3Reducer";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StoreProvider initialState={initialState} reducer={web3Reducer}>
    <App />
  </StoreProvider>
);
