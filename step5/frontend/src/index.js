import React from "react";
import { createRoot } from "react-dom/client";
import { StoreProvider } from "context/StoreProvider";
import { initialState, web3Reducer } from "context/web3Reducer";

ReactDOM.render(
    <StoreProvider initialState={initialState} reducer={web3Reducer}>
        <App />
    </StoreProvider>,
    document.getElementById("root")
);