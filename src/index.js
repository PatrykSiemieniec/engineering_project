import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GridContextProvider } from "./store/grid-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GridContextProvider>
      <App />
    </GridContextProvider>
  </React.StrictMode>
);
