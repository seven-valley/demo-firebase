import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    /* context need to wrap components then components can acces to it */
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>
);
