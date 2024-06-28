import React from "react";
import ReactDOM from "react-dom/client";
import { DarkModeProvider } from "../src/components/Context/DarkMode";
import "./app.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
);
