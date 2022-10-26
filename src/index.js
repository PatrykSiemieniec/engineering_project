import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GridContextProvider } from "./store/grid-context";
import { OrderContextProvider } from "./store/order-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <OrderContextProvider>
      <GridContextProvider>
        <App />
      </GridContextProvider>
    </OrderContextProvider>
  </React.StrictMode>
);
