import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GridContextProvider } from "./store/grid-context";
import { OrderContextProvider } from "./store/order-context";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { LanguageContextProvider } from "./store/language-context";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LanguageContextProvider>
    <AuthContextProvider>
      <OrderContextProvider>
        <GridContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GridContextProvider>
      </OrderContextProvider>
    </AuthContextProvider>
  </LanguageContextProvider>
);
